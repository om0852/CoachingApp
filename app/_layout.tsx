import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { Slot } from 'expo-router'; // Important

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const [fontsLoaded] = useFonts({
    outfit: require('../assets/fonts/Outfit-Regular.ttf'),
    'outfit-bold': require('../assets/fonts/Outfit-Bold.ttf'),
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* This renders the current route */}
      <Slot />
    </ThemeProvider>
  );
}
