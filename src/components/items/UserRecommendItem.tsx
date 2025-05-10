import React from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { UserItemProps } from "../../interfaces/UserInterface";

export default function UserItem({ id, name, avatar, selected, onPress }: UserItemProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className={`flex-row items-center px-3 py-2 border-b-gray-600 mb-2 ${
        selected ? "bg-blue-100" : "bg-white"
      }`}
    >
      <Image
        source={{ uri: avatar || "https://i.pravatar.cc/100?u=" + id }}
        className="w-10 h-10 rounded-full mr-3"
      />
      <Text className="flex-1 text-base">{name}</Text>
      <Ionicons
        name={selected ? "radio-button-on" : "radio-button-off"}
        size={20}
        color={selected ? "#007bff" : "#ccc"}
      />
    </TouchableOpacity>
  );
}
