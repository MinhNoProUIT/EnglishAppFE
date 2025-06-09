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
  type,
  currentIndexes,
  handleLikePost,
  handleOpenComment,
  handleOpenShare,
  navigateToMyPost,
}: PostItemProps) {
  return (
    <ScrollView className="bg-white mb-1">
      {/* header */}
      <View className="flex-row items-center p-4 border-b border-gray-200">
        <Pressable onPress={navigateToMyPost} className="flex-row items-center">
          {item.author_image_url ? (
            <Avatar.Image size={40} source={{ uri: item.author_image_url }} />
          ) : (
            <Avatar.Icon size={40} icon="account" />
          )}
          <Text className="ml-2 font-bold">{item.author_name}</Text>
        </Pressable>
      </View>

      {/* image */}
      <Image
        source={{ uri: item.image_url || undefined }}
        style={{ height: 400, width }}
        resizeMode="cover"
      />

      {/* content */}
      <View className="p-4 flex flex-row gap-4">
        <TouchableOpacity
          className="flex flex-row items-center gap-1"
          onPress={() => handleLikePost(item)}
        >
          {/* <Heart
            name={item.isLike ? "heart" : "heart-outlined"}
            size={24}
            color={item.isLike ? "red" : "black"}
          /> */}
          <Text className="font-bold">{item.react_count}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex flex-row items-center gap-1"
          onPress={() => handleOpenComment(item)}
        >
          <Comment name="comment" size={20} color="black" />
          <Text className="font-bold">{item.comment_count}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="flex flex-row items-center gap-1"
          onPress={() => handleOpenShare(item)}
        >
          <Share name="send" size={22} color="black" />
          <Text className="font-bold">
            {type === "post"
                ? (item as Post).shared_user_id_count
                : (item as SharedPost).shared_count}
            </Text>
        </TouchableOpacity>
      </View>

      <Pressable onPress={() => handleOpenComment(item)}>
        <View className="px-4 py-1 mb-4 flex flex-row items-center">
          <Text className="text-base flex-1">
            <Text className="font-bold">{item.author_name}</Text> {item.content}
          </Text>
        </View>
      </Pressable>
    </ScrollView>
  );
}
