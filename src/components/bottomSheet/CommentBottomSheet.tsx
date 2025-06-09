import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import {
  FlatList,
  Keyboard,
  Platform,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
  TextInput,
  Alert,
  SafeAreaView,
} from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";
import { RBSheetRef } from "../../screens/Post/Posts";
import { Post } from "../../interfaces/PostInterface";
import { Comment, GetComment } from "../../interfaces/CommentInterface";
import CommentItem from "../items/CommentItem";
import Feather from "@expo/vector-icons/Feather";
import CommentItemShimmer from "../skeleton/CommentItem";
import {
  useCreateCommentMutation,
  useDeleteCommentMutation,
  useEditCommentMutation,
  useGetAllCommentsByPostQuery,
} from "../../services/commentService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  useCreateReactCommentMutation,
  useDeleteReactCommentMutation,
  useLazyCheckLikeCommentQuery,
} from "../../services/reactCommentService";
import { useGetDetailsUserQuery } from "../../services/userService";

interface CommentBottomSheetProps {
  postId: string;
  type: "post" | "shared"; // hoặc string nếu cần linh hoạt
  refetch: () => void;
}

export default forwardRef(function CommentBottomSheet(
  { postId, type, refetch }: CommentBottomSheetProps,
  ref
) {
  const bottomSheetRefComment = useRef<RBSheetRef | null>(null);
  const flatListRef = useRef<FlatList>(null);
  const [replyingTo, setReplyingTo] = useState<GetComment | null>(null);
  const [editingComment, setEditingComment] = useState<GetComment | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [sheetHeight, setSheetHeight] = useState(300);
  const [showMoreComment, setShowMoreComment] = useState<{
    [key: string]: boolean;
  }>({});
  const [userId, setUserId] = useState<string | null>(null);
  const [hasTagPrefix, setHasTagPrefix] = useState(true);
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    AsyncStorage.getItem("userId").then(setUserId);
  }, []);

  const {
    data: allComments,
    isLoading,
    isError,
    refetch: refetchComments,
  } = useGetAllCommentsByPostQuery({
    type: type, // nếu có `type`
    id: postId,
  });
  const [createComment] = useCreateCommentMutation();
  const [editComment] = useEditCommentMutation();
  const [deleteComment] = useDeleteCommentMutation();
  const [createReactComment] = useCreateReactCommentMutation();
  const [deleteReactComment] = useDeleteReactCommentMutation();
  const [checkLikeComment] = useLazyCheckLikeCommentQuery();
  const parentsComments = allComments?.filter(
    (comment) =>
      comment.post_id === postId &&
      comment.parent_comment === null &&
      comment.root_comment === null
  );

  const initialHeight = 500;
  const expandedHeight = 700;

  const textInputRef = useRef<TextInput>(null);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
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
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
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

  const handleLikeComment = async (item: GetComment) => {
    if (!userId) return;

    const isCurrentlyLiked = likedComments[item.id];

    try {
      if (isCurrentlyLiked) {
        await deleteReactComment({
          user_id: userId.toString(),
          comment_id: item.id,
        }).unwrap();
        setLikedComments((prev) => ({ ...prev, [item.id]: false }));
      } else {
        console.log("comment user id", item.id, userId);
        await createReactComment({
          user_id: userId.toString(),
          comment_id: item.id,
        }).unwrap();
        setLikedComments((prev) => ({ ...prev, [item.id]: true }));
      }
      refetchComments();
    } catch (error) {
      console.error("Lỗi khi xử lý like/unlike:", error);
    }
  };

  const fetchLikeStatus = async () => {
    if (!userId || !allComments) return;

    const likeStatusArray = await Promise.all(
      allComments.map(async (comment) => {
        try {
          const res = await checkLikeComment({
            user_id: userId.toString(),
            comment_id: comment.id,
          }).unwrap();
          return [comment.id, res.isLike] as [string, boolean];
        } catch (error) {
          console.error(`Lỗi kiểm tra like post ${comment.id}`, error);
          return [comment.id, false] as [string, boolean]; // fallback
        }
      })
    );
    const newLikedStatus = Object.fromEntries(likeStatusArray);
    setLikedComments(newLikedStatus);
  };

  useEffect(() => {
    if (userId && allComments) {
      fetchLikeStatus();
    }
  }, [userId, allComments]);

  const handleReply = (item: GetComment) => {
    setReplyingTo(item);
    setReplyContent("");
    console.log(item);

    setTimeout(() => {
      if (textInputRef.current) {
        textInputRef.current.focus();
        setHasTagPrefix(true);
      }

      if (flatListRef.current && Array.isArray(parentsComments)) {
        const index = parentsComments.findIndex((c) => c.id === item.id);

        if (index !== -1) {
          try {
            flatListRef.current.scrollToIndex({
              index, // now TypeScript knows it's a number
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

  const handleSendReply = async () => {
    if (!replyContent.trim()) return;

    // Nếu đang chỉnh sửa
    if (editingComment) {
      await editComment({
        id: editingComment.id,
        content: replyContent,
        parent_comment: hasTagPrefix ? replyingTo?.id ?? null : null,
        root_comment:
          replyingTo?.root_comment ?? replyingTo?.id ?? null,
        react_count: editingComment.react_count
      }).unwrap();
      setEditingComment(null);
      setReplyContent("");
      setHasTagPrefix(false);
      Keyboard.dismiss();

      refetchComments();
      return;
    }

    try {
      if (userId) {
        await createComment({
          post_id: postId,
          user_id: userId,
          react_count: 0,
          parent_comment: hasTagPrefix ? replyingTo?.id ?? null : null,
          root_comment:
            replyingTo?.root_comment ?? // nếu replyingTo là bình luận cấp 2
            replyingTo?.id ?? // nếu replyingTo là bình luận cấp 1
            null,
          content: replyContent,
        }).unwrap();
      }
      setReplyingTo(null);
      setReplyContent("");
      setHasTagPrefix(false);
      Keyboard.dismiss();
      refetchComments();

      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    } catch (err) {
      console.warn("Gửi bình luận thất bại", err);
    }
  };

  const handleChangeReply = (text: string) => {
    if (replyingTo) {
      const tagPrefix = `@${replyingTo.author_name} `;
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
    setReplyContent("");
    if (textInputRef.current) {
      textInputRef.current.blur();
    }
    Keyboard.dismiss();
  };

  const handleLongPressComment = (comment: GetComment) => {
    if (comment.user_id !== userId) return; // chỉ cho phép thao tác với comment của chính mình
    Alert.alert("Tùy chọn bình luận", "Bạn muốn thực hiện hành động nào?", [
      {
        text: "Chỉnh sửa",
        onPress: () => {
          const parent = comment.parent_comment
            ? allComments?.find((c) => c.id === comment.parent_comment)
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
        },
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
                style: "cancel",
              },
              {
                text: "Xóa",
                style: "destructive",
                onPress: async () => {
                  await deleteComment(comment.id)
                  refetchComments();
                  if (editingComment?.id === comment.id) {
                    setEditingComment(null);
                    setReplyContent("");
                  }
                },
              },
            ]
          );
        },
      },
      {
        text: "Đóng",
        style: "cancel",
      },
    ]);
  };

  const toggleShowReplies = (commentId: string) => {
    setShowMoreComment((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const renderComments = (comment: GetComment) => {
    const childrenComments = allComments?.filter(
      (c) => c.root_comment === comment.id
    );

    if (isLoading) {
      return (
        <View className="mb-4">
          <CommentItemShimmer />
          {/* {childrenComments.length > 0 && (
                    <View className="ml-10 border-l border-gray-200 mt-2 pl-4">
                    {childrenComments.map((_, index) => (
                        <CommentItemShimmer key={index} />
                    ))}
                    </View>
                )} */}
        </View>
      );
    }

    // Nếu đã load xong thì render comment thực
    return (
      <View className="mb-4">
        <CommentItem
          comment={{ ...comment, isLike: likedComments[comment.id] ?? false }}
          comments={parentsComments}
          onReply={handleReply}
          onLike={handleLikeComment}
          onCloseBottomSheet={() => bottomSheetRefComment.current?.close()}
          onDismissReply={handleDismissReply}
          onLongPress={handleLongPressComment}
        />

        {childrenComments?.length > 0 && (
          <View className="ml-20 pb-4" style={{ alignSelf: "flex-start" }}>
            <TouchableOpacity onPress={() => toggleShowReplies(comment.id)}>
              <Text className="text-gray-600">
                {showMoreComment[comment.id]
                  ? "Ẩn câu trả lời"
                  : `Xem thêm ${childrenComments?.length} câu trả lời`}
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {showMoreComment[comment.id] && (
          <View className="ml-10 border-l border-gray-200">
            {childrenComments?.map((child) => (
              <View key={child.id} className="pl-4">
                <CommentItem
                  comment={{
                    ...child,
                    isLike: likedComments[child.id] ?? false,
                  }}
                  comments={allComments}
                  onReply={handleReply}
                  onLike={handleLikeComment}
                  onCloseBottomSheet={() =>
                    bottomSheetRefComment.current?.close()
                  }
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

  const getItemLayout = (data: any, index: any) => ({
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
        setReplyContent("");
        refetch?.();
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
        enabled: Platform.OS === "ios",
        behavior: "padding",
      }}
    >
      <View className="flex-1 py-4">
        <Text className="text-center font-semibold text-xl items-center pb-4 border-b border-gray-100">
          Bình luận
        </Text>

        {/* Đây là phần chính - một TouchableWithoutFeedback duy nhất bao quanh phần body */}
        <TouchableWithoutFeedback onPress={handleDismissReply}>
          <SafeAreaView style={{ flex: 1 }}>
            {Array.isArray(parentsComments) && parentsComments.length > 0 ? (
              <FlatList
                ref={flatListRef}
                data={parentsComments}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => renderComments(item)}
                ListEmptyComponent={
                  <Text className="text-center text-gray-500">
                    Chưa có bình luận nào.
                  </Text>
                }
                removeClippedSubviews={false}
                getItemLayout={getItemLayout}
                contentContainerStyle={{ paddingBottom: replyingTo ? 60 : 0 }}
              />
            ) : (
              <Text className="text-center text-gray-500">
                Chưa có bình luận nào.
              </Text>
            )}
          </SafeAreaView>
        </TouchableWithoutFeedback>

        {/* Tách phần input ra khỏi TouchableWithoutFeedback */}
        <View className="flex-row items-center px-4 py-2 border-t border-gray-200 bg-white">
          <View className="flex-row items-center mt-2 w-full">
            <TextInput
              className="flex-1 rounded-lg"
              placeholder={
                replyingTo && hasTagPrefix
                  ? `@${replyingTo.author_name} `
                  : "Nhập câu trả lời..."
              }
              value={
                replyingTo && hasTagPrefix
                  ? `@${replyingTo.author_name} ${replyContent}`
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
