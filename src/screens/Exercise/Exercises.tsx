import React, { useTransition } from "react";
import { useTranslation } from "react-i18next";
import { View, Text } from "react-native";

export default function Exercises() {
  const { t } = useTranslation();
  return (
    <View>
      <Text>{t("SETTING")}</Text>
    </View>
  );
}
