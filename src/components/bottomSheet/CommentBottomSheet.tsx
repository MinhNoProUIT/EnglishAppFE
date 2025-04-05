import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
import { FlatList, Keyboard, Platform, Text, TouchableOpacity, View, TouchableWithoutFeedback, TextInput, Alert } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { RBSheetRef } from '../../screens/Post/Posts';
import { PostData } from '../../interfaces/PostInterface';
import { Comment } from '../../interfaces/CommentInterface';
import CommentItem from '../items/CommentItem';
import Feather from '@expo/vector-icons/Feather';

const comments: Comment[] = [
  { id: 1, postId: 1, parentId: null, rootCommentId: null, fullname: "Dương Lâm", avatar: 'https://picsum.photos/100/100', isLike: false, totalLike: 2, content: "Từ vựng này rất hay nha mọi người !!!", createDate: new Date("2025-03-02T00:00:00Z") },
  { id: 2, postId: 1, parentId: 1, rootCommentId: 1, fullname: "Người A", avatar: 'https://picsum.photos/100/100', isLike: false, totalLike: 0, content: "Chuẩn luôn bạn! Từ vựng này rất hay nha mọi người !!! Chuẩn luôn bạn! Từ vựng này rất hay nha mọi người !!!", createDate: new Date("2025-03-10T00:00:00Z") },
  { id: 5, postId: 1, parentId: 1, rootCommentId: 1, fullname: "Người D", avatar: 'https://picsum.photos/100/100', isLike: false, totalLike: 0, content: "Chuẩn luôn bạn!", createDate: new Date("2025-03-10T00:00:00Z") },
  { id: 3, postId: 1, parentId: null, rootCommentId: null, fullname: "Người B", avatar: 'https://picsum.photos/100/100', isLike: false, totalLike: 0, content: "Mọi người thấy bài viết này hữu ích không?", createDate: new Date("2025-03-17T00:00:00Z") },
  { id: 4, postId: 1, parentId: 3, rootCommentId: 3, fullname: "Người C", avatar: 'https://picsum.photos/100/100', isLike: false, totalLike: 0, content: "Mình thấy rất hay.", createDate: new Date("2025-03-17T00:00:00Z") }
];

