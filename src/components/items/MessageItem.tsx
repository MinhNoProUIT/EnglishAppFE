import { View, Text, Image } from "react-native";
import { MessageItemProps } from "../../interfaces/MessageInterface";
import formatTimeMessage from "../../utils/formatTimeMessage";

export default function MessageItem({ text, sender, time, avatar }: MessageItemProps) {
  const isOwnMessage = sender === "Bạn";

  return (
    <View className={`mb-3 px-2 ${isOwnMessage ? "items-end" : "items-start"}`}>
      {!isOwnMessage && (
        <Text className="text-xs text-gray-600 mb-1 ml-10">{sender}</Text>
      )}

      <View className={`flex-row ${isOwnMessage ? "justify-end" : "justify-start"} items-end`}>
        {!isOwnMessage && (
          <Image
            source={{ uri: avatar }}
            className="w-8 h-8 rounded-full mr-2"
          />
        )}

        <View className={`max-w-[80%] ${isOwnMessage ? "items-end" : "items-start"}`}>
          <Text
            className={`px-3 py-2 rounded-xl ${
              isOwnMessage ? "bg-blue-200" : "bg-gray-200"
            }`}
          >
            {text}
          </Text>
          
        </View>

        {isOwnMessage && (
          <Image
            source={{ uri: avatar }}
            className="w-8 h-8 rounded-full ml-2"
          />
        )}
      </View>

      <Text className={`text-xs text-gray-500 mt-1 ${isOwnMessage ? "self-end mr-12" : "self-start ml-12"}`}>
            {formatTimeMessage(time)}
          </Text>
    </View>
  );
}
