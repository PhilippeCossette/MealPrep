import { Text, View, Image, Pressable } from 'react-native';
import React from 'react';

import { useTheme } from 'context/ThemeContext';
import { useThemeColors } from 'hooks/useThemeColors';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

export default function Index() {
  const { currentTheme } = useTheme();
  // const colors = useThemeColors();

  return (
    <SafeAreaView
      className={`${currentTheme === 'light' ? 'light' : 'dark'} relative flex-1 gap-4 bg-primary p-5`}>
      {/* <View className="">
        <Image width={2} source={require('../assets/longcartoon-mealprep.png')} className="" />
      </View> */}
      <View className="flex-1 justify-end py-6">
        <Text className="text-lg font-medium">Healthy meals without the stress.</Text>
        <Text className="text-5xl font-bold">
          Prep Smarter<Text className="text-green-700">.</Text>
        </Text>
        <Text className="text-5xl font-bold">
          Eat better<Text className="text-green-700">.</Text>
        </Text>
      </View>

      <Button className="h-[60px] w-full bg-secondary">
        <Text>Get Started</Text>
      </Button>
      <View className="flex-row items-center justify-center py-4">
        <Text className="">Aleready have an account?</Text>
        <Pressable>
          <Text className="ml-1 font-bold">Log In</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
