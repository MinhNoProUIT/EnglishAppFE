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
import { CreateGroupProps } from "../../interfaces/GroupInterface";

const mockUsers = Array.from({ length: 30 }, (_, index) => {
  const id = index + 1;
  const names = [
    "Nguyễn Văn A",
    "Trần Thị B",
    "Lê Văn C",
    "Phạm Thị D",
    "Hoàng Văn E",
    "Đặng Thị F",
    "Bùi Văn G",
    "Võ Thị H",
    "Đỗ Văn I",
    "Ngô Thị J",
    "Phan Văn K",
    "Lý Thị L",
    "Tạ Văn M",
    "Chu Thị N",
    "Dương Văn O",
    "Hồ Thị P",
    "Trịnh Văn Q",
    "Mai Thị R",
    "Vũ Văn S",
    "Kiều Thị T",
    "Lâm Văn U",
    "Tô Thị V",
    "Cao Văn W",
    "La Thị X",
    "Trà Văn Y",
    "Thiều Thị Z",
    "Nguyễn Văn Bảo",
    "Trần Thị Mai",
    "Lê Văn Minh",
    "Phạm Thị Hương",
  ];

  return {
    id,
    name: names[index],
    avatar: `https://i.pravatar.cc/100?img=${id}`,
  };
});

interface GroupModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
}

export default function CreateGroupModal({
  visible,
  onClose,
  onSubmit,
}: GroupModalProps) {
  const { t } = useTranslation();
  const [groupName, setGroupName] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [countNumber, setCountNumber] = useState(1);
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [msgError, setMsgError] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [userRecommend, setUserRecommend] = useState(mockUsers);

  const PAGE_SIZE = 15;

  const [page, setPage] = useState(1);
  const [displayedUsers, setDisplayedUsers] = useState<User[]>([]);

  useEffect(() => {
    if (visible) {
      setDisplayedUsers(mockUsers.slice(0, PAGE_SIZE));
      setPage(1);
    }
  }, [visible]);

  const filteredUsers = useMemo(() => {
    return userRecommend.filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, userRecommend]);

  const loadMoreUsers = () => {
    const nextPage = page + 1;
    const nextUsers = mockUsers.slice(0, nextPage * PAGE_SIZE);
    if (nextUsers.length > displayedUsers.length) {
      setDisplayedUsers(nextUsers);
      setPage(nextPage);
    }
  };

  const toggleMember = (id: number) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleCreateGroup = () => {
    if (!groupName) {
      setMsgError("Tên nhóm không được để trống.");
      return;
    }
    if (selectedMembers.length === 0) {
      setMsgError("Hãy chọn ít nhất một thành viên.");
      return;
    }

    const formData = new FormData();
    if (avatar) {
      const filename = avatar.split("/").pop();
      const match = /\.(\w+)$/.exec(filename ?? "");
      const type = match ? `image/${match[1]}` : `image`;

      formData.append("image_url", {
        uri: avatar,
        name: filename,
        type,
      } as any);

      formData.append("name", groupName);
      formData.append("created_by", "81f5c7d9-0cc5-4b40-b801-5ffdc3279d16"); // Replace with actual user ID
      formData.append("count_member", countNumber.toString());
      formData.append("user_ids", JSON.stringify(selectedMembers));
    }
    onSubmit(formData);
    setGroupName("");
    setAvatar("");
    setSelectedMembers([]);
    setSearchTerm("");
    setMsgError("");
    setDisplayedUsers([]);
    onClose();
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
      <View className="flex-1 justify-center items-center bg-black/30">
        <View className="bg-white w-11/12 h-full mt-8 rounded-xl p-4">
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
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <UserItem
                  id={item.id}
                  avatar={item.avatar}
                  name={item.name}
                  selected={selectedMembers.includes(item.id)}
                  onPress={() => toggleMember(item.id)}
                />
              )}
              onEndReached={loadMoreUsers}
              onEndReachedThreshold={0.5}
              showsVerticalScrollIndicator={false}
              style={{ maxHeight: 440 }}
            />
          </View>

          {msgError ? (
            <Text className="text-red-500 my-2">{msgError}</Text>
          ) : null}

          <View className="flex-row justify-between gap-3 mt-3">
            <TouchableOpacity
              className="flex-1 bg-red-500 py-2 rounded-lg items-center"
              onPress={handleCancel}
            >
              <Text className="text-white font-bold">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-green-500 py-2 rounded-lg items-center"
              onPress={handleCreateGroup}
            >
              <Text className="text-white font-bold">Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