export default forwardRef(function ShareBottomSheet({ post }: { post: PostData }, ref) {
    const bottomSheetRefComment = useRef<RBSheetRef | null>(null);
    const flatListRef = useRef<FlatList>(null);
    const [commentData, setCommentData] = useState<Comment[]>(comments);
    const [replyingTo, setReplyingTo] = useState<Comment | null>(null);
    const [editingComment, setEditingComment] = useState<Comment | null>(null);
    const [replyContent, setReplyContent] = useState('');
    const [keyboardHeight, setKeyboardHeight] = useState(0);
    const [sheetHeight, setSheetHeight] = useState(300);
    const [showMoreComment, setShowMoreComment] = useState<{ [key: number]: boolean }>({});
    const [hasTagPrefix, setHasTagPrefix] = useState(true);

    const parentsComments = commentData.filter(comment => comment.postId === post.id && comment.parentId === null);

    const initialHeight = 500;
    const expandedHeight = 700;

    const textInputRef = useRef<TextInput>(null);

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
            (e) => {
                setKeyboardHeight(e.endCoordinates.height);
                setSheetHeight(expandedHeight);
                
                setTimeout(() => {
                    if (flatListRef.current) {
                        flatListRef.current.scrollToEnd({ animated: true });
                    }
                }, 100);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
            () => {
                setKeyboardHeight(0);
                setSheetHeight(initialHeight);
            }
        );

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    useImperativeHandle(ref, () => ({
        open: () => bottomSheetRefComment.current?.open(),
        close: () => bottomSheetRefComment.current?.close(),
    }));

    const handleLikeComment = (item: Comment) => {
        setCommentData(prevComment => {
            const index = prevComment.findIndex(c => c.id === item.id);
            if (index === -1) return prevComment;

            const updatedComment = {
                ...prevComment[index],
                isLike: !prevComment[index].isLike,
                totalLike: prevComment[index].isLike ? prevComment[index].totalLike - 1 : prevComment[index].totalLike + 1
            };

            return [...prevComment.slice(0, index), updatedComment, ...prevComment.slice(index + 1)];
        });
    };

    const handleReply = (item: Comment) => {
        setReplyingTo(item);
        setReplyContent('');
        console.log(item);
        setTimeout(() => {
            if (textInputRef.current) {
                textInputRef.current.focus();
                setHasTagPrefix(true);
            }

            if (flatListRef.current) {
                const index = parentsComments.findIndex(c => c.id === item.id);
                if (index !== -1) {
                    try {
                        flatListRef.current.scrollToIndex({
                            index,
                            animated: true,
                            viewPosition: 0.5,
                        });
                    } catch (error) {
                        console.warn("scrollToIndex error:", error);
                    }
                }
            }
        }, 100);
    };

    const handleSendReply = () => {
        if (!replyContent.trim()) return;

        if (editingComment) {
            // update comment
            setCommentData(prev => {
                const index = prev.findIndex(c => c.id === editingComment.id);
                if (index === -1) return prev;

                const updated = [...prev];
                updated[index] = { ...updated[index], content: replyContent };
                updated[index] = { ...updated[index], parentId: hasTagPrefix ? replyingTo?.id ?? null : null, };
                return updated;
            });

            setEditingComment(null);
            setReplyContent('');
            setHasTagPrefix(false);
            Keyboard.dismiss();
            return;
        }

        const newId = Math.max(...commentData.map(c => c.id), 0) + 1;
        const newReply: Comment = {
            id: newId, 
            postId: post?.id ?? 0,
            parentId: hasTagPrefix ? replyingTo?.id ?? null : null,
            rootCommentId: replyingTo?.rootCommentId ?? replyingTo?.id ?? null,
            fullname: "Bạn",
            avatar: 'https://picsum.photos/100/100', 
            isLike: false,
            totalLike: 0,
            content: replyContent,
            createDate: new Date(),
        };

        setCommentData([...commentData, newReply]);
        setReplyingTo(null);
        setReplyContent('');
        setHasTagPrefix(false);
        Keyboard.dismiss();
        
        setTimeout(() => {
            if (flatListRef.current) {
                flatListRef.current.scrollToEnd({ animated: true });
            }
        }, 100);
    };

    const handleChangeReply = (text: string) => {
        if (replyingTo) {
            const tagPrefix = `@${replyingTo.fullname} `;
            if (text.startsWith(tagPrefix)) {
                const actualReply = text.slice(tagPrefix.length);
                setReplyContent(actualReply);
                setHasTagPrefix(true);
            } else {
                setReplyContent(text);
                setHasTagPrefix(false);
            }
        } else {
            setReplyContent(text);
        }
    };

    // bấm 2 lần mới biến mất replyContent -->
    const handleDismissReply = () => {
        setReplyingTo(null);
        setReplyContent('');
    
        if (textInputRef.current) {
            textInputRef.current.blur(); 
        }
        Keyboard.dismiss();
    };

    const handleLongPressComment = (comment: Comment) => {
        if (comment.fullname !== "Bạn") return; // chỉ cho phép thao tác với comment của chính mình

        Alert.alert(
            "Tùy chọn bình luận",
            "Bạn muốn thực hiện hành động nào?",
            [
                {
                    text: "Chỉnh sửa",
                    onPress: () => {
                        const parent = comment.parentId 
                            ? commentData.find(c => c.id === comment.parentId)
                            : null;
                        setEditingComment(comment);
                        if (parent) {
                            setReplyingTo(parent); 
                            setReplyContent(comment.content);
                            setHasTagPrefix(true);
                        } else {
                            setReplyingTo(null);
                            setReplyContent(comment.content);
                        }
                        setTimeout(() => {
                            textInputRef.current?.focus();
                        }, 100);
                    }
                },
                {
                    text: "Xóa",
                    style: "destructive",
                    onPress: () => {
                        Alert.alert(
                            "Xác nhận xóa",
                            "Bạn có chắc muốn xóa bình luận này không?",
                            [
                                {
                                    text: "Hủy",
                                    style: "cancel"
                                },
                                {
                                    text: "Xóa",
                                    style: "destructive",
                                    onPress: () => {
                                        setCommentData(prev => prev.filter(c => c.id !== comment.id && c.rootCommentId !== comment.id));
                                        if (editingComment?.id === comment.id) {
                                            setEditingComment(null);
                                            setReplyContent('');
                                        }
                                    }
                                }
                            ]
                        );
                    }
                },
                {
                    text: "Đóng",
                    style: "cancel"
                }
            ]
        );
    };

    
    const toggleShowReplies = (commentId: number) => {
        setShowMoreComment(prev => ({
            ...prev,
            [commentId]: !prev[commentId] 
        }));
    };

    const renderComments = (comment: Comment) => {
        const childrenComments = commentData.filter(c => c.rootCommentId === comment.id);  
        return (
            <View>
                {/* display comment parents */}
                <CommentItem 
                    comment={comment} 
                    comments={parentsComments}
                    onReply={handleReply} 
                    onLike={handleLikeComment} 
                    onCloseBottomSheet={() => bottomSheetRefComment.current?.close()}
                    onDismissReply={handleDismissReply}
                    onLongPress={handleLongPressComment}
                />
                {/* display comment child */}
                {childrenComments.length > 0 && (
                    <View className="ml-20 pb-4"  style={{ alignSelf: "flex-start" }}>
                        <TouchableOpacity onPress={() => toggleShowReplies(comment.id)}>
                        <Text className="text-gray-600"> 
                            {showMoreComment[comment.id] 
                            ? "Ẩn câu trả lời" 
                            : `Xem thêm ${childrenComments.length} câu trả lời`}
                        </Text>
                        </TouchableOpacity>
                    </View>
                )}

                {/* show more */}
                {showMoreComment[comment.id] && (
                    <View className="ml-10 border-l border-gray-200">
                        {childrenComments.map(child => (
                            <View key={child.id} className="pl-4">
                                <CommentItem 
                                    comment={child} 
                                    comments={commentData}
                                    onReply={handleReply} 
                                    onLike={handleLikeComment}
                                    onCloseBottomSheet={() => bottomSheetRefComment.current?.close()}
                                    onDismissReply={handleDismissReply}
                                    onLongPress={handleLongPressComment}
                                />
                            </View>
                        ))}
                    </View>
                )}
            </View>
        );
    };

    const getItemLayout = (_ : any, index : any) => ({
        length: 100, 
        offset: 100 * index,
        index,
    });

    return (
        <RBSheet
            ref={bottomSheetRefComment}
            height={keyboardHeight > 0 ? expandedHeight : initialHeight}
            openDuration={100}
            onClose={() => {
                setReplyingTo(null);
                setReplyContent('')
            }}
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
                enabled: Platform.OS === 'ios',
                behavior: 'padding'
            }}
        >
            <View className="flex-1 py-4">
                <Text className="text-center font-semibold text-xl items-center pb-4 border-b border-gray-100">
                    Bình luận
                </Text>
                
                {/* Đây là phần chính - một TouchableWithoutFeedback duy nhất bao quanh phần body */}
                <TouchableWithoutFeedback onPress={handleDismissReply}>
                    <View className="flex-1">
                        {parentsComments.length > 0 ? (
                            <FlatList
                                ref={flatListRef}
                                data={parentsComments}
                                keyExtractor={(item) => item.id.toString()}
                                renderItem={({item}) => renderComments(item)}
                                ListEmptyComponent={
                                    <Text className="text-center text-gray-500">Chưa có bình luận nào.</Text>
                                }
                                removeClippedSubviews={false}
                                getItemLayout={getItemLayout}
                                contentContainerStyle={{ paddingBottom: replyingTo ? 60 : 0 }}
                            />
                        ) : (
                            <Text className="text-center text-gray-500">Chưa có bình luận nào.</Text>
                        )}
                    </View>
                </TouchableWithoutFeedback>
                
                {/* Tách phần input ra khỏi TouchableWithoutFeedback */}
                <View className="flex-row items-center px-4 py-2 border-t border-gray-200 bg-white">
                    <View className="flex-row items-center mt-2 w-full">
                        <TextInput
                            className="flex-1 rounded-lg"
                            placeholder={replyingTo && hasTagPrefix ? `@${replyingTo.fullname} ` : "Nhập câu trả lời..."}
                            value={
                                replyingTo && hasTagPrefix 
                                    ? `@${replyingTo.fullname} ${replyContent}` 
                                    : replyContent
                            }
                            onChangeText={handleChangeReply}
                            ref={textInputRef}
                            autoFocus={!!replyingTo} 
                            multiline
                            scrollEnabled
                            style={{
                                flex: 1, 
                                minHeight: 40, 
                                maxHeight: 120, 
                                paddingVertical: 8, 
                                paddingHorizontal: 12, 
                                width: "100%",
                                borderRadius: 10, 
                                borderColor: "#ddd", 
                                borderWidth: 1, 
                                fontSize: 14,
                                color: "#333", 
                            }}
                        />
                        <TouchableOpacity
                            onPress={handleSendReply}
                            className="ml-2 bg-blue-500 rounded-full w-10 h-10 items-center justify-center"
                            disabled={!replyContent.trim()}
                        >
                            <Feather name="send" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </RBSheet>
    );
});