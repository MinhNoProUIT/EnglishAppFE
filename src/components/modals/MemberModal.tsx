// components/modals/MemberModal.tsx
import React from "react";
import {
  Modal,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { MemberData } from "../../interfaces/MemberInterface";
import avatar_default from "../../../assets/avatar-default.jpg";

type Props = {
  visible: boolean;
  onClose: () => void;
  members?: MemberData[];
};

export default function MemberModal({
  visible,
  onClose,
  members,
}: Props) {

  const handleClose = () => {
    onClose();
  };
  
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
    >
      <View className="flex-1 justify-center items-center bg-black/30 px-4 z-50">
        <View className="bg-white w-full max-w-md max-h-[80%] rounded-xl p-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-semibold">Thành viên nhóm</Text>
            <TouchableOpacity onPress={handleClose}>
              <Ionicons name="close" size={24} color="black" />
            </TouchableOpacity>
          </View>
            <ScrollView>
              {members?.map((member, index) => (
                <View key={index} className="flex-row items-center mb-3">
                  <Image
                    source={
                      member?.image_url
                        ? { uri: member.image_url }
                        : avatar_default
                    }
                    className="w-9 h-9 rounded-full mr-3"
                  />
                  <View className="flex-col">
                    <Text className="text-base font-semibold">
                      {member?.username || "Không tên"}
                    </Text>
                    <Text className="text-sm">
                      {member?.is_admin ? "Quản trị viên" : "Thành viên"}
                    </Text>
                  </View>
                </View>
              ))}
            </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
