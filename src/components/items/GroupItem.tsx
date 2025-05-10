// components/GroupItem.tsx
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { GroupItemProps } from "../../interfaces/GroupInterface";
import formatTimeMessage from "./../../utils/formatTimeMessage";

const GroupItem: React.FC<GroupItemProps> = ({
  id,
  name,
  avatar,
  lastMessage,
  lastMessageTime,
  unseenCount,
  onPress,
}) => {
  return (
    <TouchableOpacity
      className="flex-row items-center p-3 bg-gray-100 rounded-xl mb-3"
      onPress={onPress}
    >
      <Image source={{ uri: avatar }} className="w-12 h-12 rounded-full mr-4" />
      <View className="flex-1">
        <View className="flex-row justify-between">
          {lastMessageTime ? (
            <>
              <Text className="text-base font-semibold">{name}</Text>
              <Text className="text-xs text-gray-500">{lastMessageTime}</Text>
            </>
          ) : (
            // Nếu không có lastMessageTime, hiển thị tên group căn giữa
            <Text className="text-base font-semibold text-start justify-center flex-1">
              {name}
            </Text>
          )}
        </View>
        <View className="flex-row justify-between items-center mt-1">
          <Text className="text-sm text-gray-600" numberOfLines={1}>
            {lastMessage}
          </Text>
          {unseenCount > 0 && (
            <View className="bg-red-500 px-2 py-1 rounded-full ml-2">
              <Text className="text-white text-xs">{unseenCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GroupItem;
