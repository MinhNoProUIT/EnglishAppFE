import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { ActivityIndicator, Avatar } from "react-native-paper";
import Heart from "@expo/vector-icons/Entypo";
import Comment from "@expo/vector-icons/FontAwesome5";
import Share from "@expo/vector-icons/Feather";
import ShareBottomSheet from "../../components/bottomSheet/ShareBottomSheet";
import CommentBottomSheet from "../../components/bottomSheet/CommentBottomSheet";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigations/AppNavigator";
import {
  RouteProp,
  useFocusEffect,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { BottomTabParamList } from "../../navigations/BottomTabs";
import { Ionicons } from "@expo/vector-icons";
import { useGetAllSharedPostsByUserQuery } from "../../services/sharedPostService";
import {
  useGetAllPostsByUserQuery,
  useLazyGetAllPostsQuery,
} from "../../services/postService";
import ViewPostItem from "../../components/items/ViewPostItem";
import { Post } from "../../interfaces/PostInterface";
import { SharedPost } from "../../interfaces/SharedPostInterface";
import {
  useCreateReactPostMutation,
  useDeleteReactPostMutation,
  useLazyCheckLikePostQuery,
} from "../../services/reactPostService";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface RBSheetRef {
  open: () => void;
  close: () => void;
}

type SettingsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MyPost"
>;

type PostsRouteProp = RouteProp<BottomTabParamList, "Posts">;

export default function Posts() {
  const [currentIndexes, setCurrentIndexes] = useState<Record<number, number>>(
    {}
  );
  const scrollRefs = useRef<Record<number, FlatList<string> | null>>({});

  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [allPosts, setAllPosts] = useState<(Post | SharedPost)[]>([]); // Lưu tất cả posts đã load

  const [selectedPost, setSelectedPost] = useState<Post | SharedPost>();
  const [likedPosts, setLikedPosts] = useState<Record<string, boolean>>({});
  const [ownerId, setOwwnerId] = useState<string | null>(null);

  const bottomSheetRefComment = useRef<RBSheetRef | null>(null);
  const bottomSheetRefShare = useRef<RBSheetRef | null>(null);
  const [isBottomLoading, setIsBottomLoading] = useState(false);

  const navigation = useNavigation<SettingsScreenNavigationProp>();

  const route = useRoute<PostsRouteProp>();
  const { userId, type, username } = route.params || {};

  console.log("user id params", userId, type);

  const skipPostQuery = !userId || type !== "post";
  const skipSharedQuery = !userId || type !== "share";

  const {
    data: postData,
    isLoading: isPostLoading,
    refetch: refetchPosts,
  } = useGetAllPostsByUserQuery(userId!, { skip: skipPostQuery });

  const {
    data: sharedPostData,
    isLoading: isSharedLoading,
    refetch: refetchShared,
  } = useGetAllSharedPostsByUserQuery(userId!, {
    skip: skipSharedQuery,
  });

  const isViewAll = !userId && !type;

  // Sử dụng useLazyQuery thay vì useQuery để có thể control việc fetch
  const [getAllPosts, { isLoading: isLoadingAll }] = useLazyGetAllPostsQuery();
  const [createReactPost] = useCreateReactPostMutation();
  const [deleteReactPost] = useDeleteReactPostMutation();
  const [checkLikePost] = useLazyCheckLikePostQuery();

  const isLoading = type === "post" ? isPostLoading : isSharedLoading;
  const posts = type === "post" ? postData : sharedPostData;

  useEffect(() => {
    AsyncStorage.getItem("userId").then(setOwwnerId);
  }, []);
  // Load initial data khi component mount
  useEffect(() => {
    if (isViewAll) {
      loadInitialPosts();
    }
  }, [isViewAll]);

  useFocusEffect(
    useCallback(() => {
      loadInitialPosts();
    }, [])
  );

  const loadInitialPosts = async () => {
    try {
      const pageSize = 5;
      let currentPage = 1;
      let allData: Post[] = [];
      let totalPages = 1;

      // Fetch the first page to get pagination info
      const firstRes = await getAllPosts({
        page: currentPage,
        limit: pageSize,
      }).unwrap();
      if (firstRes?.data) {
        allData = [...firstRes.data];
        const total = firstRes?.pagination?.total ?? 0;
        totalPages = Math.ceil(total / pageSize);

        // Load remaining pages if any
        while (currentPage < totalPages) {
          currentPage++;
          const res = await getAllPosts({
            page: currentPage,
            limit: pageSize,
          }).unwrap();
          if (res?.data) {
            allData = [...allData, ...res.data];
          }
        }

        setAllPosts(allData);
        setHasMoreData(allData.length < (firstRes?.pagination?.total ?? 0));
      }
    } catch (error) {
      console.error("Lỗi tải toàn bộ bài viết:", error);
    }
  };

  const fetchMorePosts = async () => {
    if (!hasMoreData || isBottomLoading || !isViewAll) return;

    setIsBottomLoading(true);
    const nextPage = page + 1;

    try {
      const res = await getAllPosts({ page: nextPage, limit: 5 }).unwrap();

      if (res?.data && res.data.length > 0) {
        // Append new posts to existing posts
        setAllPosts((prevPosts) => [...prevPosts, ...res.data]);
        setPage(nextPage);

        // Check if we have more data
        const total = res?.pagination?.total ?? 0;
        const currentTotal = allPosts.length + res.data.length;

        if (currentTotal >= total) {
          setHasMoreData(false);
        }
      } else {
        setHasMoreData(false);
      }
    } catch (error) {
      console.error("Lỗi tải thêm bài viết:", error);
    } finally {
      setIsBottomLoading(false);
    }
  };

  const navigateToMyPost = (item: Post) => {
    navigation.navigate("MyPost", {
      userId: item.user_id,
      type,
      username: item.author_name,
    });
  };

  const fetchLikeStatus = async (postsToCheck?: (Post | SharedPost)[]) => {
    if (!ownerId) return; // Changed from userId to ownerId

    const targetPosts = postsToCheck || (isViewAll ? allPosts : posts);
    if (!targetPosts) return;

    const likeStatusArray = await Promise.all(
      targetPosts.map(async (post) => {
        try {
          const res = await checkLikePost({
            user_id: ownerId.toString(), // Changed from userId to ownerId
            post_id: post.id,
          }).unwrap();
          return [post.id, res.isLike] as [string, boolean];
        } catch (error) {
          console.error(`Lỗi kiểm tra like post ${post.id}`, error);
          return [post.id, false] as [string, boolean];
        }
      })
    );
    const newLikedStatus = Object.fromEntries(likeStatusArray);
    setLikedPosts((prev) => ({ ...prev, ...newLikedStatus }));
  };

  // Separate effect for initial load
  useEffect(() => {
    if (userId) {
      if (isViewAll && allPosts.length > 0) {
        fetchLikeStatus();
      } else if (!isViewAll && posts) {
        fetchLikeStatus();
      }
    }
  }, [userId]);

  // Effect for when posts data changes (but not after like/unlike actions)
  const initialLoadRef = useRef(true);
  useEffect(() => {
    if (userId && !initialLoadRef.current) {
      if (isViewAll && allPosts.length > 0) {
        // Only fetch for new posts, not existing ones
        const existingPostIds = Object.keys(likedPosts);
        const newPosts = allPosts.filter(
          (post) => !existingPostIds.includes(post.id)
        );
        if (newPosts.length > 0) {
          fetchLikeStatus(newPosts);
        }
      } else if (!isViewAll && posts) {
        fetchLikeStatus();
      }
    }
    initialLoadRef.current = false;
  }, [posts, allPosts]);

  const handleLikePost = async (item: Post | SharedPost) => {
    if (!ownerId) {
      // Changed from userId to ownerId
      console.log("No owner ID found, cannot like post");
      return;
    }

    const isCurrentlyLiked = likedPosts[item.id];
    // console.log(Attempting to ${isCurrentlyLiked ? 'unlike' : 'like'} post ${item.id});

    // Optimistic update
    setLikedPosts((prev) => ({
      ...prev,
      [item.id]: !isCurrentlyLiked,
    }));

    try {
      if (isCurrentlyLiked) {
        console.log("Deleting like...");
        await deleteReactPost({
          user_id: ownerId.toString(), // Changed from userId to ownerId
          post_id: item.id,
        }).unwrap();
        console.log("Like deleted successfully");
      } else {
        console.log("Creating like...");
        await createReactPost({
          user_id: ownerId.toString(), // Changed from userId to ownerId
          post_id: item.id,
        }).unwrap();
        console.log("Like created successfully");
      }
      if (isViewAll) {
        loadInitialPosts();
      } else if (type === "post") {
        refetchPosts();
      } else {
        refetchShared();
      }
    } catch (error) {
      console.error("Lỗi khi xử lý like/unlike:", error);
      // Revert optimistic update on error
      setLikedPosts((prev) => ({
        ...prev,
        [item.id]: isCurrentlyLiked,
      }));
    }
  };

  const handleOpenComment = (post: Post | SharedPost) => {
    setSelectedPost(post);
    if (bottomSheetRefComment.current) {
      bottomSheetRefComment.current.open();
    }
  };

  const handleOpenShare = (post: Post | SharedPost) => {
    setSelectedPost(post);
    if (bottomSheetRefShare.current) {
      bottomSheetRefShare.current.open();
    }
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Bài đăng</Text>
          {userId && username && (
            <Text style={{ fontSize: 14, color: "gray" }}>{username}</Text>
          )}
        </View>
      ),
      headerLeft: () =>
        userId ? (
          <TouchableOpacity onPress={() => navigation.pop()} className="pl-4">
            <Ionicons name="chevron-back-outline" size={30} color="black" />
          </TouchableOpacity>
        ) : null,
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigateToMyPost({ user_id: ownerId })}
          className="pr-4"
        >
          <Ionicons name="person-circle-outline" size={30} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [username, userId]);

  const isInitialLoading = isViewAll
    ? isLoadingAll && allPosts.length === 0
    : isLoading;

  if (isInitialLoading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );
  }
  // Determine which data to display
  const displayData = isViewAll ? allPosts : posts ?? [];

  return (
    <View>
      {/* list post */}
      <FlatList<Post | SharedPost>
        data={displayData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ViewPostItem
            item={{ ...item, isLike: likedPosts[item.id] ?? false }}
            type={type}
            currentIndexes={currentIndexes}
            handleLikePost={handleLikePost}
            handleOpenComment={handleOpenComment}
            handleOpenShare={handleOpenShare}
            navigateToMyPost={navigateToMyPost}
          />
        )}
        onEndReached={isViewAll ? fetchMorePosts : undefined}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isBottomLoading ? (
            <View className="p-4 items-center">
              <ActivityIndicator size="large" color="#2563EB" />
            </View>
          ) : !hasMoreData && isViewAll && displayData.length > 0 ? (
            <View className="p-4 items-center">
              <Text className="text-gray-500">Không còn dữ liệu</Text>
            </View>
          ) : null
        }
      />
      {/*view bottom sheet - comment */}
      {selectedPost && (
        <CommentBottomSheet
          ref={bottomSheetRefComment}
          postId={selectedPost.id}
          type={type}
          refetch={
            isViewAll
              ? loadInitialPosts
              : type === "post"
              ? refetchPosts
              : refetchShared
          }
        />
      )}
      {/*view bottom sheet - share */}
      {selectedPost && (
        <ShareBottomSheet
          ref={bottomSheetRefShare}
          postId={selectedPost.id}
          type={type}
          refetch={
            isViewAll
              ? loadInitialPosts
              : type === "post"
              ? refetchPosts
              : refetchShared
          }
        />
      )}
    </View>
  );
}
