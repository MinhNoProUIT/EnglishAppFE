import React, { useEffect, useState } from "react";
import { View, Text, ScrollView } from "react-native";
import { useGetByIdQuery } from "../../../services/userService";

interface AccountInfo {
  username: string;
  fullname: string;
  email: string;
  birthday: string;
  gender: string;
  phone: string;
  address: string;
  accountCreatedDate: string;
}

const accountData: AccountInfo[] = [
  {
    username: "minhtranfcb1408",
    fullname: "Trần Văn Minh",
    email: "minh8dclv123@gmail.com",
    birthday: "14/12/2004",
    gender: "Nam",
    phone: "0123456789",
    address: "Ký túc xá Khu B, Đông Hòa, Dĩ An, Bình Dương",
    accountCreatedDate: "20/3/2025",
  },
];
const AccountInfomation = () => {
  const [selectedDate, setSelectedDate] = useState(""); // Lưu trữ ngày sinh đã chọn
  const [username, setUsername] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [gender, setGender] = useState<boolean | undefined>(undefined);
  const [fullname, setFullname] = useState("");
  const [address, setAddress] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { data } = useGetByIdQuery();
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
  return (
    <ScrollView style={{ padding: 10 }}>
      <View style={{ marginTop: 10, marginLeft: 10 }}>
        <View style={{ gap: 10 }}>
          <View style={{ gap: 5 }}>
            <Text
              style={{ fontWeight: "bold", fontSize: 15, color: "#7d7d7d" }}
            >
              Tên đăng nhập
            </Text>
            <View
              style={{
                backgroundColor: "rgb(236, 236, 236)",
                height: 50,
                justifyContent: "center",
                borderRadius: 15,
              }}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 15, marginLeft: 10 }}
              >
                {data?.username}
              </Text>
            </View>
          </View>
          <View style={{ gap: 5 }}>
            <Text
              style={{ fontWeight: "bold", fontSize: 15, color: "#7d7d7d" }}
            >
              Họ và tên
            </Text>
            <View
              style={{
                backgroundColor: "rgb(236, 236, 236)",
                height: 50,
                justifyContent: "center",
                borderRadius: 15,
              }}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 15, marginLeft: 10 }}
              >
                {data?.fullname}
              </Text>
            </View>
          </View>
          <View style={{ gap: 5 }}>
            <Text
              style={{ fontWeight: "bold", fontSize: 15, color: "#7d7d7d" }}
            >
              Email
            </Text>
            <View
              style={{
                backgroundColor: "rgb(236, 236, 236)",
                height: 50,
                justifyContent: "center",
                borderRadius: 15,
              }}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 15, marginLeft: 10 }}
              >
                {data?.email}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              gap: 10,
            }}
          >
            <View style={{ gap: 5, flex: 1 }}>
              <Text
                style={{ fontWeight: "bold", fontSize: 15, color: "#7d7d7d" }}
              >
                Ngày sinh
              </Text>
              <View
                style={{
                  backgroundColor: "rgb(236, 236, 236)",
                  height: 50,
                  justifyContent: "center",
                  borderRadius: 15,
                }}
              >
                <Text
                  style={{ fontWeight: "bold", fontSize: 15, marginLeft: 10 }}
                >
                  {data?.birthday}
                </Text>
              </View>
            </View>
            <View style={{ gap: 5, flex: 1 }}>
              <Text
                style={{ fontWeight: "bold", fontSize: 15, color: "#7d7d7d" }}
              >
                Giới tính
              </Text>
              <View
                style={{
                  backgroundColor: "rgb(236, 236, 236)",
                  height: 50,
                  justifyContent: "center",
                  borderRadius: 15,
                }}
              >
                <Text
                  style={{ fontWeight: "bold", fontSize: 15, marginLeft: 10 }}
                >
                  {data?.gender !== undefined ? (gender ? "Nam" : "Nữ") : ""}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ gap: 5 }}>
            <Text
              style={{ fontWeight: "bold", fontSize: 15, color: "#7d7d7d" }}
            >
              Số điện thoại
            </Text>
            <View
              style={{
                backgroundColor: "rgb(236, 236, 236)",
                height: 50,
                justifyContent: "center",
                borderRadius: 15,
              }}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 15, marginLeft: 10 }}
              >
                {data?.phonenumber}
              </Text>
            </View>
          </View>
          <View style={{ gap: 5 }}>
            <Text
              style={{ fontWeight: "bold", fontSize: 15, color: "#7d7d7d" }}
            >
              Địa chỉ
            </Text>
            <View
              style={{
                backgroundColor: "rgb(236, 236, 236)",
                height: 50,
                justifyContent: "center",
                borderRadius: 15,
              }}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 15, marginLeft: 10 }}
              >
                {data?.address}
              </Text>
            </View>
          </View>
          <View style={{ gap: 5 }}>
            <Text
              style={{ fontWeight: "bold", fontSize: 15, color: "#7d7d7d" }}
            >
              Ngày tạo tài khoản
            </Text>
            <View
              style={{
                backgroundColor: "rgb(236, 236, 236)",
                height: 50,
                justifyContent: "center",
                borderRadius: 15,
              }}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 15, marginLeft: 10 }}
              >
                {" "}
                {data?.created_date.toString()}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
export default AccountInfomation;
