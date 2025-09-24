import { View, Text ,Button } from 'react-native'
import { useClerk } from '@clerk/clerk-expo'
import React from 'react'


const HomeScreen = () => {
    const { signOut } = useClerk();
  return (
    <View>
      <Text>Home screen</Text>

        <Button title='Sign Out' onPress={() => signOut()} />
    </View>
  )
}

export default HomeScreen;