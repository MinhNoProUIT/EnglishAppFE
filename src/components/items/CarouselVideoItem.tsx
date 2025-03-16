import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const courses = [
  { id: '1', username: 'Van Minh', image: 'https://picsum.photos/200/300' },
  { id: '2', username: 'Duong Lam', image: "https://picsum.photos/200/150" },
  { id: '3', username: 'Van Phong', image: "https://picsum.photos/200/120" },
  { id: '4', username: 'Phuong Huyen', image: "https://picsum.photos/200/120" },
];

export default function CarouselVideoItem() {
  return (
    <View>
        {/* text courses and see all*/}
      <View className="py-4">
        <Text className="text-base font-bold">Users experience video</Text>
      </View>

        {/* list video user */}
      <FlatList
        data={courses}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="w-72 bg-white rounded-xl shadow-lg mr-4 items-center justify-center">
            <Image
              source={{ uri: item.image }}
              className="w-full h-36 rounded-t-xl"
            />
            <View className="py-3 flex flex-row items-center justify-center gap-14">
              <Text className="text-sm font-extrabold">{item.username}</Text>
              <TouchableOpacity className="bg-[#2563EB] items-center py-4 rounded-lg w-28">
                <Text className="text-white text-sm font-bold">Let's go</Text>   
                </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}
