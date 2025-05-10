// screens/ChatScreen.tsx
import { RouteProp, useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useState } from "react";
import ChatHeader from "../../components/headers/ChatHeader";
import { groups } from "./GroupList";
import { RootStackParamList } from "../../navigations/AppNavigator";
import MessageItem from "../../components/items/MessageItem";

const allMessages: {
    [key: string]: {
      id: string;
      sender: string;
      text: string;
      time: Date;
      avatar: string;
    }[];
  } = {
    "1": [
      {
        id: "1",
        sender: "Alice",
        text: "Xin chào",
        time: new Date("2024-05-10T08:00:00"),
        avatar: "https://i.pravatar.cc/100?u=alice",
      },
      {
        id: "2",
        sender: "Bạn",
        text: "Chào bạn!",
        time: new Date("2024-05-10T08:01:00"),
        avatar: "https://i.pravatar.cc/100?u=ban",
      },
    ],
    "2": [
      {
        id: "1",
        sender: "Bình",
        text: "Tài liệu đã gửi",
        time: new Date("2024-05-10T09:00:00"),
        avatar: "https://i.pravatar.cc/100?u=binh",
      },
      {
        id: "2",
        sender: "Bạn",
        text: "Oke nhé",
        time: new Date("2024-05-10T09:01:00"),
        avatar: "https://i.pravatar.cc/100?u=ban",
      },
    ],
    "3": [
      {
        id: "1",
        sender: "Mẹ",
        text: "Ăn tối chưa con?",
        time: new Date("2024-05-10T19:00:00"),
        avatar: "https://i.pravatar.cc/100?u=me",
      },
      {
        id: "2",
        sender: "Bạn",
        text: "Dạ chưa",
        time: new Date("2024-05-10T19:01:00"),
        avatar: "https://i.pravatar.cc/100?u=ban",
      },
    ],
  };
  

export default function Chat() {
  const route = useRoute<RouteProp<RootStackParamList, "Chat">>();
  const { groupId } = route.params;

  const currentGroup = groups.find((g) => g.id === groupId);

  const [messages, setMessages] = useState(allMessages[groupId] || []);

  const [inputText, setInputText] = useState("");

  const sendMessage = () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;
  
    const newMessage = {
      id: Date.now().toString(), 
      sender: "Bạn",
      text: trimmed,
      time: new Date(),
      avatar: "https://i.pravatar.cc/100?u=ban",
    };
    setMessages([...messages, newMessage]);
    setInputText("");
  };
  
  return (
    <View className="flex-1 bg-white">
      <ChatHeader title={currentGroup?.name ?? "Chat"} groupAvatar="https://i.pravatar.cc/100?u=ban"/>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        className="p-4 flex-1"
        renderItem={({ item }) => (
          <MessageItem
            id={item.id}
            text={item.text}
            sender={item.sender}
            time={item.time}
            avatar={item.avatar}
          />
        )}
      />
      <View className="flex-row p-2 border-t border-gray-300 items-center">
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Enter message..."
          className="flex-1 bg-gray-100 px-4 py-2 rounded-lg"
        />
        <TouchableOpacity
          onPress={sendMessage}
          className="ml-2 bg-blue-500 px-4 py-2 rounded-lg"
        >
          <Text className="text-white">Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
