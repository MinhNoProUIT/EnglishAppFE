import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, Image, FlatList, ScrollView, NativeSyntheticEvent, NativeScrollEvent, Dimensions, TouchableOpacity, Pressable } from "react-native";
import { ActivityIndicator, Avatar } from "react-native-paper";
import Heart from '@expo/vector-icons/Entypo';
import Comment from '@expo/vector-icons/FontAwesome5';
import Share from '@expo/vector-icons/Feather';
import ShareBottomSheet from "../../components/bottomSheet/ShareBottomSheet";
import CommentBottomSheet from "../../components/bottomSheet/CommentBottomSheet";
import { PostData } from "../../interfaces/PostInterface";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigations/AppNavigator";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { BottomTabParamList } from "../../navigations/BottomTabs";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export interface RBSheetRef {
  open: () => void;
  close: () => void;
}

const data = [
  {
    id: 1,
    images: [
      'https://picsum.photos/400/400',
    ],
    fullname: "Dương Lâm",
    avatar: 'https://picsum.photos/100/100',
    isLike: false,
    totalLike: 200,
    totalCmt: 131,
    totalShare: 20,
    content: "Từ vựng này rất hay nha mọi người !!!"
  },
  {
    id: 2,
    images: [
      'https://picsum.photos/100/100',
      'https://picsum.photos/100/100',
      'https://picsum.photos/100/100'
    ],
    fullname: "Dương Lâm",
    avatar: 'https://picsum.photos/100/100',
    isLike: true,
    totalLike: 200,
    totalCmt: 131,
    totalShare: 20,
    content: "Cần học nhé"
  },
  {
    id: 3,
    images: [
      'https://picsum.photos/100/100',
      'https://picsum.photos/100/100',
      'https://picsum.photos/100/100'
    ],
    fullname: "Dương Lâm",
    avatar: 'https://picsum.photos/100/100',
    isLike: false,
    totalLike: 200,
    totalCmt: 131,
    totalShare: 20,
    content: "Cần học nhé"
  },
  {
    id: 4,
    images: [
      'https://picsum.photos/100/100',
      'https://picsum.photos/100/100',
      'https://picsum.photos/100/100'
    ],
    fullname: "Dương Lâm",
    avatar: 'https://picsum.photos/100/100',
    isLike: false,
    totalLike: 200,
    totalCmt: 131,
    totalShare: 20,
    content: "Cần học nhé"
  },
  {
    id: 5,
    images: [
      'https://picsum.photos/100/100',
      'https://picsum.photos/100/100',
      'https://picsum.photos/100/100'
    ],
    fullname: "Dương Lâm",
    avatar: 'https://picsum.photos/100/100',
    isLike: false,
    totalLike: 200,
    totalCmt: 131,
    totalShare: 20,
    content: "Cần học nhé"
  },
  {
    id: 6,
    images: [
      'https://picsum.photos/100/100',
      'https://picsum.photos/100/100',
      'https://picsum.photos/100/100'
    ],
    fullname: "Dương Lâm",
    avatar: 'https://picsum.photos/100/100',
    isLike: false,
    totalLike: 200,
    totalCmt: 131,
    totalShare: 20,
    content: "Cần học nhé"
  },
];

type SettingsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MyPost"
>;

type PostsRouteProp = RouteProp<BottomTabParamList, 'Posts'>;

