import { View, Text, } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'


const messagesScreens = () => {
      const insets= useSafeAreaInsets();
      


  return (
    <SafeAreaView>
      <Text>messagesScreens</Text>
    </SafeAreaView>
  )
}

export default messagesScreens