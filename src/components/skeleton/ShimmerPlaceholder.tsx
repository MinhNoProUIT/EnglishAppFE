// components/ShimmerPlaceholder.tsx
import React, { useEffect, useRef } from "react";
import { Animated, DimensionValue, StyleProp, View, ViewStyle } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

interface Props {
  width?: DimensionValue;
  height?: number;
  style?: StyleProp<ViewStyle>;
  borderRadius?: number;
}

export default function ShimmerPlaceholder({
  width = "100%",
  height = 16,
  style,
  borderRadius = 4,
}: Props) {
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ).start();
  }, [shimmerAnim]);

  const translateX = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-150, 150],
  });

  return (
    <View
      style={[
        {
          width,
          height,
          borderRadius,
          backgroundColor: "#e0e0e0",
          overflow: "hidden",
        },
        style,
      ]}
    >
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          width: "100%",
          transform: [{ translateX }],
        }}
      >
        <LinearGradient
          colors={["transparent", "rgba(255,255,255,0.2)", "transparent"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1 }}
        />
      </Animated.View>
    </View>
  );
}
