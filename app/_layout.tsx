// app/_layout.tsx
import './global.css';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ThemeProvider, useTheme } from 'context/ThemeContext';
import { View } from 'react-native';

function LayoutInner() {
  const { currentTheme } = useTheme();

  return (
    <View className={`${currentTheme === 'dark' ? 'dark' : 'light'} flex-1`}>
      <StatusBar style={currentTheme === 'dark' ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }} />
    </View>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <LayoutInner />
    </ThemeProvider>
  );
}
