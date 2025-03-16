import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Book from '@expo/vector-icons/SimpleLineIcons';
import Star from '@expo/vector-icons/AntDesign';
import { ProgressBar } from 'react-native-paper';

const courses = [
  { id: '1', title: 'Travel', lesson: 3, advanced: 10, total: 15, current: 5, image: 'https://picsum.photos/200/300' },
  { id: '2', title: 'Practice', lesson: 3, advanced: 10, total: 10, current: 8, image: "https://picsum.photos/200/150" },
  { id: '3', title: 'Business', lesson: 3, advanced: 10, total: 10, current: 7, image: "https://picsum.photos/200/120" },
  { id: '4', title: 'Academic', lesson: 3, advanced: 10, total: 10, current: 1, image: 'https://picsum.photos/200/130' },
  { id: '5', title: 'School', lesson: 3, advanced: 10, total: 10, current: 3, image: 'https://picsum.photos/200/210' }
];

export default function CarouselRecentLearning() {
  return (
    <View>
        {/* text courses and see all*/}
      <View className="flex flex-row items-center justify-between py-4">
        <Text className="text-base font-bold">Recent learning</Text>
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
          <View className="w-52 bg-white rounded-md border border-gray-300 mr-4 ">
            <Image
              source={{ uri: item.image }}
              className="w-full h-28 rounded-t-md"
            />
            <View className="py-3 px-2 bg-white">
              <Text className="text-base font-medium">{item.title}</Text>
              <View className="flex flex-row items-center justify-between mt-2">
                <View className="flex flex-row items-center gap-1">
                  <Book name="book-open" size={14} color="black" />
                  <Text className="text-xs font-medium">Lesson: {item.lesson}</Text>
                </View>
                <View className="flex flex-row items-center gap-1">
                  <Star name="star" size={14} color="black" />
                  <Text className="text-xs font-medium">Advanced: {item.advanced}</Text>
                </View>
              </View>
             <View className="mt-2 w-full flex flex-row items-center gap-2">
              <ProgressBar
                progress={item.current / item.total}
                color="#FF991F"
                style={{ height: 6, width: 125, borderRadius: 10 }}
              />
              <Text className="text-xs text-center mt-1 pl-3 pb-1">{item.current}/{item.total}</Text>
            </View>
            </View>
          </View>
        )}
      />
    </View>
  );
}
