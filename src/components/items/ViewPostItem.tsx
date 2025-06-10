import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Avatar } from "react-native-paper";
import Heart from "@expo/vector-icons/Entypo";
import Comment from "@expo/vector-icons/FontAwesome5";
import Share from "@expo/vector-icons/Feather";
import { Post } from "../../interfaces/PostInterface";
import { SharedPost } from "../../interfaces/SharedPostInterface";

const { width } = Dimensions.get("window");

interface PostItemProps {
  item: Post | SharedPost;
  type: "post" | "share";
  currentIndexes: Record<number, number>;
  handleLikePost: (item: Post | SharedPost) => void;
  handleOpenComment: (item: Post | SharedPost) => void;
  handleOpenShare: (item: Post | SharedPost) => void;
  navigateToMyPost: () => void;
}

export default function ViewPostItem({
  item,
  type = 'post',
  currentIndexes,
  handleLikePost,
  handleOpenComment,
  handleOpenShare,
  navigateToMyPost,
}: PostItemProps) {
  return (
    <ScrollView className="bg-white mb-2 rounded-xl shadow-sm">
      {/* Người chia sẻ */}
      {type === "share" && (
        <View className="flex-row items-center px-4 pt-4 pb-2 bg-gray-100 rounded-t-xl">
          {(item as SharedPost).user_shared_image_url ? (
            <Avatar.Image
              size={36}
              source={{ uri: (item as SharedPost).user_shared_image_url }}
            />
          ) : (
            <Avatar.Icon size={36} icon="account" />
          )}
          <Text className="ml-2 text-sm text-gray-700 font-medium">
            {(item as SharedPost).user_shared_name} đã chia sẻ
          </Text>
        </View>
      )}

      {/* Người đăng bài */}
      <View className="flex-row items-center p-4 border-b border-gray-200 bg-white">
        <Pressable onPress={navigateToMyPost} className="flex-row items-center">
          {item.author_image_url ? (
            <Avatar.Image size={40} source={{ uri: item.author_image_url }} />
          ) : (
            <Avatar.Icon size={40} icon="account" />
          )}
          <Text className="ml-2 font-bold text-base text-gray-900">{item.author_name}</Text>
        </Pressable>
      </View>

      {/* Ảnh bài viết */}
      {item.image_url && (
        <Image
          source={{ uri: item.image_url }}
          style={{ height: 400, width }}
          resizeMode="cover"
        />
      )}

      {/* Hành động */}
      <View className="p-4 flex-row gap-6 items-center border-b border-gray-100">
        <TouchableOpacity
          className="flex-row items-center gap-1"
          onPress={() => handleLikePost(item)}
        >
          <Heart
            name={item.isLike ? "heart" : "heart-outlined"}
            size={24}
            color={item.isLike ? "red" : "black"}
          />
          <Text className="font-bold text-gray-800">{item.react_count}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center gap-1"
          onPress={() => handleOpenComment(item)}
        >
          <Comment name="comment" size={20} color="black" />
          <Text className="font-bold text-gray-800">{item.comment_count}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center gap-1"
          onPress={() => handleOpenShare(item)}
        >
          <Share name="send" size={22} color="black" />
          <Text className="font-bold text-gray-800">
            {type === "post"
              ? (item as Post).shared_user_id_count
              : (item as SharedPost).shared_count}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Nội dung bài viết */}
      <Pressable onPress={() => handleOpenComment(item)}>
        <View className="px-4 py-3">
          <Text className="text-base text-gray-900 leading-5">
            <Text className="font-bold">{item.author_name}</Text>{" "}
            {item.content}
          </Text>
        </View>
      </Pressable>
    </ScrollView>
  );
}

