const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// Đảm bảo 'svg' không nằm trong assetExts nhưng có trong sourceExts
config.resolver = {
  ...config.resolver,
  assetExts: config.resolver.assetExts.filter((ext) => ext !== "svg"),
  sourceExts: [...config.resolver.sourceExts, "svg"],
};

// Cấu hình transformer cho SVG
config.transformer = {
  ...config.transformer,
  babelTransformerPath: require.resolve("react-native-svg-transformer"),
};

// Xuất cấu hình với NativeWind
module.exports = withNativeWind(config, { input: "./global.css" });
