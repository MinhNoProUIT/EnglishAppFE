import {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Dimensions,
} from "react-native";
import { Avatar } from "react-native-paper";
import RBSheet from "react-native-raw-bottom-sheet";
import { RBSheetRef } from "../../screens/Post/Posts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGetDetailsUserQuery } from "../../services/userService";
import { useCreateSharedPostMutation } from "../../services/sharedPostService";

interface ShareBottomSheetProps {
  postId: string;
  type: "post" | "shared"; // hoặc string nếu cần linh hoạt
  refetch: () => void;
}

export default forwardRef(function ShareBottomSheet(
  { postId, type = "post", refetch }: ShareBottomSheetProps,
  ref
) {
  const bottomSheetRefShare = useRef<RBSheetRef | null>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [sheetHeight, setSheetHeight] = useState(300);
  const initialHeight = 300;
  const expandedHeight = 500;
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState<string | null>(null);

  console.log("postid", postId, type);

  useEffect(() => {
    AsyncStorage.getItem("userId").then(setUserId);
  }, [])

  useImperativeHandle(ref, () => ({
    open: () => bottomSheetRefShare.current?.open(),
    close: () => bottomSheetRefShare.current?.close(),
  }));

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e) => {
        setKeyboardHeight(e.endCoordinates.height);
        setSheetHeight(expandedHeight);
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

  const { data: detailsUser } = useGetDetailsUserQuery();
  const [createSharedPostComment] = useCreateSharedPostMutation();

  const handleSharedPost = async () => {
    if (!userId || !content.trim()) {
      console.warn("Thông tin người dùng hoặc nội dung chia sẻ không hợp lệ");
      return;
    }

    try {
      await createSharedPostComment({
        content: content.trim(),
        user_id: userId,
        post_id: type === "post" ? postId : null,
        shared_post_id: type === "shared" ? postId : null,
      }).unwrap();
      setContent("");
      Keyboard.dismiss();
      bottomSheetRefShare.current?.close();
      refetch();
    } catch (error) {
      console.warn("Chia sẻ thất bại:", error);
    }
  };

  return (
    <RBSheet
      ref={bottomSheetRefShare}
      height={sheetHeight}
      openDuration={100}
      closeOnPressBack
      closeOnPressMask
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
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 10 : 0}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="py-4 h-full bg-gray-100">
            <View className="bg-white mx-4 px-6 py-6 rounded-3xl relative">
              {detailsUser && (
                <View className="flex-row items-center gap-4 mb-4">
                  <Avatar.Image
                    size={50}
                    source={{ uri: detailsUser?.image_url }}
                  />
                  <Text className="font-bold text-lg">
                    {detailsUser?.username}
                  </Text>
                </View>
              )}

              <TextInput
                multiline
                className="mr-2 py-2 mb-4 text-base"
                placeholder="Hãy nói gì đó về nội dung này..."
                placeholderTextColor="#9CA3AF"
                value={content}
                onChangeText={setContent}
              />

              <View className="flex-row justify-end mt-2">
                <TouchableOpacity
                  className="bg-blue-500 px-4 py-3 rounded-lg"
                  onPress={() => handleSharedPost()}
                >
                  <Text className="text-white font-semibold text-base">
                    Chia sẻ ngay
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </RBSheet>
  );
});
