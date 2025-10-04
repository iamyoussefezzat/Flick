import SignOutBtn from '@/components/SignOutBtn'
import { useUserSync } from '@/hooks/useUserSync'
import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const HomeScreen = () => {
  
  useUserSync()

  return (
    <SafeAreaView className='flex-1'>
      <Text>Home Screen</Text>
      <SignOutBtn/>
    </SafeAreaView>
  )
}

export default HomeScreen