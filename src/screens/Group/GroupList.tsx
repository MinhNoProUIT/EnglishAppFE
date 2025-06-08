import { View, FlatList, Text } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../navigations/AppNavigator";
import GroupListHeader from "../../components/headers/GroupListHeader";
import GroupItem from "../../components/items/GroupItem";
import { useCallback, useEffect, useState } from "react";
import { useGetAllGroupByUserQuery } from "../../services/groupMemberService";
import { ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function GroupList() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    AsyncStorage.getItem("userId").then(setUserId);
  }, []);

  const {
    data: groups,
    isLoading,
    error,
    refetch,
  } = useGetAllGroupByUserQuery(userId!);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  if (isLoading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#FE9519" />
        <Text className="mt-2 text-gray-600">Loading groups...</Text>
      </View>
    );
  }

  if (error) {
    return <Text className="flex-1 justify-center items-center mt-20">Error: {JSON.stringify(error)}</Text>;
  }

  return (
    <View className="flex-1 bg-white p-4">
      <GroupListHeader refetch={refetch} />
      <FlatList
        data={groups}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <GroupItem
            id={item.id}
            group_name={item.group_name}
            group_image_url={item.group_image_url}
            last_username={item.last_username}
            last_message={item.last_message}
            last_time_message={item.last_time_message}
            onPress={() =>
              navigation.navigate("Chat", {
                groupId: item.id,
              })
            }
          />
        )}
        ListEmptyComponent={
          <View className="items-center justify-center mt-20">
            <Text className="text-gray-500 text-center">
              You don't have any groups yet. Create one to get started!
            </Text>
          </View>
        }
      />
    </View>
  );
}
