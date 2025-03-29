import React, { forwardRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { RBSheetRef } from '../../screens/Post/Posts';
import { Avatar } from 'react-native-paper';
import translateDate from '../../utils/translateDate';
import { PostData } from '../../interfaces/PostInterface';
import Heart from '@expo/vector-icons/Entypo';
import { Comment } from '../../interfaces/CommentInterface';

const comments = [
  {
    id: 1,
    postId: 1,
    fullname: "Dương Lâm",
    avatar: 'https://picsum.photos/100/100',
    isLike: false,
    totalLike: 2,
    content: "Từ vựng này rất hay nha mọi người !!!",
    createDate: new Date("2025-03-02T00:00:00Z")
  },
  {
    id: 2,
    postId: 1,
    fullname: "hehee",
    avatar: 'https://picsum.photos/100/100',
    isLike: false,
    totalLike: 0,
    content: "Cần học nhé",
    createDate: new Date("2025-03-10T00:00:00Z")
  },
  {
    id: 3,
    postId: 1,
    fullname: "hehee",
    avatar: 'https://picsum.photos/100/100',
    isLike: false,
    totalLike: 0,
    content: "Cần học nhé",
    createDate: new Date("2025-03-17T00:00:00Z")
  },
  {
    id: 4,
    postId: 1,
    fullname: "hehee",
    avatar: 'https://picsum.photos/100/100',
    isLike: false,
    totalLike: 0,
    content: "Cần học nhé",
    createDate: new Date("2025-03-17T00:00:00Z")
  },
  {
    id: 5,
    postId: 1,
    fullname: "hehee",
    avatar: 'https://picsum.photos/100/100',
    isLike: false,
    totalLike: 0,
    content: "Cần học nhé",
    createDate: new Date("2025-03-17T00:00:00Z")
  },
  {
    id: 6,
    postId: 1,
    fullname: "hehee",
    avatar: 'https://picsum.photos/100/100',
    isLike: false,
    totalLike: 0,
    content: "Cần học nhé",
    createDate: new Date("2025-03-17T00:00:00Z")
  },
];

export default forwardRef(function ShareBottomSheet({ post }: { post: PostData }, ref) {
    const bottomSheetRefComment = useRef<RBSheetRef | null>(null); 
    const [commentData, setCommentData] = useState<Comment[]>(comments);

    const filteredComments = post
        ? commentData.filter((comment) => comment.postId === post.id)
        : [];
    
    useImperativeHandle(ref, () => ({
        open: () => bottomSheetRefComment.current?.open(),
        close: () => bottomSheetRefComment.current?.close(),
    }));

    const handleLikeComment = (item: Comment) => {
        setCommentData((prevComment) =>
            prevComment.map((comment) => {
                if (comment.id === item.id && post?.id === comment.postId) {
                    const newTotalLike = comment.isLike
                        ? comment.totalLike - 1
                        : comment.totalLike + 1;
                    const newStateLike = !comment.isLike;
                    return { ...comment, totalLike: newTotalLike, isLike: newStateLike };
                }
                return comment;
            })
        );
    };

    const renderCommentItem = useCallback(
        ({ item }: { item: Comment }) => (
            <View className="flex-row px-4 py-7">
                <Avatar.Image size={40} source={{ uri: item.avatar }} />
                <View className="ml-3 flex-1">
                    <View className="flex-row gap-1">
                        <Text className="font-bold">{item.fullname}</Text>
                        <Text className="text-gray-300">{translateDate(item.createDate)}</Text>
                    </View>
                    <Text className="text-base">{item.content}</Text>
                </View>
                <View className="items-center justify-center flex-col">
                    <TouchableOpacity
                        className="flex-col items-center gap-1"
                        onPress={() => handleLikeComment(item)}
                    >
                        <Heart
                            name={item.isLike ? "heart" : "heart-outlined"}
                            size={20}
                            color={item.isLike ? "red" : "gray"}
                            className="pr-1"
                        />
                        <Text className="font-medium text-gray-500">
                            {item.totalLike === 0 ? "" : item.totalLike}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        ),
        [post] // Thêm `post` vào dependency để đảm bảo dữ liệu cập nhật khi thay đổi.
    );

    return (
        <RBSheet
            ref={bottomSheetRefComment}
            height={500}
            openDuration={100}
            closeOnPressBack={true}
            closeOnPressMask={true}
            customStyles={{
                wrapper: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    opacity: 1,
                },
                draggableIcon: {
                    backgroundColor: "#000",
                },
                container: {
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                },
            }}
            customModalProps={{
                animationType: "slide",
                statusBarTranslucent: true,
            }}
            customAvoidingViewProps={{
                enabled: false,
            }}
        >
            <View className="py-4">
                <Text className="text-center font-semibold text-xl items-center pb-4 border-b border-gray-100">
                    Bình luận
                </Text>
                {filteredComments.length > 0 ? (
                    <FlatList
                        data={filteredComments}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderCommentItem}
                        ListEmptyComponent={
                            <Text className="text-center text-gray-500">Chưa có bình luận nào.</Text>
                        }
                        removeClippedSubviews={true}
                    />
                ) : (
                    <Text className="text-center text-gray-500">Chưa có bình luận nào.</Text>
                )}
            </View>
        </RBSheet>
    );
});
