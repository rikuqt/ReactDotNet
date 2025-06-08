import {
    useQuery,
  } from '@tanstack/react-query';
import GetData from '../services/GetData';
import Person from '../types/Person';

  export const useUsersQuery = () => {
    return useQuery({
        queryKey: ['personData'],
        queryFn: GetData, 
        staleTime: 1000 * 60 * 5, // 5 minutes
        refetchOnWindowFocus: false,
        onError: (error: Error) => {
            console.error('Error fetching data:', error);
        },
        onSuccess: (data: Person[]) => {
            console.log('Data fetched successfully:', data);
        },
        }) as {
        isLoading: boolean;
        isError: boolean;
        data: Person[] | undefined; 
        error: Error | null;
        isFetching: boolean;
        };
  }