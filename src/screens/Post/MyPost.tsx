import { Ionicons } from "@expo/vector-icons";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar } from "react-native-paper";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { useEffect, useState } from "react";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../navigations/AppNavigator";
import { MyPostData, Post, PostCreate } from "../../interfaces/PostInterface";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import PostModal from "../../components/modals/PostModal";
import { TabView, SceneMap, TabBar } from "react-native-tab-view";
import { PostShareItem, PostItem } from "../../components/items/PostItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetDetailsUserQuery } from "../../services/userService";
import { useGetAllPostsByUserQuery } from "../../services/postService";
import { useGetAllSharedPostsByUserQuery } from "../../services/sharedPostService";
import {
  SharedPost,
  SharedPostResponse,
} from "../../interfaces/SharedPostInterface";

type PostsRouteProp = RouteProp<RootStackParamList, "Posts">;

export default function MyPost() {
  const [numColumns, setNumColumns] = useState(3);
  const screenWidth = Dimensions.get("window").width;
  const imageSize = (screenWidth - (numColumns - 1) * 2) / numColumns;

  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "personal", title: "Cá nhân" },
    { key: "shared", title: "Chia sẻ" },
  ]);

  const [userId, setUserId] = useState<string | null>(null);
  const [countPost, setCountPost] = useState<number>(0);

  useEffect(() => {
    AsyncStorage.getItem("userId").then(setUserId);
  }, []);

  const route = useRoute<PostsRouteProp>();
  const { userId: routeUserId, type, username } = route.params || {};

  console.log("route", routeUserId, type, username)

  const { data: detailsUser } = useGetDetailsUserQuery();

  const { data: allSharedPosts, isLoading: isLoadingSharedPost } =
    useGetAllSharedPostsByUserQuery(userId);

  const {
    data: allPosts,
    refetch: refetchAllPosts,
    isLoading: isLoadingPost,
  } = useGetAllPostsByUserQuery(userId);

  useEffect(() => {
    if (allPosts && allSharedPosts) {
      setCountPost(allPosts.length + allSharedPosts.length);
    }
  }, [userId, allPosts, allSharedPosts]);

  const handleNavigatePost = (item: SharedPost | Post) => {
    const type = isSharedPost(item) ? "share" : "post";
    navigation.navigate("MainTabs", {
      screen: "Posts",
      params: { userId: userId, type, username: detailsUser?.username },
    });
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: detailsUser?.fullname,
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Ionicons name="chevron-back-outline" size={30} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const isSharedPost = (item: SharedPost | Post): item is SharedPost => {
    return "user_shared_id" in item;
  };

  const PersonalRoute = () => renderPostList(allPosts ?? []);
  const SharedRoute = () => renderSharedPostList(allSharedPosts ?? []);

  const renderScene = SceneMap({
    personal: PersonalRoute,
    shared: SharedRoute,
  });

  const renderSharedPostList = (data: SharedPost[]) => (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <PostShareItem
          item={item}
          imageSize={imageSize}
          onPress={handleNavigatePost}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      numColumns={numColumns}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={{ gap: 2 }}
      contentContainerStyle={{ paddingBottom: 20 }}
      className="w-full text-black"
      ListEmptyComponent={
        <View className="items-center justify-center py-10">
          <Text className="text-gray-500">Bạn chưa chia sẻ bài viết nào.</Text>
        </View>
      }
    />
  );

  const renderPostList = (data: Post[]) => {
    const addButtonItem = { id: -1, isAddButton: true } as any;
    const modifiedData = [addButtonItem, ...data];

    return (
      <FlatList
        data={modifiedData}
        renderItem={({ item }) => (
          <PostItem
            item={item}
            imageSize={imageSize}
            onPress={handleNavigatePost}
            onPostCreated={() => refetchAllPosts()}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={numColumns}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ gap: 2 }}
        contentContainerStyle={{ paddingBottom: 20 }}
        className="w-full text-black"
        ListEmptyComponent={
          <View className="items-center justify-center py-10">
            <Text className="text-gray-500">Bạn chưa đăng bài viết nào.</Text>
          </View>
        }
      />
    );
  };

  return (
    <View className="bg-white w-full h-full flex-col pb-4">
      {/* avatar and name */}
      <View className="flex-row flex items-center gap-4 px-4 py-6">
        <Avatar.Image size={80} source={{ uri: detailsUser?.image_url }} />
        <View className="flex-col mt-2 gap-2">
          <Text className="font-bold text-xl">{detailsUser?.username}</Text>
          <View className="items-center flex-row gap-2">
            <Text className="font-bold text-xl">{countPost | 0}</Text>
            <Text className="text-gray-600">posts</Text>
          </View>
        </View>
      </View>
      {/* email and address */}
      <View className="px-4 py-6">
        <View className="flex-row item-center">
          <Ionicons name="location-outline" size={24} color="black" />
          <Text className="text-base mb-2 ml-2 text-gray-600">
            {detailsUser?.address || "Chưa có"}
          </Text>
        </View>

        <View className="flex-row items-center gap-2 py-2">
          <MaterialCommunityIcons
            name="email-outline"
            size={24}
            color="black"
          />
          <Text className="text-base text-gray-600">{detailsUser?.email}</Text>
        </View>
      </View>

      {isLoadingPost || isLoadingSharedPost ? (
        <ActivityIndicator color="#FE9519" size="large" />
      ) : (
        <>
          {/* tab post */}
          <TabView
            navigationState={{ index, routes }}
            renderScene={renderScene}
            onIndexChange={setIndex}
            initialLayout={{ width: screenWidth }}
            renderTabBar={(props) => (
              <TabBar
                {...props}
                indicatorStyle={{ backgroundColor: "black" }}
                style={{ backgroundColor: "white" }}
                labelStyle={{ color: "black" }}
                activeColor="black"
                inactiveColor="gray"
              />
            )}
          />
        </>
      )}
    </View>
  );
}
