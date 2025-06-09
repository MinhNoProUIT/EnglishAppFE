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
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { BottomTabParamList } from "../../navigations/BottomTabs";
import { Ionicons } from "@expo/vector-icons";
import { useGetAllSharedPostsByUserQuery } from "../../services/sharedPostService";
import { useGetAllPostsByUserQuery } from "../../services/postService";
import ViewPostItem from "../../components/items/ViewPostItem";
import { Post } from "../../interfaces/PostInterface";
import { SharedPost } from "../../interfaces/SharedPostInterface";
import { useCreateReactPostMutation, useDeleteReactPostMutation } from "../../services/reactPostService";

const { width } = Dimensions.get("window");

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

  const [selectedPost, setSelectedPost] = useState<Post | SharedPost>();

  const bottomSheetRefComment = useRef<RBSheetRef | null>(null);
  const bottomSheetRefShare = useRef<RBSheetRef | null>(null);

  const navigation = useNavigation<SettingsScreenNavigationProp>();

  const route = useRoute<PostsRouteProp>();
  const { userId, type, username } = route.params || {};

  console.log("user id params", userId, type);

  const {
    data: postData,
    isLoading: isPostLoading,
    refetch: refetchPosts,
  } = useGetAllPostsByUserQuery(userId!, { skip: !userId || type !== "post" });

  const {
    data: sharedPostData,
    isLoading: isSharedLoading,
    refetch: refetchShared,
  } = useGetAllSharedPostsByUserQuery(userId!, {
    skip: !userId || type !== "shared",
  });

  const [createReactPost] = useCreateReactPostMutation();
const [deleteReactPost] = useDeleteReactPostMutation();

  const isLoading = type === "post" ? isPostLoading : isSharedLoading;
  const posts = type === "post" ? postData : sharedPostData;

  const navigateToMyPost = () => {
    navigation.navigate("MyPost");
  };

  const handleScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>,
    postId: number
  ) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / width);
    setCurrentIndexes((prevIndexes) => ({
      ...prevIndexes,
      [postId]: newIndex,
    }));
  };

  const handleLikePost = (item: Post | SharedPost) => {
    // setPostData((prevPost) =>
    //   prevPost.map((post) => {
    //     if (post.id === item.id){
    //       const newTotalLike = item.isLike ? post.totalLike -1 : post.totalLike + 1;
    //       const newStateLike = !item.isLike;
    //       return {...post, totalLike: newTotalLike, isLike: newStateLike};
    //     }
    //     return post;
    //   })
    // )
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
        <TouchableOpacity onPress={() => navigateToMyPost()} className="pr-4">
          <Ionicons name="person-circle-outline" size={30} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [username, userId]);

  return (
    <View>
      {/* list post */}
      <FlatList<Post | SharedPost>
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ViewPostItem
            item={item}
            type={type}
            currentIndexes={currentIndexes}
            handleLikePost={handleLikePost}
            handleOpenComment={handleOpenComment}
            handleOpenShare={handleOpenShare}
            navigateToMyPost={navigateToMyPost}
          />
        )}
        onEndReached={() => {
          // pagination logic here (nếu có)
        }}
        onEndReachedThreshold={0.7}
        ListFooterComponent={
          isLoading ? (
            <ActivityIndicator size="large" color="#2563EB" />
          ) : hasMoreData ? null : (
            <View className="text-center text-gray-500 p-4">
              <Text>Không còn dữ liệu</Text>
            </View>
          )
        }
      />

      {/*view bottom sheet - comment */}
      {selectedPost && (
        <CommentBottomSheet ref={bottomSheetRefComment} post={selectedPost!} />
      )}

      {/*view bottom sheet - share */}
      {selectedPost && (
        <ShareBottomSheet ref={bottomSheetRefShare} post={selectedPost} />
      )}
    </View>
  );
}
