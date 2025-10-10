import SignOutBtn from "@/components/SignOutBtn";
import { useUserSync } from "@/hooks/useUserSync";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const HomeScreen = () => {
  
  useUserSync()

  return (
    <SafeAreaView className='flex-1'>
      <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-100">
        <Ionicons name="logo-twitter" size={24} color="#1DA1F2" />
        <Text className="text-xl font-bold text-gray-900">Home</Text>
      
      </View>
      <SignOutBtn/>
    </SafeAreaView>
  )
}

export default HomeScreen