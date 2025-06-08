import {
  View,
  TouchableOpacity,
  Text,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigations/AppNavigator";
import { useCallback, useEffect, useState } from "react";
import ChatActionSlider from "../sliders/ChatActionSlider";
import * as ImagePicker from "expo-image-picker";
import {
  useChangeGroupImageMutation,
  useChangeGroupNameMutation,
  useGetDetailsGroupQuery,
} from "../../services/groupService";
import {
  useDishBandGroupMutation,
  useGetAllMembersQuery,
  useLeaveGroupMutation,
  useKickMemberFromGroupMutation,
} from "../../services/groupMemberService";
import MemberModal from "../modals/MemberModal";
import SelectMembersModal from "../modals/AddMemberModal";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const [isMemberModalVisible, setMemberModalVisible] = useState(false);
  const [addMemberModalVisible, setAddMemberModalVisible] = useState(false);
  const [selectMemberMode, setSelectMemberMode] = useState<
    "add" | "kick" | null
  >(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
      AsyncStorage.getItem("userId").then(setUserId);
    }, []);

  const [changeGroupName, { isLoading: isLoadingChangeName }] =
    useChangeGroupNameMutation();
  const [changeGroupImage, { isLoading: isLoadingChangeImage }] =
    useChangeGroupImageMutation();
  const [dishBandGroup] = useDishBandGroupMutation();
  const [leaveGroup] = useLeaveGroupMutation();
  const { data: groupDetails, refetch } = useGetDetailsGroupQuery(groupId);
  const { data: members, refetch: refetchMembers } =
    useGetAllMembersQuery(groupId);

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
      case "kick":
        handleKickMembers();
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
    setSelectMemberMode("add");
    setAddMemberModalVisible(true);
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

  const handleViewMembers = () => {
    setMemberModalVisible(true);
    if (isMemberModalVisible && addMemberModalVisible) {
      console.log("Cả hai modal đều visible - có thể bị che khuất");
    }
  };

  const handleKickMembers = () => {
    setSelectMemberMode("kick");
    setAddMemberModalVisible(true);
  };

  const handleLeaveGroup = () => {
    Alert.alert("Xác nhận rời nhóm", "Bạn có chắc chắn muốn rời nhóm?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Rời nhóm",
        style: "destructive",
        onPress: () => {
          confirmLeaveGroup();
        },
      },
    ]);
  };

  const handleDisbandGroup = async () => {
    Alert.alert("Giải tán nhóm", "Bạn có chắc chắn muốn giải tán nhóm này?", [
      { text: "Hủy", style: "cancel" },
      {
        text: "Giải tán",
        style: "destructive",
        onPress: () => {
          confirmDisbandGroup();
        },
      },
    ]);
  };

  const confirmDisbandGroup = async () => {
    try {
      await dishBandGroup({ group_id: groupId });
      Alert.alert("Thành công", "Nhóm đã được giải tán.", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.error("Lỗi khi giải tán nhóm:", error);
      Alert.alert("Lỗi", "Không thể giải tán nhóm. Vui lòng thử lại sau.");
    }
  };

  const confirmLeaveGroup = async () => {
    try {
      if (userId){
        await leaveGroup({ group_id: groupId, user_id: userId });
      }
      Alert.alert("Thành công", "Rời nhóm thành công", [
        {
          text: "OK",
          onPress: () => navigation.goBack(),
        },
      ]);
    } catch (error) {
      console.error("Lỗi khi rời nhóm:", error);
      Alert.alert("Lỗi", "Không thể rời nhóm. Vui lòng thử lại sau.");
    }
  };

  useFocusEffect(
    useCallback(() => {
      refetchMembers();
    }, [refetchMembers])
  );

  return (
    <>
      {isMemberModalVisible && (
        <MemberModal
          visible={isMemberModalVisible}
          onClose={() => setMemberModalVisible(false)}
          members={members}
        />
      )}
      {addMemberModalVisible && !isMemberModalVisible && (
        <SelectMembersModal
          visible={addMemberModalVisible}
          onClose={() => {
            setAddMemberModalVisible(false);
            setSelectMemberMode(null); // Reset mode
          }}
          groupId={groupId}
          members={members}
          mode={selectMemberMode}
        />
      )}
      {isSliderVisible && !isMemberModalVisible && !addMemberModalVisible && (
        <ChatActionSlider
          isVisible={isSliderVisible}
          onClose={() => setSliderVisible(false)}
          onAction={handleAction}
          created_by={created_by}
        />
      )}
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
      </View>
    </>
  );
}
