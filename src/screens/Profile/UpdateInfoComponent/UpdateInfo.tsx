import { Ionicons } from "@expo/vector-icons";
import React, { useState, useEffect } from "react";
import {
  ScrollView,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import DatePicker from "react-native-modal-datetime-picker"; // Thêm thư viện để chọn ngày
import {
  useGetByIdQuery,
  useUpdateMutation,
} from "../../../services/userService";
import { use } from "i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker"; // Import thư viện ImagePicker
import { useTranslation } from "react-i18next";

export default function UpdateInfo() {
  const { t } = useTranslation();
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(""); // Lưu trữ ngày sinh đã chọn
  const [username, setUsername] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [gender, setGender] = useState<boolean | undefined>(undefined);
  const [fullname, setFullname] = useState("");
  const [address, setAddress] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  // Get userId from AsyncStorage
  useEffect(() => {
    AsyncStorage.getItem("userId").then(setUserId);
  }, []);

  console.log("id", userId);

  const { data, refetch } = useGetByIdQuery();

  // Set initial data from response
  useEffect(() => {
    if (data) {
      setUsername(data.username);
      setPhonenumber(data.phonenumber);
      setFullname(data.fullname);
      setAddress(data.address);
      setGender(data.gender);
      setImageUrl(data.image_url);
      setSelectedDate(
        data.birthday ? new Date(data.birthday).toISOString().split("T")[0] : ""
      );
    }
  }, [data]);

  const handleDatePicked = (date: Date) => {
    setSelectedDate(date.toISOString().split("T")[0]); // Chuyển đổi ngày thành định dạng "YYYY-MM-DD"
    setDatePickerVisible(false);
  };

  // Mutation hook for updating user data
  const [updateUser, { isLoading, isError, error }] = useUpdateMutation();

  // Handle update request
  const handleUpdate = async () => {
    if (!userId) {
      Alert.alert("Lỗi", "User ID không hợp lệ.");
      return;
    }
    const formData = new FormData();

    // Append các trường thông tin khác vào FormData
    formData.append("username", username);
    formData.append("phonenumber", phonenumber);
    const formattedDate = selectedDate
      ? selectedDate
      : new Date().toISOString().split("T")[0];
    formData.append("birthday", formattedDate);
    formData.append(
      "gender",
      gender !== undefined ? (gender ? "true" : "false") : ""
    ); // Gender is passed as "true" or "false"
    formData.append("fullname", fullname);
    formData.append("address", address);

    // Kiểm tra nếu có ảnh, thêm vào FormData
    if (imageUrl) {
      const fileName = imageUrl.split("/").pop() || "image.jpg"; // Lấy tên ảnh từ URI
      const match = /\.(\w+)$/.exec(fileName); // Lấy phần mở rộng file
      const fileType = match ? `image/${match[1]}` : `image/jpeg`; // Xác định kiểu file

      formData.append("image", {
        uri: imageUrl,
        name: fileName,
        type: fileType,
      } as any);
    }

    try {
      // Gọi mutation để cập nhật thông tin người dùng
      const result = await updateUser({
        formData: formData,
        changeBy: userId,
      }).unwrap();
      console.log("Cập nhật thành công:", result);
      Alert.alert("Cập nhật thành công!");
      refetch();
    } catch (error) {
      console.log("Lỗi khi cập nhật:", error);
      Alert.alert("Lỗi khi cập nhật thông tin");
    }
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission required",
        "You need to grant permission to access the gallery."
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      setImageUrl(result.assets[0].uri);
    } else {
      console.log("User canceled image picking");
    }
  };

  const handleGenderChange = (text: string) => {
    if (text === "Nam") {
      setGender(true);
    } else if (text === "Nữ") {
      setGender(false);
    } else {
      setGender(undefined); // Reset if neither "Nam" nor "Nữ"
    }
  };

  return (
    <ScrollView style={{ padding: 10 }}>
      <View style={{ marginTop: 10, marginLeft: 10 }}>
        <View style={{ gap: 10 }}>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <View style={{ position: "relative" }}>
              <Image
                style={{
                  borderWidth: 2,
                  borderColor: "#2563EB",
                  width: 128,
                  height: 128,
                  borderRadius: 64,
                }}
                source={
                  imageUrl
                    ? { uri: imageUrl }
                    : require("../../../../assets/book_cartoon.jpg")
                }
              />
              <TouchableOpacity
                onPress={pickImage}
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  backgroundColor: "#2563EB",
                  borderRadius: 50,
                  width: 36,
                  height: 36,
                  alignItems: "center",
                  justifyContent: "center",
                  borderWidth: 2,
                  borderColor: "white",
                }}
              >
                <Ionicons name="pencil" size={15} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Tên đăng nhập */}
          <View style={{ gap: 5 }}>
            <Text
              style={{ fontWeight: "bold", fontSize: 15, color: "#7d7d7d" }}
            >
              Tên đăng nhập
            </Text>
            <TextInput
              style={{
                backgroundColor: "rgb(236, 236, 236)",
                height: 50,
                justifyContent: "center",
                borderRadius: 15,
                fontWeight: "bold",
                fontSize: 15,
                marginLeft: 10,
              }}
              value={username}
              onChangeText={(text) => setUsername(text)}
            />
          </View>

          {/* Họ và tên */}
          <View style={{ gap: 5 }}>
            <Text
              style={{ fontWeight: "bold", fontSize: 15, color: "#7d7d7d" }}
            >
              Họ và tên
            </Text>
            <TextInput
              style={{
                backgroundColor: "rgb(236, 236, 236)",
                height: 50,
                justifyContent: "center",
                borderRadius: 15,
                fontWeight: "bold",
                fontSize: 15,
                marginLeft: 10,
              }}
              value={fullname}
              onChangeText={(text) => setFullname(text)}
            />
          </View>

          {/* Ngày sinh */}
          <View style={{ gap: 5 }}>
            <Text
              style={{ fontWeight: "bold", fontSize: 15, color: "#7d7d7d" }}
            >
              Ngày sinh
            </Text>
            <TouchableOpacity
              onPress={() => setDatePickerVisible(true)}
              style={{
                backgroundColor: "rgb(236, 236, 236)",
                height: 50,
                justifyContent: "center",
                borderRadius: 15,
                paddingLeft: 10,
              }}
            >
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 15,
                  marginLeft: 10,
                  color: "#000",
                }}
              >
                {selectedDate || "Chưa chọn ngày"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Giới tính */}
          <View style={{ gap: 5 }}>
            <Text
              style={{ fontWeight: "bold", fontSize: 15, color: "#7d7d7d" }}
            >
              Giới tính
            </Text>
            <TextInput
              style={{
                backgroundColor: "rgb(236, 236, 236)",
                height: 50,
                justifyContent: "center",
                borderRadius: 15,
                fontWeight: "bold",
                fontSize: 15,
                marginLeft: 10,
              }}
              value={gender !== undefined ? (gender ? "Nam" : "Nữ") : ""}
              onChangeText={handleGenderChange} // Gọi hàm để xử lý giới tính
            />
          </View>

          {/* Số điện thoại */}
          <View style={{ gap: 5 }}>
            <Text
              style={{ fontWeight: "bold", fontSize: 15, color: "#7d7d7d" }}
            >
              Số điện thoại
            </Text>
            <TextInput
              style={{
                backgroundColor: "rgb(236, 236, 236)",
                height: 50,
                justifyContent: "center",
                borderRadius: 15,
                fontWeight: "bold",
                fontSize: 15,
                marginLeft: 10,
              }}
              value={phonenumber}
              onChangeText={(text) => setPhonenumber(text)}
            />
          </View>

          {/* Địa chỉ */}
          <View style={{ gap: 5 }}>
            <Text
              style={{ fontWeight: "bold", fontSize: 15, color: "#7d7d7d" }}
            >
              Địa chỉ
            </Text>
            <TextInput
              style={{
                backgroundColor: "rgb(236, 236, 236)",
                height: 50,
                justifyContent: "center",
                borderRadius: 15,
                fontWeight: "bold",
                fontSize: 15,
                marginLeft: 10,
              }}
              value={address}
              onChangeText={(text) => setAddress(text)}
            />
          </View>

          {/* Nút Cập nhật */}
          <TouchableOpacity
            onPress={handleUpdate}
            style={{
              backgroundColor: "#2563EB",
              padding: 10,
              borderRadius: 15,
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
              Cập nhật thông tin
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* DatePicker cho "Ngày sinh" */}
      <DatePicker
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleDatePicked}
        onCancel={() => setDatePickerVisible(false)}
      />
    </ScrollView>
  );
}
