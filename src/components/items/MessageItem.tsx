import { View, Text, Image } from "react-native";
import { MessageItemProps } from "../../interfaces/MessageInterface";
import formatTimeMessage from "../../utils/formatTimeMessage";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function MessageItem({
  id,
  sender_id,
  sender_username,
  sender_image_url,
  content,
  created_date,
  loading = false
}: MessageItemProps) {
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem("userId").then(setUserId);
  }, []); 

  const isOwnMessage = sender_id === userId;


  if (loading) {
    return (
      <View className="py-4 items-center justify-center">
        <Text className="text-gray-400">Đang tải tin nhắn...</Text>
      </View>
    );
  }

  return (
    <View className={`mb-3 px-2 ${isOwnMessage ? "items-end" : "items-start"}`}>
      {!isOwnMessage && (
        <Text className="text-xs text-gray-600 mb-1 ml-10">
          {sender_username}
        </Text>
      )}

      <View
        className={`flex-row ${
          isOwnMessage ? "justify-end" : "justify-start"
        } items-end`}
      >
        {!isOwnMessage && (
          <Image
            source={{ uri: sender_image_url }}
            className="w-8 h-8 rounded-full mr-2"
          />
        )}

        <View
          className={`max-w-[80%] ${
            isOwnMessage ? "items-end" : "items-start"
          }`}
        >
          <Text
            className={`px-3 py-2 rounded-xl ${
              isOwnMessage ? "bg-blue-200" : "bg-gray-200"
            }`}
          >
            {content}
          </Text>
        </View>

        {isOwnMessage && (
          <Image
            source={{ uri: sender_image_url }}
            className="w-8 h-8 rounded-full ml-2"
          />
        )}
      </View>

      <Text
        className={`text-xs text-gray-500 mt-1 ${
          isOwnMessage ? "self-end mr-12" : "self-start ml-12"
        }`}
      >
        {formatTimeMessage(created_date)}
      </Text>
    </View>
  );
}
