import { useState } from 'react';
import AuthSheet from '../components/AuthSheet';
import { Text, View, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '@/components/ui/button';
import { useTheme } from 'context/ThemeContext';

export default function Index() {
  const { currentTheme } = useTheme();
  const [authVisible, setAuthVisible] = useState(false);

  return (
    <SafeAreaView
      className={`${currentTheme === 'light' ? 'light' : 'dark'} flex-1 bg-primary p-5`}>
      <View className="flex-1 justify-end py-6">
        <Text className="text-lg font-medium">Healthy meals without the stress.</Text>

        <Text className="text-5xl font-bold">
          Prep Smarter<Text className="text-green-600">.</Text>
        </Text>
        <Text className="text-5xl font-bold">
          Eat Better<Text className="text-green-600">.</Text>
        </Text>
      </View>

      <Button className="h-[60px] w-full bg-secondary" onPress={() => setAuthVisible(true)}>
        <Text className="font-semibold">Get Started</Text>
      </Button>

      <View className="flex-row justify-center py-4">
        <Text>Already have an account?</Text>
        <Pressable onPress={() => setAuthVisible(true)}>
          <Text className="ml-1 font-semibold">Log In</Text>
        </Pressable>
      </View>

      <AuthSheet visible={authVisible} onClose={() => setAuthVisible(false)} />
    </SafeAreaView>
  );
}
