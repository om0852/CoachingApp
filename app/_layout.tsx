import { useColorScheme } from "@/hooks/useColorScheme";
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router"; // Important
import { useState } from "react";
import "react-native-reanimated";
import { UserDetailContext } from "../context/userDetailContext";

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    outfit: require("../assets/fonts/Outfit-Regular.ttf"),
    "outfit-bold": require("../assets/fonts/Outfit-Bold.ttf"),
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!fontsLoaded) return null;
const [userDetail,setUserDetail]=useState(null)
  return (
    <UserDetailContext.Provider value={{userDetail,setUserDetail}}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        {/* This renders the current route */}
        <Stack screenOptions={{
          headerShown:false
        }}></Stack>
      </ThemeProvider>
    </UserDetailContext.Provider>
  );
}