export default function Posts() {
  const [currentIndexes, setCurrentIndexes] = useState<Record<number, number>>({});
  const scrollRefs = useRef<Record<number, FlatList<string> | null>>({});

  const [postData, setPostData] = useState<PostData[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setLoading] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);

  const [selectedPost, setSelectedPost] = useState<PostData>();

  const bottomSheetRefComment = useRef<RBSheetRef | null>(null); 
  const bottomSheetRefShare = useRef<RBSheetRef | null>(null); 
  
  const navigation = useNavigation<SettingsScreenNavigationProp>();

  const route = useRoute<PostsRouteProp>();
  const { userId } = route.params || {};
  const [user, setUser] = useState<PostData | null>(null);

  const userDetail = useMemo(() => data.find((u) => u.id === userId) || null, [userId, data]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setUser(userDetail);
  }, [userDetail]); 
  
  const navigateToMyPost = () => {
    navigation.navigate("MyPost");
  };
  
  const fetchData = () => {
    if (isLoading || !hasMoreData) return;
    setLoading(true);
    setTimeout(() => {
      const newData = data.slice((page - 1) * 5, page * 5); // Load 5 bài viết mỗi lần
      if (newData.length === 0) {
        setHasMoreData(false); 
      } else {
        setPostData((prevData) => [...prevData, ...newData]);
        setPage((prevPage) => prevPage + 1);
      }
      setLoading(false);
    }, 1000); 
  };
  
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>, postId: number) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(contentOffsetX / width);
    setCurrentIndexes((prevIndexes) => ({
      ...prevIndexes,
      [postId]: newIndex
    }));
  };

  const handleLikePost = (item : PostData) => {
    setPostData((prevPost) => 
      prevPost.map((post) => {
        if (post.id === item.id){
          const newTotalLike = item.isLike ? post.totalLike -1 : post.totalLike + 1;
          const newStateLike = !item.isLike;
          return {...post, totalLike: newTotalLike, isLike: newStateLike};
        }
        return post;
      })
    )  
  }

  const handleOpenComment = (post: PostData) => {
    setSelectedPost(post);
    if (bottomSheetRefComment.current){
      bottomSheetRefComment.current.open();
    }
  }

  const handleOpenShare = (post: PostData) => {
    setSelectedPost(post);
    if (bottomSheetRefShare.current){
      bottomSheetRefShare.current.open();
    }
  }

  const renderImageItem = useCallback(({ item } : {item: string}) => (
    <Image
      source={{ uri: item }}
      style={{height: 400, width: width}}
      resizeMode="cover"
    />
  ), []);

  const renderPostItem = useCallback(({ item } : {item: PostData}) => (
    <ScrollView className="bg-white mb-1 ">
      {/* header */}
      <View className="flex-row items-center p-4 border-b border-gray-200">
        <Pressable onPress={() => navigateToMyPost()} className="flex-row items-center">
            <Avatar.Image size={40} source={{ uri: item.avatar }} />
            <Text className="ml-2 font-bold">{item.fullname}</Text>
        </Pressable>
      </View>
      {/* list image */}
      <FlatList
        ref={(ref) => (scrollRefs.current[item.id] = ref)}
        data={item.images}
        keyExtractor={(img, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderImageItem}
        onScroll={(event) => handleScroll(event, item.id)}
        scrollEventThrottle={16}
      />

      {/* dot pagination */}
      <View className="flex-row justify-center mt-2">
        {item.images.map((_, index) => (
          <View
            key={index}
            className={`h-2 w-2 mx-1 rounded-full ${
              index === (currentIndexes[item.id] || 0) ? 'bg-[#2563EB]' : 'bg-gray-300'
            }`}
          />
        ))}
      </View>

      {/*  content */}
      <View className="p-4 flex flex-row gap-4">
        <TouchableOpacity className="flex flex-row items-center gap-1">
          <Heart name={item.isLike ? "heart" : "heart-outlined"} size={24} color={item.isLike ? "red" : "black"}  onPress={() => handleLikePost(item)}/>
          <Text className="font-bold">{item.totalLike}</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex flex-row items-center gap-1" onPress={() => handleOpenComment(item)}>
          <Comment name="comment" size={20} color="black" />
          <Text className="font-bold">{item.totalCmt}</Text>  
        </TouchableOpacity>

        <TouchableOpacity className="flex flex-row items-center gap-1" onPress={() => handleOpenShare(item)}>
          <Share name="send" size={22} color="black" />
          <Text className="font-bold">{item.totalShare}</Text>
        </TouchableOpacity>
      </View>
      <Pressable onPress={() => handleOpenComment(item)}>
        <View className="px-4 py-1 mb-4 flex flex-row items-center">
         <Text className="text-base flex-1">
          <Text className="font-bold">{item.fullname}</Text> {item.content}
        </Text>
        </View>
      </Pressable>
    </ScrollView>
  ), [currentIndexes]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>Bài đăng</Text>
          {userId && user && (
            <Text style={{ fontSize: 14, color: "gray" }}>{user.fullname}</Text>
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
  }, [user, userId]);

  return (
   <View>
      {/* list post */}
     <FlatList
      data={postData}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderPostItem}
      onEndReached={fetchData}
      onEndReachedThreshold={0.7}
      ListFooterComponent={
        isLoading ? (
          <ActivityIndicator size='large' color="#2563EB"/>
        ) : hasMoreData ? null : (
          <View className="text-center text-gray-500 p-4">
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
      <ShareBottomSheet ref={bottomSheetRefShare} post={selectedPost}/>
     )}
   </View>
  );
}
