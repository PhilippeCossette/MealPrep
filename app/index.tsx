import { Text, View } from 'react-native';
import React from 'react';
import { useTheme } from 'context/ThemeContext';
import { useThemeColors } from 'hooks/useThemeColors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function Index() {
  const { currentTheme } = useTheme();
  const colors = useThemeColors();

  return (
    <SafeAreaView className={`${currentTheme === 'dark' ? 'dark' : 'light'} flex-1`}>
      <Card className="rounded-xl p-4">
        <Text className="dark text-red-200">Welcome to the App!</Text>
        <Input
          keyboardType="email-address"
          textContentType="emailAddress"
          autoComplete="email"
          placeholder="Email"
        />
      </Card>
    </SafeAreaView>
  );
}
