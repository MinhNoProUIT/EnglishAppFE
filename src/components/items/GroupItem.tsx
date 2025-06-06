// components/GroupItem.tsx
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { GroupItemProps } from "../../interfaces/GroupInterface";
import formatTimeMessage from './../../utils/formatTimeMessage';

const GroupItem: React.FC<GroupItemProps> = ({
  id,
  group_name,
  group_image_url,
  last_username,
  last_message, 
  last_time_message,
  onPress,
}) => {
  return (
    <TouchableOpacity
      className="flex-row items-center p-3 bg-gray-100 rounded-xl mb-3"
      onPress={onPress}
    >
      <Image source={{ uri: group_image_url }} className="w-12 h-12 rounded-full mr-4" />
      <View className="flex-1">
        <View className="flex-row justify-between">
          {last_time_message ? (
            <>
              <Text className="text-base font-semibold">{group_name}</Text>
              <Text className="text-xs text-gray-500">{formatTimeMessage(last_time_message)}</Text>
            </>
          ) : (
            // Nếu không có lastMessageTime, hiển thị tên group căn giữa
            <Text className="text-base font-semibold text-start justify-center flex-1">
              {group_name}
            </Text>
          )}
        </View>
        <View className="flex-row justify-between items-center mt-1">
          <Text className="text-sm text-gray-600" numberOfLines={1}>
            {last_username}: {last_message}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default GroupItem;
