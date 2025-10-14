import NoNotificationsFound from '@/components/noNotificationFound'
import NotificationCard from '@/components/NotificationCard'
import { useNotifications } from '@/hooks/useNotifications'
import { Feather } from '@expo/vector-icons'
import { View, Text , TouchableOpacity, ScrollView, ActivityIndicator} from 'react-native'
import { useSafeAreaInsets,SafeAreaView } from 'react-native-safe-area-context'


const notificationScreen = () => {
    const {notifications, isLoading, error, refetch, deleteNotification} = useNotifications()
    const insets = useSafeAreaInsets()

    if(error){
        return (
            <View className='flex-1 items-center justify-center p-8'>
                <Text>Error loading notifications</Text>
                <TouchableOpacity className="bg-blue-500 px-4 py-2 rounded-lg" 
                onPress={() => refetch()} >
                    <Text className="text-white">Retry</Text>
                </TouchableOpacity>
            </View>
        )
    }
  return (
    <SafeAreaView>
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-100">
        <Text className="text-xl font-bold text-gray-900">Notifications</Text>
        <TouchableOpacity>
          <Feather name="settings" size={24} color="#657786" />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={{ paddingBottom: insets.bottom }}
        className="flex-1"
        showsVerticalScrollIndicator={false}

      >
        {isLoading ? 
        ( <View className="flex-1 items-center justify-center p-8">
          <ActivityIndicator size="large" color="#1DA1F2" />
          <Text className="text-gray-500 mt-4">Loading notifications...</Text>
        </View>
        ) : notifications.length === 0 ? (
          <NoNotificationsFound />
        ) : 
        (
          <View>
              <Text>Error loading notifications</Text>
          </View>
          // notifications.map((notification: Notification) => (
          //   <NotificationCard
          //     key={notification._id}
          //     notification={notification}
          //     onDelete={deleteNotification}
          //   />
          // )};
          
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default notificationScreen