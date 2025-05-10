import { View, FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigations/AppNavigator";
import GroupListHeader from "../../components/headers/GroupListHeader";
import GroupItem from "../../components/items/GroupItem";
import { useState } from "react";
import { CreateGroupProps } from "../../interfaces/GroupInterface";

export const groups = [
  {
    id: "1",
    name: "Lớp A",
    avatar: "https://i.pravatar.cc/100?u=lop-a",
    lastMessage: "Mai học lúc 7h nha!",
    lastMessageTime: "10:15",
    unseenCount: 2,
  },
  {
    id: "2",
    name: "Công ty B",
    avatar: "https://i.pravatar.cc/100?u=congty-b",
    lastMessage: "Tài liệu họp đã gửi.",
    lastMessageTime: "09:40",
    unseenCount: 0,
  },
  {
    id: "3",
    name: "Gia đình C",
    avatar: "https://i.pravatar.cc/100?u=giadinh-c",
    lastMessage: "Tối ăn gì?",
    lastMessageTime: "08:20",
    unseenCount: 5,
  },
];

export default function GroupList() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [groupList, setGroupList] = useState(groups);

  const handleAddGroup = (group: CreateGroupProps) => {
    const newGroup = {
      id: Date.now().toString(),
      name: group.name,
      avatar: group.avatar || "https://i.pravatar.cc/100?u=default",
      lastMessage: "",
      lastMessageTime: group.createdAt.toString(),
      unseenCount: 0,
    };
    setGroupList((prev) => [newGroup, ...prev]);
  };

  return (
    <View className="flex-1 bg-white p-4">
      <GroupListHeader onCreateGroup={handleAddGroup} />
      <FlatList
        data={groupList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GroupItem
            id={item.id}
            name={item.name}
            avatar={item.avatar}
            lastMessage={item.lastMessage}
            lastMessageTime={item.lastMessageTime}
            unseenCount={item.unseenCount}
            onPress={() =>
              navigation.navigate("Chat", {
                groupId: item.id,
              })
            }
          />
        )}
      />
    </View>
  );
}
