import React, { useState } from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Post } from "../../interfaces/PostInterface";
import { SharedPost } from "../../interfaces/SharedPostInterface";
import avatar_default from "../../../assets/avatar-default.jpg";
import PostModal from "../modals/PostModal";
import { useCreatePostMutation } from "../../services/postService";

interface PostItemProps {
  item: Post;
  imageSize: number;
  onPress: (item: Post) => void;
  onPostCreated: () => void;
}

interface PostShareItemProps {
  item: SharedPost;
  imageSize: number;
  onPress: (item: SharedPost) => void;
}

export function PostItem({ onPostCreated, imageSize, item, onPress }: PostItemProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [createPost, { isLoading }] = useCreatePostMutation();

  return (
    <View style={{ width: imageSize, height: imageSize, marginBottom: 2 }}>
      {(item as any).isAddButton ? (
        <>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: "#ddd",
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => setModalVisible(true)}
          >
            <Ionicons name="add" size={40} color="black" />
          </TouchableOpacity>

          <PostModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onSubmit={async (formData) => {
              try {
                await createPost(formData).unwrap();
                setModalVisible(false);
                onPostCreated();
              } catch (error) {
                console.error("Failed to create post:", error);
              }
            }}
            isLoading={isLoading} 
          />
        </>
      ) : (
        <TouchableOpacity
          style={{ width: imageSize, height: imageSize, marginBottom: 2 }}
          onPress={() => onPress(item)}
        >
          <Image
            source={item?.image_url ? { uri: item.image_url } : avatar_default}
            style={{ width: "100%", height: "100%" }}
          />
        </TouchableOpacity>
      )}
    </View>
  );
}

export function PostShareItem({ item, imageSize, onPress }: PostShareItemProps) {
  return (
    <TouchableOpacity
      style={{
        width: imageSize,
        height: imageSize,
        marginBottom: 2,
      }}
      onPress={() => onPress(item)}
    >
      <Image
        source={item?.image_url ? { uri: item.image_url } : avatar_default}
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </TouchableOpacity>
  );
}
