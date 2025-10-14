import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useApiClient } from "@/utils/api";

export const useNotifications = () => {
    const api  = useApiClient();
    const queryClient = useQueryClient();   

    const {
        data: notifications, 
        isLoading, 
        error, 
        refetch,
        isRefetching
    } 
     = useQuery({
        queryKey: ['notifications'],
        queryFn: ()=> api.get('/notifications'),
        select:(res)=> res.data.notifications   
    })
    const deletenotificationMutation = useMutation({
        mutationFn: (notificationId: string) => api.delete(`/notifications/${notificationId}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notifications'] });
        },
        onError: (error) => {
            console.error("Failed to delete notification:", error);
        }
    });

    const deleteNotification = (notificationId: string) => {
        deletenotificationMutation.mutate(notificationId);
    };
    return {
        notifications: notifications || [],
        isLoading,
        error,
        refetch,
        isRefetching,
        deleteNotification,
        isDeletingNotification: deletenotificationMutation.isPending,
    };
};