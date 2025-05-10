// components/ChatActionSlider.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";

type Props = {
  isVisible: boolean;
  onClose: () => void;
  onAction: (action: string) => void;
};

export default function ChatActionSlider({ isVisible, onClose, onAction }: Props) {
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
        <Text className="text-lg font-bold mb-4">Option</Text>
        <TouchableOpacity onPress={() => onAction("add")} className="mb-4">
          <Text className="text-base">Add member</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onAction("change-avatar")} className="mb-4">
          <Text className="text-base">Change avatar group</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onAction("leave")} className="mb-4">
          <Text className="text-base text-red-500">Leave group</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
