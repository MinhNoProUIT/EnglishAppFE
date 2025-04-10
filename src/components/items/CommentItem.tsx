import { Text, TouchableOpacity, TouchableWithoutFeedback, View, Keyboard, Pressable } from "react-native";
import { Avatar } from "react-native-paper";
import Heart from '@expo/vector-icons/Entypo';
import translateDate from '../../utils/translateDate';
import { Comment } from "../../interfaces/CommentInterface";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../../navigations/AppNavigator";

type CommentItemProps = {
    comment: Comment;
    comments: Comment[];
    onReply: (comment: Comment) => void;
    onLike: (comment: Comment) => void;
    onCloseBottomSheet: () => void;
    onDismissReply: () => void; 
    onLongPress: (comment: Comment) => void;
};

type SettingsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "MyPost"
>;

export default function CommentItem({ comment, comments, onReply, onLike, onCloseBottomSheet, onDismissReply, onLongPress } : CommentItemProps) {
    const parentComment = comments.find(c => c.id === comment.parentId);
    const navigation = useNavigation<SettingsScreenNavigationProp>();

    const navigateToMyPost = () => {
        navigation.navigate("MyPost");
    };

    return (
       <TouchableWithoutFeedback 
            onPress={() => { 
                Keyboard.dismiss();
                onDismissReply();
            }} 
            onLongPress={() => onLongPress(comment)}
       >
         <View className="flex-row px-4 py-4">
            <Avatar.Image size={35} source={{ uri: comment.avatar }} />
            <View className="ml-3 flex-1">
                <View className="flex-row gap-1">
                    <TouchableOpacity onPress={() => { 
                        onCloseBottomSheet(); 
                        navigateToMyPost()}
                    }>
                        <Text className="font-bold">{comment.fullname}</Text>
                    </TouchableOpacity>
                    <Text className="text-gray-400">{translateDate(comment.createDate)}</Text>
                </View>

                {parentComment && (
                    <Text>
                        <Text 
                            onPress={() => {
                                onCloseBottomSheet(); 
                                navigateToMyPost();  
                            }}  
                            className="text-blue-500"
                        >
                            @{parentComment.fullname}
                        </Text> 
                        <Text className="text-base text-black"> {comment.content}</Text>
                    </Text>
                )}


                {comment.parentId === null && (
                    <Text className="text-base">{comment.content}</Text>
                )}
               
                <TouchableOpacity onPress={() => onReply(comment)}>
                    <Text className="text-base text-gray-500 mt-1">Trả lời</Text>
                </TouchableOpacity>
            </View>
            <View className="items-center justify-center">
                <TouchableOpacity
                    className="items-center gap-1"
                    onPress={() => onLike(comment)}
                >
                    <Heart
                        name={comment.isLike ? "heart" : "heart-outlined"}
                        size={20}
                        color={comment.isLike ? "red" : "gray"}
                    />
                    <Text className="font-medium text-gray-500">
                        {comment.totalLike > 0 ? comment.totalLike : ""}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
       </TouchableWithoutFeedback>
    );
}
