import { View, Text } from 'react-native'
import React from 'react'
import { useCurrentUser } from '@/hooks/useCurrentUser'
import { usePosts } from '@/hooks/usePosts'

const PostList = () => {
  const { currentUser } = useCurrentUser()
  const { posts , isLoading , error, refetch, toggleLike, deletePost, checkIsLiked} =usePosts()

      console.log( "user listed", {currentUser});
  return (
    <View>
      <Text>PostList</Text>
    </View>
  )
}

export default PostList