// components/GroupListHeader.tsx
import { View, TouchableOpacity, Text, Platform } from "react-native";
import { FontAwesome6, Ionicons } from "@expo/vector-icons";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../navigations/AppNavigator";
import GroupModal from "../modals/GroupModal";
import { useState } from "react";

type GroupListHeaderProps = {
  refetch: () => void;
};

export default function GroupListHeader({ refetch }: GroupListHeaderProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  return (
    <View className="flex-row w-full pt-8 h-28 bg-white items-center justify-between px-4 border-b border-gray-100">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back-outline" size={24} color="black" />
      </TouchableOpacity>
      <Text className="font-bold text-2xl">Group</Text>
      <TouchableOpacity
        onPress={handleOpenModal}
        className="flex-row bg-[#FE9519] rounded-full w-8 h-8 items-center justify-center"
      >
        <FontAwesome6 name="plus" size={18} color="white" />
      </TouchableOpacity>

      <GroupModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        refetchGroups={refetch} 
      />
    </View>
  );
}
