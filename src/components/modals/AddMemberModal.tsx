import React, { useEffect, useMemo, useState } from "react";
import {
  Modal,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetAllUserRecommendsQuery } from "../../services/userService";
import UserItem from "../items/UserRecommendItem";
import {
  useAddMemberToGroupMutation,
  useKickMemberFromGroupMutation,
} from "../../services/groupMemberService";
import { MemberData } from "../../interfaces/MemberInterface";

interface SelectMembersModalProps {
  visible: boolean;
  onClose: () => void;
  groupId: string;
  members?: MemberData[];
  mode: "add" | "kick" | null;
}

export default function SelectMembersModal({
  visible,
  onClose,
  groupId,
  members,
  mode,
}: SelectMembersModalProps) {
  const PAGE_SIZE = 15;
  const [userId, setUserId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const { data: recommendedUsers = [] } = useGetAllUserRecommendsQuery();
  const [addMembersToGroup, { isLoading }] = useAddMemberToGroupMutation();
  const [kickMemberFromGroup, { isLoading: isLoadingKick }] =
    useKickMemberFromGroupMutation();

  useEffect(() => {
    AsyncStorage.getItem("userId").then(setUserId);
  }, []);

  useEffect(() => {
    if (visible) {
      setPage(1);
      setSelectedMembers([]);
      setSearchTerm("");
    }
  }, [visible]);

  const filteredUsers = useMemo(() => {
    const memberIds = members?.map((member) => member.user_id) || [];

    if (mode === "kick") {
      if (!members) return;
      return members
        .filter((member) => member.user_id !== userId)
        .filter((member) =>
          member.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    return recommendedUsers
      .filter((user) => !memberIds.includes(user.id))
      .filter((user) =>
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
  }, [mode, searchTerm, recommendedUsers, members, userId]);

  const paginatedUsers = useMemo(() => {
    if (!filteredUsers) return;
    return filteredUsers.slice(0, page * PAGE_SIZE);
  }, [filteredUsers, page]);

  const loadMoreUsers = () => {
    const nextPage = page + 1;
    if (!filteredUsers) return;
    if (nextPage * PAGE_SIZE <= filteredUsers.length) {
      setPage(nextPage);
    }
  };

  const toggleMember = (id: string) => {
    if (id === userId) return;
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const handleCancel = () => {
    setSearchTerm("");
    setSelectedMembers([]);
    onClose();
  };

  const handleAddOrKickMembers = async () => {
    try {
      if (mode === "kick") {
        console.log(selectedMembers, groupId);
        await kickMemberFromGroup({
          group_id: groupId,
          user_ids: selectedMembers,
        }).unwrap();
        Alert.alert(
          "Thành công",
          `Đã kick ${selectedMembers.length} thành viên ra nhóm`,
          [{ text: "OK" }]
        );
      } else {
        console.log(selectedMembers, groupId);
        await addMembersToGroup({
          group_id: groupId,
          user_ids: selectedMembers,
          is_admin: false,
        }).unwrap();
        Alert.alert(
          "Thành công",
          `Đã thêm ${selectedMembers.length} thành viên vào nhóm`,
          [{ text: "OK" }]
        );
      }
      handleCancel();
    } catch (err) {
      if (mode === "kick") {
        console.error("Lỗi khi kick thành viên:", err);
        Alert.alert(
          "Lỗi",
          "Không thể kick thành viên ra nhóm. Vui lòng thử lại.",
          [{ text: "OK" }]
        );
      } else {
        console.error("Lỗi khi thêm thành viên:", err);
        Alert.alert(
          "Lỗi",
          "Không thể thêm thành viên vào nhóm. Vui lòng thử lại.",
          [{ text: "OK" }]
        );
      }
    }
  };

  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View className="flex-1 justify-center items-center bg-black/30">
        <View className="bg-white w-4/5 max-h-[70%] rounded-lg p-4">
          <Text className="text-lg font-bold">
            {mode === "kick"
              ? "Chọn thành viên để xoá khỏi nhóm"
              : "Chọn thành viên để thêm vào nhóm"}
          </Text>

          <TextInput
            placeholder="Tìm kiếm người dùng..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            className="border border-gray-300 rounded-lg px-3 py-2 mb-2"
          />

          <FlatList
            data={paginatedUsers}
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
            style={{ maxHeight: 300 }}
          />

          <View className="flex-row justify-between gap-3 mt-3">
            <TouchableOpacity
              className="flex-1 border border-[#FE9519] py-3 rounded-lg items-center"
              onPress={handleCancel}
            >
              <Text className="text-[#FE9519] font-bold">Hủy</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="flex-1 bg-[#FE9519] py-3 rounded-lg items-center"
              onPress={handleAddOrKickMembers}
              disabled={isLoading || isLoadingKick}
            >
              {isLoading || isLoadingKick ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text className="text-white font-bold">
                  {" "}
                  {mode === "kick" ? "Kick" : "Thêm"}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
