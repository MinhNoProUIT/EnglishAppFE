import {
  View,
  TouchableOpacity,
  Text,
  Alert,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigations/AppNavigator";
import { useState } from "react";
import ChatActionSlider from "../sliders/ChatActionSlider";
import * as ImagePicker from "expo-image-picker";

type Props = {
  title: string;
  groupAvatar: string
};

export default function ChatHeader({ title, groupAvatar }: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [isSliderVisible, setSliderVisible] = useState(false);

  const handleAction = (type: string) => {
    setSliderVisible(false);
    switch (type) {
      case "add":
        handleAddMember();
        break;
      case "change-avatar":
        handleChangeAvatarGroup();
        break;
      case "leave":
        handleLeaveGroup();
        break;
    }
  };
  
  const handleAddMember = () => {
    Alert.alert("Thêm thành viên", "Tính năng này đang được phát triển.");
  };

  const handleChangeAvatarGroup = async () => {
    // Yêu cầu quyền truy cập ảnh
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.status !== "granted") {
      Alert.alert("Quyền bị từ chối", "Bạn cần cho phép truy cập thư viện ảnh để đổi avatar.");
      return;
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
      allowsEditing: true,
    });
  
    if (!result.canceled && result.assets.length > 0) {
      const selectedImageUri = result.assets[0].uri;
      // Gọi API hoặc cập nhật state avatar tại đây
      console.log("Avatar mới:", selectedImageUri);
      Alert.alert("Thành công", "Ảnh đại diện nhóm đã được cập nhật.");
    }
  };

  const handleLeaveGroup = () => {
    Alert.alert(
      "Xác nhận rời nhóm",
      "Bạn có chắc chắn muốn rời nhóm?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Rời nhóm",
          style: "destructive",
          onPress: () => {
            console.log("Đã rời nhóm");
            // Thực hiện điều hướng hoặc gọi API tại đây
          },
        },
      ]
    );
  };

  return (
    <View className="flex-row w-full pt-8 h-24 bg-white items-center justify-between px-4 border-b border-gray-100">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back-outline" size={28} color="black" />
      </TouchableOpacity>

      <View className="flex-1 flex-row items-center justify-center">
      <Image
        source={{ uri: groupAvatar }} 
        className="w-8 h-8 rounded-full mr-2"
      />
      <Text className="font-bold text-lg">{title}</Text>
    </View>


      <TouchableOpacity onPress={() => setSliderVisible(true)}>
        <Ionicons name="ellipsis-vertical" size={24} color="black" />
      </TouchableOpacity>

      <ChatActionSlider
        isVisible={isSliderVisible}
        onClose={() => setSliderVisible(false)}
        onAction={handleAction}
      />
    </View>
  );
}
