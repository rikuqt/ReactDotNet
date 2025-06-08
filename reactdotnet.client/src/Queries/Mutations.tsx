import {
    useQueryClient,
    useMutation,
  } from '@tanstack/react-query';
import PostData from '../services/PostData';
import Person from '../types/Person';
import DeletePerson from '../services/DeletePerson';


export const usePostMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: PostData,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['personData'] });
        },
        onError: (error: Error) => {
            console.error('Error posting data:', error);
        },
    }) as {
        mutate: (newPerson: Person) => void;
        isLoading: boolean;
        error: Error | null;
    };
};

export const useDeleteMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id:any) => DeletePerson(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['personData'] });
        },
    }) as {
        mutate: (newPerson: Person) => void;
        isLoading: boolean;
        error: Error | null;
    };
};
