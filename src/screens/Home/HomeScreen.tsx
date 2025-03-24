import React from "react";
import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PieChart } from "react-native-gifted-charts";
import CarouselCourseItem from "../../components/items/CarouselCourseItem";
import CarouselVideoItem from "../../components/items/CarouselVideoItem";
import CarouselRecentLearning from "../../components/items/CarouselRecentLearning";
import { ScrollView } from "react-native";
import ChangeCircle from "@expo/vector-icons/MaterialIcons";
import Check from "@expo/vector-icons/FontAwesome";

const data = [
  { value: 30, color: "#2563EB" },
  { value: 70, color: "#E3EDFF" },
];

const HomeScreen = () => {
  return (
    <ScrollView className="px-6 pt-20 bg-white">
      {/* header */}
      <View className="flex-row items-center justify-between mb-1">
        <Text className="text-2xl font-bold">Hi, Maya</Text>
        <TouchableOpacity className="bg-[#2563EB] rounded-lg h-9 w-9 items-center justify-center">
          <Ionicons name="chatbubble-ellipses" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <Text className="text-lg font-bold mb-6">Let's start learning!</Text>

      {/* banner */}
      <View className="w-full h-48 rounded-xl bg-white p-4 flex-row items-center justify-between mb-4 shadow-lg shadow-black/20">
        <View className="w-[180px]">
          <Text className="text-lg font-bold mb-6">
            How many hours you studied this week
          </Text>
          <TouchableOpacity className="bg-[#2563EB] px-4 py-4 rounded-lg w-28">
            <Text className="text-white text-sm font-semibold">
              Let's start
            </Text>
          </TouchableOpacity>
        </View>

        <View className="w-28 h-28 items-center justify-center flex-2">
          <PieChart
            data={data}
            radius={45}
            showText
            donut
            innerRadius={35}
            textColor="black"
            textSize={12}
          />
          <View className="absolute inset-0 items-center justify-center">
            <Text className="text-sm font-semibold">2h 15m</Text>
          </View>
        </View>
      </View>

      {/* promo */}
      <View className="flex-row items-center bg-[#FE9519] h-10 p-3 mb-6 ">
        <View className="flex-1">
          <Text className="text-white font-semibold text-xs">
            Get 50% off Premium & unlock new language!
          </Text>
        </View>

        <View className="h-10 w-0.5 border-r-2 border-dashed border-[#FE9519] bg-white mx-2" />

        <TouchableOpacity>
          <Text className="text-white font-semibold text-xs">View</Text>
        </TouchableOpacity>
      </View>

      {/* list courses */}
      <CarouselCourseItem />

      {/* list video user */}
      <CarouselVideoItem />

      {/* list courses recent learning */}
      <CarouselRecentLearning />

      {/* suggest for you */}
      <View className="flex flex-row items-center justify-between py-4">
        <Text className="text-base font-bold">Suggested for you</Text>
        <TouchableOpacity className="flex flex-row items-center gap-2">
          <ChangeCircle name="change-circle" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <View className="relative w-full h-48 rounded-lg overflow-hidden shadow-lg mb-32">
        <ImageBackground
          source={{ uri: "https://picsum.photos/400/300" }}
          className="w-full h-full "
          resizeMode="cover"
        >
          <View className="absolute top-0 right-0 bg-white/80 px-4 py-4 rounded-tl-3xl w-[45%] h-full">
            <Text className="text-sm font-medium mb-1">
              How to Conversation in the office with your colleagues
            </Text>
            <Text className="text-[#7D8388] text-xs font-medium">
              At Work Vocabulary
            </Text>
          </View>
          <View className="absolute top-0 left-8 bg-blue-500 w-8 h-10 rounded-b-full p-1 items-center justify-center">
            <Check name="check" size={20} color="white" />
          </View>
        </ImageBackground>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
