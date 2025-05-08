import React, { useState } from "react";
import {
    Modal,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image,
    Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { PostModalProps } from "../../interfaces/PostInterface";
import { Ionicons } from "@expo/vector-icons";
import { useTranslation } from "react-i18next";

const item = {
    id: 1,
    avatar: 'https://picsum.photos/400/400',
    name: "Cao Dương Lâm",
    email: 'caoduonglam@gmail.com',
    address: 'Ho Chi Minh City, Vietnam'
}

const PostModal: React.FC<PostModalProps> = ({ visible, onClose, onSubmit }) => {
    const { t } = useTranslation();
    const [title, setTitle] = useState("");
    const [image, setImage] = useState<string | null>(null);

    const [msgError, setMsgError] = useState<string>("");

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const pickFromCamera = async () => {
        const cameraPermissionResult = await ImagePicker.requestCameraPermissionsAsync();

        if (cameraPermissionResult.granted) {
            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                quality: 1,
            });

            if (!result.canceled) {
                setImage(result.assets[0].uri);
            }
        } else {
            Alert.alert(t("CAMERA_PERMISSION_REQUIRED"));
        }   
    };

    const handlePost = () => {
        if(!title){
            setMsgError("Title is required. Please fill it");
            return;
        }
        onSubmit({
            id: Date.now(),
            content: title,
            images: image ? [image] : [],
            fullname: item.name,
            avatar: item.avatar,
        });
        setTitle("");
        setImage(null); 
        onClose();
    };

    const handleCancel = () => {
        setMsgError("");
        setTitle("");
        setImage(null); 
        onClose();
    }

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
        >
            <View className="flex-1 justify-center items-center bg-black/30">
                <View className="bg-white w-11/12 rounded-xl p-4 items-center gap-2">
                    <Text className="text-xl font-bold mb-4">{t("TITLE_MODAL_POST")}</Text>

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
                                width: '100%',
                                height: 224,
                                marginBottom: 2,
                                backgroundColor: '#ddd',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            onPress={() =>
                                Alert.alert(
                                    t("CHOOSE_IMAGE_OPTION"),
                                    "",
                                    [
                                        {
                                            text: t("FROM_LIBRARY"),
                                            onPress: pickImage,
                                        },
                                        {
                                            text: t("FROM_CAMERA"),
                                            onPress: pickFromCamera,
                                        },
                                    ]
                                )
                            }
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
                        >
                            <Text className="text-white font-bold">{t("Post")}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default PostModal;
