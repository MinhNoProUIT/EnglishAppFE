import AsyncStorage from "@react-native-async-storage/async-storage";

export const validateToken = async (accessToken: string): Promise<boolean> => {
  try {
    const res = await fetch("https://englishapp-uit.onrender.com/auth/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return res.ok;
  } catch {
    return false;
  }
};

export const refreshAccessToken = async (refreshToken: string) => {
  try {
    const res = await fetch(
      "https://englishapp-uit.onrender.com/auth/refresh-token",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      }
    );

    if (!res.ok) return null;
    return await res.json(); // returns { accessToken, refreshToken }
  } catch {
    return null;
  }
};

export const logout = async (navigation?: any) => {
  await AsyncStorage.removeItem("authToken");
  await AsyncStorage.removeItem("refreshToken");
  await AsyncStorage.removeItem("userId");

  if (navigation) {
    navigation.reset({ index: 0, routes: [{ name: "SignIn" }] });
  }
};
