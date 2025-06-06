import { Ionicons } from "@expo/vector-icons";
import { Dimensions, FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import { Avatar } from "react-native-paper";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigations/AppNavigator";
import { MyPostData, PostCreate, PostData } from "../../interfaces/PostInterface";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import PostModal from "../../components/modals/PostModal";

const item = {
    id: 1,
    avatar: 'https://picsum.photos/400/400',
    name: "Cao Dương Lâm",
    email: 'caoduonglam@gmail.com',
    address: 'Ho Chi Minh City, Vietnam'
}


const mockPosts = Array(30).fill(0).map((_, index) => ({
    id: index,
    imageUrl: `https://picsum.photos/500/500?random=${index}`,
    totalLikes: Math.floor(Math.random() * 1000),
    totalComments: Math.floor(Math.random() * 100),
}));


export default function MyPost () {
    const addButton = { id: -1, isAddButton: true } as MyPostData;
    const [posts, setPosts] = useState([addButton, ...mockPosts]);

    const [numColumns, setNumColumns] = useState(3);
    const screenWidth = Dimensions.get('window').width;
    const imageSize = (screenWidth - ((numColumns - 1) * 2)) / numColumns; 

    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [modalVisible, setModalVisible] = useState(false);

    const handleNavigatePost = (item : MyPostData) => {
        navigation.navigate("MainTabs", { screen: "Posts", params: { userId: 1 } });
    }

    const handleSubmitPost = (data: PostCreate) => {
        const newPost: MyPostData = {
            id: Date.now(), // Hoặc uuid nếu cần
            imageUrl: data.images?.[0] ?? '', // Lấy ảnh đầu tiên làm thumbnail
        };

        // Giữ nút addButton đầu tiên
        setPosts((prev) => [addButton, newPost, ...prev.slice(1)]);
    };


    useEffect(() => {
        navigation.setOptions({
            headerTitle: item.name,
            headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.pop()}>
                    <Ionicons name="chevron-back-outline" size={30} color="black" />
                </TouchableOpacity>
                ),
            });
    }, [navigation]);

    const renderPostItem = ({ item }: { item: MyPostData }) => {
        if ((item as any).isAddButton) {
            return (
                <TouchableOpacity
                    style={{
                        width: imageSize,
                        height: imageSize,
                        marginBottom: 2,
                        backgroundColor: '#ddd',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                    onPress={() => setModalVisible(true)} 
                >
                    <Ionicons name="add" size={40} color="black" />
                </TouchableOpacity>
            );
        }

        return (
            <TouchableOpacity
                style={{
                    width: imageSize,
                    height: imageSize,
                    marginBottom: 2,
                }}
                onPress={() => handleNavigatePost(item)}
            >
                <Image
                    source={{ uri: item.imageUrl }}
                    style={{
                        width: '100%',
                        height: '100%',
                    }}
                />
            </TouchableOpacity>
        );
    };

    return (
        <View className="bg-white w-full h-full flex-col pb-4">
            {/* avatar and name */}
            <View className="flex-row flex items-center gap-4 px-4 py-6">
                <Avatar.Image size={80} source={{ uri: item.avatar }} />
                <View className="flex-col mt-2 gap-2">
                    <Text className="font-bold text-xl">{item.name}</Text>
                    <View className="items-center flex-row gap-2">
                        <Text className="font-bold text-xl">{posts.length}</Text>
                        <Text className="text-gray-600">posts</Text>
                    </View>
                </View>
            </View>
            {/* email and address */}
            <View className="px-4 py-6">
                <View className="flex-row item-center">
                    <Ionicons name="location-outline" size={24} color="black" />
                    <Text className="text-base mb-2 ml-2 text-gray-600">{item.address}</Text>
                </View>

                <View className="flex-row items-center gap-2 py-2">
                     <MaterialCommunityIcons name="email-outline" size={24} color="black" />
                    <Text className="text-base text-gray-600">{item.email}</Text>
                </View>
            </View>

            {/* list post */}
            {posts.length > 0 ? (
                <FlatList
                    data={posts}
                    renderItem={renderPostItem}
                    keyExtractor={item => item.id.toString()}
                    numColumns={numColumns}
                    showsVerticalScrollIndicator={false}
                    columnWrapperStyle={{ gap: 2 }}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    className="w-full"
                />
            ) : (
                <View className="items-center justify-center mt-20">
                    <Text className="text-gray-500 text-base">This user hasn't posted anything yet.</Text>
                </View>
            )}
                <PostModal
                    visible={modalVisible}
                    onClose={() => setModalVisible(false)}
                    onSubmit={handleSubmitPost}
                />
        </View>
    );
};