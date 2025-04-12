import { View } from "react-native";
import ShimmerPlaceholder from "./ShimmerPlaceholder";

export default function CommentItemShimmer() {
  return (
    <View className="flex-row px-4 py-4">
      {/* Avatar */}
      <ShimmerPlaceholder width={35} height={35} borderRadius={999} />

      <View className="ml-3 flex-1">
        {/* Tên và ngày tạo */}
        <View className="flex-row gap-2 mb-2">
          <ShimmerPlaceholder width={100} height={12} />
          <ShimmerPlaceholder width={60} height={12} />
        </View>

        {/* Nội dung */}
        <ShimmerPlaceholder width="100%" height={14} />
        <View className="mt-1">
          <ShimmerPlaceholder width="90%" height={14} />
        </View>

        {/* Nút Trả lời */}
        <View className="mt-2">
          <ShimmerPlaceholder width={60} height={12} />
        </View>
      </View>

      {/* Icon like và số lượng */}
      <View className="items-center justify-center ml-2">
        <ShimmerPlaceholder width={20} height={20} borderRadius={10} />
        <View className="mt-1">
          <ShimmerPlaceholder width={16} height={10} />
        </View>
      </View>
    </View>
  );
}
