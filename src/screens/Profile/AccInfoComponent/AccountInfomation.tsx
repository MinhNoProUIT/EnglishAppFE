import React from "react";
import { View, Text, ScrollView } from "react-native";

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
  return (
    <ScrollView style={{ padding: 10 }}>
      <View style={{ marginTop: 10, marginLeft: 10 }}>
        {accountData.map((item, index) => (
          <View key={index} style={{ gap: 10 }}>
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
                  {item.username}
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
                  {item.fullname}
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
                  {item.email}
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
                    {item.birthday}
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
                    {item.gender}
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
                  {item.phone}
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
                  {item.address}
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
                  {item.accountCreatedDate}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
export default AccountInfomation;
