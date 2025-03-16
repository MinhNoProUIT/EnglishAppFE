import React from 'react';
import { Text, View, FlatList, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { PieChart } from 'react-native-gifted-charts';
import CarouselCourseItem from '../components/items/CarouselCourseItem';
import CarouselVideoItem from '../components/items/CarouselVideoItem'
import CarouselRecentLearning from '../components/items/CarouselRecentLearning';

const lessons = [
    { id: '1', title: 'Bài học 1' },
    { id: '2', title: 'Bài học 2' },
    { id: '3', title: 'Bài học 3' },
];

const recommendations = [
    { id: '1', title: 'Đề xuất 1' },
    { id: '2', title: 'Đề xuất 2' },
    { id: '3', title: 'Đề xuất 3' },
];

const data = [
    { value: 30, color: '#2563EB' }, 
    { value: 70, color: '#E3EDFF' }  
];

const HomeScreen = () => {
    const Header = () => (
        <View className='px-6 pt-10'>
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
                    <Text className="text-lg font-bold mb-6">How many hours you studied this week</Text>
                    <TouchableOpacity className="bg-[#2563EB] px-4 py-4 rounded-lg w-28">
                        <Text className="text-white text-sm font-semibold">Let's start</Text>   
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
            <CarouselCourseItem/>

            {/* list video user */}
            <CarouselVideoItem/>

            {/* list courses recent learning */}
            <CarouselRecentLearning/>
        </View>
    );

    return (
        <FlatList
            ListHeaderComponent={Header}
            data={recommendations}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <Text className="bg-white p-3 my-1 rounded-md shadow-md">{item.title}</Text>
            )}
        />
    );
};

export default HomeScreen;
