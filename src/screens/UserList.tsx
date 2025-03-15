import React from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { useGetAllUsersQuery } from "../services/userService";

interface User {
  id: string;
  username: string;
  email: string;
}

const UsersList = () => {
  const { data, error, isLoading } = useGetAllUsersQuery();

  console.log("🔹 API Response:", data); // Debug API response

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" color="blue" />
        <Text>Đang tải dữ liệu...</Text>
      </View>
    );
  }

  if (error) {
    console.error("Lỗi API", error);
    return <Text>Lỗi khi tải dữ liệu</Text>;
  }

  if (!data || data.length === 0) {
    return <Text>Không có dữ liệu người dùng!</Text>;
  }

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(user) => user.id}
        renderItem={({ item }: { item: User }) => (
          <Text>{`${item.username} - ${item.email}`}</Text>
        )}
      />
    </View>
  );
};

export default UsersList;
