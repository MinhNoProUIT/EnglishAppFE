import React, { useEffect, useState } from "react";
import {
  Modal,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { PostModalProps } from "../../interfaces/PostInterface";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PostModal: React.FC<PostModalProps> = ({
  visible,
  onClose,
  onSubmit,
  isLoading,
}) => {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [msgError, setMsgError] = useState<string>("");
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem("userId").then(setUserId);
  });

  const handleChooseImage = async () => {
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
            setImage(uri);
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
            setImage(uri);
          }
        },
      },
      { text: "Hủy", style: "cancel" },
    ]);
  };

  const handlePost = () => {
    if (!title) {
      setMsgError("Title is required. Please fill it");
      return;
    }
    const formData = new FormData();
    if (userId) {
      formData.append("user_id", userId);
    }
    formData.append("content", title);

    if (image) {
      const fileName = image.split("/").pop() || "image.jpg";
      const match = /\.(\w+)$/.exec(fileName);
      const fileType = match ? `image/${match[1]}` : `image`;
      formData.append("image", {
        uri: image,
        name: fileName,
        type: fileType,
      } as any);
    }
    onSubmit(formData);
    handleCancel();
  };

  const handleCancel = () => {
    setMsgError("");
    setTitle("");
    setImage(null);
    onClose();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent={true}>
      <View className="flex-1 justify-center items-center bg-black/30">
        <View className="bg-white w-11/12 rounded-xl p-4 items-center gap-2">
          <Text className="text-xl font-bold mb-4">
            {t("TITLE_MODAL_POST")}
          </Text>

          <TextInput
            placeholder={t("PLACEHOLDER_TITLE_POST")}
            value={title}
            onChangeText={setTitle}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-3"
          />
          {msgError && (
            <>
              <Text className="text-red-500 text-base">{msgError}</Text>
            </>
          )}
          {image ? (
            <Image
              source={{ uri: image }}
              className="w-full h-56 rounded-lg mb-3"
            />
          ) : (
            <TouchableOpacity
              style={{
                width: "100%",
                height: 224,
                marginBottom: 2,
                backgroundColor: "#ddd",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={handleChooseImage}
            >
              <Ionicons name="add" size={40} color="black" />
            </TouchableOpacity>
          )}
          <View className="flex-row justify-between gap-3">
            <TouchableOpacity
              className="flex-1 bg-red-500 py-2 rounded-lg mb-2 items-center"
              onPress={handleCancel}
            >
              <Text className="text-white font-bold">{t("CANCEL")}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="flex-1 bg-blue-500 py-2 rounded-lg mb-2 items-center"
              onPress={handlePost}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text className="text-white font-bold">{t("Post")}</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default PostModal;
