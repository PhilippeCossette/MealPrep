import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  View,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  Modal,
  Dimensions,
  Easing,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Input } from '../src/components/ui/input';
import { Button } from '@/components/ui/button';

type FormMode = 'login' | 'register';

interface AuthSheetProps {
  visible: boolean;
  onClose: () => void;
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function AuthSheet({ visible, onClose }: AuthSheetProps) {
  const [formMode, setFormMode] = useState<FormMode>('login');
  const [showModal, setShowModal] = useState(visible);

  // Animation values
  const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setShowModal(true);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.spring(slideAnim, {
          toValue: 0,
          damping: 20,
          mass: 0.8,
          stiffness: 100,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: SCREEN_HEIGHT,
          duration: 250,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(({ finished }) => {
        if (finished) {
          setShowModal(false);
        }
      });
    }
  }, [visible]);

  const toggleMode = () => {
    setFormMode((prev) => (prev === 'login' ? 'register' : 'login'));
  };

  const IconInput = ({ iconName, ...props }: any) => (
    <View className="relative w-full">
      <View className="absolute bottom-0 left-4 top-0 z-10 justify-center">
        <Feather name={iconName} size={20} color="#9CA3AF" />
      </View>
      <Input
        {...props}
        placeholderTextColor="#A3A3A3"
        className="h-14 border-neutral-200 bg-neutral-50 pl-12 text-neutral-900"
      />
    </View>
  );

  return (
    <Modal
      transparent
      visible={showModal}
      onRequestClose={onClose}
      animationType="none"
      statusBarTranslucent>
      <View className="flex-1 justify-end">
        {/* Backdrop (Always dark semi-transparent for contrast) */}
        <Pressable className="absolute inset-0" onPress={onClose}>
          <Animated.View className="absolute inset-0 bg-black/40" style={{ opacity: fadeAnim }} />
        </Pressable>

        {/* The Sheet (White Background) */}
        <Animated.View
          className="overflow-hidden rounded-t-[32px] bg-white shadow-2xl"
          style={{
            transform: [{ translateY: slideAnim }],
            maxHeight: SCREEN_HEIGHT * 0.9,
          }}>
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            {/* Header */}
            <View className="bg-white px-8 pb-6 pt-4">
              <View className="mb-6 items-center">
                <View className="h-1.5 w-12 rounded-full bg-neutral-200" />
              </View>

              <View className="flex-row items-start justify-between">
                <View>
                  <Text className="text-3xl font-bold text-neutral-900">
                    {formMode === 'login' ? 'Welcome back' : 'Get started'}
                  </Text>
                  <Text className="mt-2 text-base text-neutral-500">
                    {formMode === 'login'
                      ? 'Enter your details to access your account.'
                      : 'Create your account to join the community.'}
                  </Text>
                </View>
                <Pressable onPress={onClose} className="rounded-full bg-neutral-100 p-2">
                  <Feather name="x" size={20} color="#737373" />
                </Pressable>
              </View>
            </View>

            {/* Form Content */}
            <View className="gap-5 px-8 pb-10">
              {formMode === 'login' && (
                <View className="gap-4">
                  <IconInput
                    iconName="mail"
                    placeholder="Email address"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  <View>
                    <IconInput iconName="lock" placeholder="Password" secureTextEntry />
                    <Pressable className="mt-2 self-end">
                      <Text className="text-sm font-medium text-neutral-500">Forgot password?</Text>
                    </Pressable>
                  </View>
                </View>
              )}

              {formMode === 'register' && (
                <View className="gap-4">
                  <IconInput iconName="user" placeholder="Full Name" />
                  <IconInput
                    iconName="mail"
                    placeholder="Email address"
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                  <IconInput iconName="lock" placeholder="Password" secureTextEntry />
                </View>
              )}

              {/* Main Button (Black background, White text) */}
              <Button className="mt-2 h-14 w-full flex-row items-center justify-center gap-2 rounded-2xl bg-neutral-900 shadow-sm">
                <Text className="text-lg font-bold text-white">
                  {formMode === 'login' ? 'Sign In' : 'Create Account'}
                </Text>
                <Feather name="arrow-right" size={20} color="white" />
              </Button>

              {/* Divider */}
              <View className="my-2 flex-row items-center gap-4">
                <View className="h-[1px] flex-1 bg-neutral-200" />
                <Text className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                  Or continue with
                </Text>
                <View className="h-[1px] flex-1 bg-neutral-200" />
              </View>

              {/* Social Buttons */}
              <View className="flex-row gap-4">
                <Pressable className="h-14 flex-1 flex-row items-center justify-center gap-2 rounded-2xl border border-neutral-200 bg-neutral-50">
                  <Text className="font-semibold text-neutral-900">Google</Text>
                </Pressable>
                <Pressable className="h-14 flex-1 flex-row items-center justify-center gap-2 rounded-2xl border border-neutral-200 bg-neutral-50">
                  <Text className="font-semibold text-neutral-900">Apple</Text>
                </Pressable>
              </View>

              <View className="mt-4 flex-row items-center justify-center">
                <Text className="text-base text-neutral-500">
                  {formMode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                </Text>
                <Pressable onPress={toggleMode} className="p-1">
                  <Text className="text-base font-bold text-neutral-900 underline">
                    {formMode === 'login' ? 'Register' : 'Log In'}
                  </Text>
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Animated.View>
      </View>
    </Modal>
  );
}
