import { View, Text, Image } from "react-native";
import { MessageItemProps } from "../../interfaces/MessageInterface";
import formatTimeMessage from "../../utils/formatTimeMessage";

export default function MessageItem({
  id,
  sender_id,
  sender_username,
  sender_image_url,
  content,
  created_date,
}: MessageItemProps) {
  const isOwnMessage = sender_id === "81f5c7d9-0cc5-4b40-b801-5ffdc3279d16"; // Replace with actual user ID

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
