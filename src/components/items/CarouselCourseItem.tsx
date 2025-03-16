import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const courses = [
  { id: '1', title: 'Travel', image: 'https://picsum.photos/200/300' },
  { id: '2', title: 'Practice', image: "https://picsum.photos/200/150" },
  { id: '3', title: 'Business', image: "https://picsum.photos/200/120" },
  { id: '4', title: 'Academic', image: 'https://picsum.photos/200/130' },
  { id: '5', title: 'School', image: 'https://picsum.photos/200/210' }
];

export default function CarouselCourseItem() {
  return (
    <View>
        {/* text courses and see all*/}
      <View className="flex flex-row items-center justify-between py-4">
        <Text className="text-base font-bold">Courses</Text>
        <TouchableOpacity className='flex flex-row items-center gap-2'>
            <Text className="text-lg font-bold">See all</Text>
            <AntDesign name="arrowright" size={20} color="black" />
        </TouchableOpacity>
      </View>

        {/* list item courses */}
      <FlatList
        data={courses}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="w-24 bg-white rounded-2xl mr-4 items-center justify-center">
            <Image
              source={{ uri: item.image }}
              className="w-full h-24 rounded-xl"
            />
            <View className="py-3">
              <Text className="text-xs font-medium">{item.title}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}
