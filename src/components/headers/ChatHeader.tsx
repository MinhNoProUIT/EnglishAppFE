import {
  View,
  TouchableOpacity,
  Text,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigations/AppNavigator";
import { useState } from "react";
import ChatActionSlider from "../sliders/ChatActionSlider";
import * as ImagePicker from "expo-image-picker";
import {
  useChangeGroupImageMutation,
  useChangeGroupNameMutation,
  useGetDetailsGroupQuery,
} from "../../services/groupService";

type Props = {
  groupId: string;
  group_name?: string;
  group_image_url?: string;
  created_by?: string;
};

export default function ChatHeader({
  groupId,
  group_name,
  group_image_url,
  created_by,
}: Props) {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [isSliderVisible, setSliderVisible] = useState(false);

  const [changeGroupName, { isLoading: isLoadingChangeName  }] =
    useChangeGroupNameMutation();
  const [changeGroupImage, { isLoading: isLoadingChangeImage }] =
    useChangeGroupImageMutation();
  const { data: groupDetails, refetch } = useGetDetailsGroupQuery(groupId);

  const handleAction = (type: string) => {
    setSliderVisible(false);
    switch (type) {
      case "add":
        handleAddMember();
        break;
      case "change-group-name":
        handleChangeGroupName();
        break;
      case "change-avatar":
        handleChangeAvatarGroup();
        break;
      case "view-members":
        handleViewMembers();
        break;
      case "leave":
        handleLeaveGroup();
        break;
      case "disband":
        handleDisbandGroup();
        break;
    }
  };

  const uploadGroupAvatar = async (uri: string) => {
    try {
      const fileName = uri.split("/").pop() || "image.jpg";
      const match = /\.(\w+)$/.exec(fileName);
      const fileType = match ? `image/${match[1]}` : `image`;

      const formData = new FormData();
      formData.append("image", {
        uri,
        name: fileName,
        type: fileType,
      } as any);

      await changeGroupImage({
        groupId: groupId,
        formData,
      }).unwrap();
      refetch();

      Alert.alert("Thành công", "Ảnh đại diện đã được cập nhật.");
    } catch (error) {
      console.error("Lỗi khi cập nhật ảnh đại diện:", error);
      Alert.alert("Lỗi", "Không thể cập nhật ảnh đại diện nhóm.");
    }
  };

  const handleChangeAvatarGroup = async () => {
    Alert.alert("Chọn ảnh", "Bạn muốn chọn ảnh từ đâu?", [
      {
        text: "Thư viện",
        onPress: async () => {
          const { status } =
            await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== "granted") {
            Alert.alert(
              "Không có quyền",
              "Ứng dụng cần quyền truy cập thư viện ảnh."
            );
            return;
          }

          const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.7,
          });

          if (!result.canceled && result.assets.length > 0) {
            const uri = result.assets[0].uri;
            await uploadGroupAvatar(uri);
          }
        },
      },
      {
        text: "Chụp ảnh",
        onPress: async () => {
          const { status } = await ImagePicker.requestCameraPermissionsAsync();
          if (status !== "granted") {
            Alert.alert(
              "Không có quyền",
              "Ứng dụng cần quyền truy cập camera."
            );
            return;
          }

          const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.7,
          });

          if (!result.canceled && result.assets.length > 0) {
            const uri = result.assets[0].uri;
            await uploadGroupAvatar(uri);
          }
        },
      },
      { text: "Hủy", style: "cancel" },
    ]);
  };

  const handleAddMember = () => {
    Alert.alert("Thêm thành viên", "Tính năng này đang được phát triển.");
  };

  const handleChangeGroupName = () => {
    Alert.prompt?.(
      // iOS only
      "Đổi tên nhóm",
      "Nhập tên nhóm mới:",
      [
        {
          text: "Hủy",
          style: "cancel",
        },
        {
          text: "Lưu",
          onPress: async (newName) => {
            if (newName?.trim()) {
              const trimmedName = newName.trim();
              try {
                await changeGroupName({
                  groupId: groupId,
                  name: trimmedName,
                }).unwrap();
                refetch();
                Alert.alert("Thành công", "Tên nhóm đã được cập nhật.");
              } catch (error) {
                console.error("Lỗi đổi tên nhóm:", error);
                Alert.alert("Thất bại", "Không thể cập nhật tên nhóm.");
              }
            }
          },
        },
      ],
      "plain-text"
    );
  };

  const handleViewMembers = () => {};

  const handleLeaveGroup = () => {
    Alert.alert("Xác nhận rời nhóm", "Bạn có chắc chắn muốn rời nhóm?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Rời nhóm",
        style: "destructive",
        onPress: () => {
          console.log("Đã rời nhóm");
          // Thực hiện điều hướng hoặc gọi API tại đây
        },
      },
    ]);
  };

  const handleDisbandGroup = () => {
    Alert.alert("Giải tán nhóm", "Bạn có chắc chắn muốn giải tán nhóm này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Giải tán",
        style: "destructive",
        onPress: () => {
          console.log("Đã giải tán nhóm");
          // Gọi API giải tán nhóm tại đây và điều hướng
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View className="flex-row w-full pt-10 h-28 bg-white items-center justify-between px-4 border-b border-gray-100">
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back-outline" size={28} color="black" />
      </TouchableOpacity>

      <View className="flex-1 flex-row items-center justify-center">
        {isLoadingChangeImage ? (
          <ActivityIndicator
            size="small"
            color="#FE9519"
            className="w-8 h-8 mr-2"
          />
        ) : (
          <Image
            source={{
              uri:
                groupDetails?.image_url ||
                "https://example.com/default-group-avatar.png",
            }}
            className="w-8 h-8 rounded-full mr-2"
          />
        )}

        {isLoadingChangeName ? (
          <Text className="text-gray-500 italic">Đang cập nhật...</Text>
        ) : (
          <Text className="font-bold text-lg">
            {groupDetails?.name ?? "Tên nhóm"}
          </Text>
        )}
      </View>

      <TouchableOpacity onPress={() => setSliderVisible(true)}>
        <Ionicons name="ellipsis-vertical" size={24} color="black" />
      </TouchableOpacity>

      <ChatActionSlider
        isVisible={isSliderVisible}
        onClose={() => setSliderVisible(false)}
        onAction={handleAction}
        created_by={created_by}
      />
    </View>
  );
}
