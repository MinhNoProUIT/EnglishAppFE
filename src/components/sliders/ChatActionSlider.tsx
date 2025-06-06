// components/ChatActionSlider.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

type Props = {
  isVisible: boolean;
  onClose: () => void;
  onAction: (action: string) => void;
  created_by?: string;
};

export default function ChatActionSlider({
  isVisible,
  onClose,
  onAction,
  created_by,
}: Props) {
  const userId = "81f5c7d9-0cc5-4b40-b801-5ffdc3279d16"; // Replace with actual user ID
  const isUserAdmin = created_by === userId;

  return (
    <Modal
      isVisible={isVisible}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={{ margin: 0, justifyContent: "flex-end", alignItems: "flex-end" }}
    >
      <View className="w-64 h-full bg-white p-6 shadow-lg">
        <Text className="text-2xl font-bold mb-4 mt-10">Option</Text>
        {isUserAdmin && (
          <>
            <TouchableOpacity onPress={() => onAction("add")} className="mb-4">
              <Text className="text-base">Thêm thành viên</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onAction("change-group-name")}
              className="mb-4"
            >
              <Text className="text-base">Đổi tên nhóm</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onAction("change-avatar")}
              className="mb-4"
            >
              <Text className="text-base">Đổi ảnh nhóm</Text>
            </TouchableOpacity>
          </>
        )}
        <TouchableOpacity
          onPress={() => onAction("view-members")}
          className="mb-4"
        >
          <Text className="text-base">View all members</Text>
        </TouchableOpacity>
        {isUserAdmin ? (
          <TouchableOpacity
            onPress={() => onAction("disband")}
            className="mb-4"
          >
            <Text className="text-base text-red-500">Disband group</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => onAction("leave")} className="mb-4">
            <Text className="text-base text-red-500">Leave group</Text>
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
}
