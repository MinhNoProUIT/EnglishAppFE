import React, { useEffect, useMemo, useState } from "react";
import {
  Modal,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import UserItem from "../items/UserRecommendItem";
import { User } from "./../../interfaces/UserInterface";
import { useCreateGroupMutation } from "../../services/groupService";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetAllUserRecommendsQuery } from "../../services/userService";

interface GroupModalProps {
  visible: boolean;
  onClose: () => void;
  refetchGroups: () => void;
}

export default function CreateGroupModal({
  visible,
  onClose,
  refetchGroups,
}: GroupModalProps) {
  const [userId, setUserId] = useState<string | null>(null);
  const { t } = useTranslation();
  const [groupName, setGroupName] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const [msgError, setMsgError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");

  const [page, setPage] = useState(1);
  const [displayedUsers, setDisplayedUsers] = useState<User[]>([]);

  const [createGroup, { isLoading }] = useCreateGroupMutation();
  const { data: recommendedUsers = [] } = useGetAllUserRecommendsQuery();

  useEffect(() => {
    AsyncStorage.getItem("userId").then(setUserId);
  }, []);

  useEffect(() => {
    if (visible && recommendedUsers.length > 0) {
      setDisplayedUsers(recommendedUsers.slice(0, PAGE_SIZE));
      setPage(1);
    }
  }, [visible, recommendedUsers]);

  const PAGE_SIZE = 15;

  const filteredUsers = useMemo(() => {
    return recommendedUsers
      .filter((user) => user.id !== userId) // bỏ chính mình
      .filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [searchTerm, recommendedUsers]);

  const paginatedUsers = useMemo(() => {
    return filteredUsers.slice(0, page * PAGE_SIZE);
  }, [filteredUsers, page]);

  const loadMoreUsers = () => {
    const nextPage = page + 1;
    if (nextPage * PAGE_SIZE <= filteredUsers.length) {
      setPage(nextPage);
    }
  };

  const toggleMember = (id: string) => {
    if (id === userId) return; // không cho chọn bản thân

    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });
    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleCreateGroup = async () => {
    if (!groupName || selectedMembers.length === 0) {
      setMsgError("Vui lòng nhập tên nhóm và chọn thành viên.");
      return;
    }

    console.log("Selected members:", selectedMembers);
    console.log("Sending user_ids:", selectedMembers.join(","));

    const formData = new FormData();
    formData.append("name", groupName);
    if (userId) {
      formData.append("created_by", userId);
    }
    formData.append("count_member", (1).toString());
    selectedMembers.forEach((id) => formData.append("user_ids", id));
    if (avatar) {
      const fileName = avatar.split("/").pop() || "image.jpg";
      const match = /\.(\w+)$/.exec(fileName);
      const fileType = match ? `image/${match[1]}` : `image`;
      formData.append("image", {
        uri: avatar,
        name: fileName,
        type: fileType,
      } as any);
    }
    try {
      await createGroup(formData).unwrap();
      refetchGroups();
      handleCancel();
    } catch (err) {
      console.error("Lỗi tạo nhóm:", err);
      setMsgError("Tạo nhóm thất bại, vui lòng thử lại.");
    }
  };

  const handleCancel = () => {
    setGroupName("");
    setAvatar("");
    setSelectedMembers([]);
    setSearchTerm("");
    setMsgError("");
    setDisplayedUsers([]);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View className="flex-1 justify-center items-center bg-black/30 px-4">
        <View className="bg-white w-full max-w-md max-h-[80%] rounded-xl p-4">
          <Text className="text-xl font-bold mb-4">Create group</Text>

          <TouchableOpacity onPress={pickImage} className="items-center mb-3">
            {avatar ? (
              <Image
                source={{ uri: avatar }}
                className="w-24 h-24 rounded-full"
              />
            ) : (
              <View className="w-24 h-24 rounded-full bg-gray-300 justify-center items-center">
                <Ionicons name="camera" size={30} color="#555" />
              </View>
            )}
          </TouchableOpacity>

          <Text className="font-semibold mb-2">Group name:</Text>
          <TextInput
            placeholder="Enter group name"
            value={groupName}
            onChangeText={setGroupName}
            className="border border-gray-300 rounded px-3 py-2 mb-3"
          />

          <View className="w-full">
            <Text className="font-semibold mb-2">Add member:</Text>

            <TextInput
              placeholder="Search user..."
              value={searchTerm}
              onChangeText={setSearchTerm}
              className="border border-gray-300 rounded-lg px-3 py-2 mb-2"
            />

            <FlatList
              data={filteredUsers}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <UserItem
                  id={item.id}
                  avatar={item.image_url}
                  name={item.username}
                  selected={selectedMembers.includes(item.id)}
                  onPress={() => toggleMember(item.id)}
                />
              )}
              onEndReached={loadMoreUsers}
              onEndReachedThreshold={0.5}
              showsVerticalScrollIndicator={false}
              style={{ maxHeight: 300 }} // hoặc 400 tùy màn hình
            />
          </View>

          {msgError ? (
            <Text className="text-red-500 my-2">{msgError}</Text>
          ) : null}

          <View className="flex-row justify-between gap-3 mt-3">
            <TouchableOpacity
              className="flex-1 border border-[#FE9519] py-3 rounded-lg items-center"
              onPress={handleCancel}
            >
              <Text className="text-[#FE9519] font-bold">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 bg-[#FE9519] py-3 rounded-lg items-center"
              onPress={handleCreateGroup}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white font-bold">Create</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
