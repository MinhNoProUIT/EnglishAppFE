import { RouteProp, useRoute } from "@react-navigation/native";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import ChatHeader from "../../components/headers/ChatHeader";
import { RootStackParamList } from "../../navigations/AppNavigator";
import MessageItem from "../../components/items/MessageItem";
import {
  useGetAllMessagesQuery,
  useSendMessageMutation,
} from "../../services/messageService";
import { MessageItemProps } from "../../interfaces/MessageInterface";
import { useGetDetailsGroupQuery } from "../../services/groupService";
import { Group } from "../../interfaces/GroupInterface";

export default function Chat() {
  const route = useRoute<RouteProp<RootStackParamList, "Chat">>();
  const { groupId } = route.params;

  const {
    data: fetchedMessages,
    isLoading: messagesLoading,
    refetch: refetchMessages,
  } = useGetAllMessagesQuery(groupId);

  const {
    data: fetchedDetails,
    isLoading: detailsLoading,
    refetch: refetchDetails,
  } = useGetDetailsGroupQuery(groupId);

  const [sendMessageMutation] = useSendMessageMutation();

  const [messages, setMessages] = useState<MessageItemProps[]>([]);
  const [details, setDetails] = useState<Group>();
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    if (fetchedMessages) {
      setMessages(fetchedMessages);
    }
    if (fetchedDetails) {
      setDetails(fetchedDetails);
    }
  }, [fetchedMessages]);

  const sendMessage = async () => {
    const trimmed = inputText.trim();
    if (!trimmed) return;

    const messagePayload = {
      group_id: groupId,
      sender_id: "81f5c7d9-0cc5-4b40-b801-5ffdc3279d16", // TODO: Replace with actual user ID from auth
      content: trimmed,
    };

    try {
      await sendMessageMutation(messagePayload).unwrap();
      setInputText("");
      refetchMessages();
    } catch (error) {
      console.error("Failed to send message:", error);
      setInputText("");
    }
  };

  return (
    <View className="flex-1 bg-white">
      <ChatHeader
        groupId={groupId}
        group_name={details?.name}
        group_image_url={details?.image_url}
        created_by={details?.created_by}
      />
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        className="p-4 flex-1"
        renderItem={({ item }) => (
          <MessageItem
            id={item.id}
            sender_id={item.sender_id}
            sender_username={item.sender_username}
            sender_image_url={item.sender_image_url}
            content={item.content}
            created_date={item.created_date}
          />
        )}
      />
      <View className="flex-row p-2 mb-8 border-t border-gray-300 items-center">
        <TextInput
          value={inputText}
          onChangeText={setInputText}
          placeholder="Enter message..."
          className="flex-1 bg-gray-100 px-4 py-4 rounded-lg"
        />
        <TouchableOpacity
          onPress={sendMessage}
          className="ml-2 bg-blue-500 px-6 py-4 rounded-lg"
        >
          <Text className="text-white">Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
