import Person from '../types/Person';
import PersonInfo from './personInfo'
import { useUsersQuery } from '../Queries/Queries';
import { useDeleteMutation } from '../Queries/Mutations';
import { Loader2 } from 'lucide-react';



  const PersonList = () => {

    const useQuery = useUsersQuery();

    const useDelete = useDeleteMutation();


  
    if (useQuery.isLoading) return (
      <>
      Loading... <Loader2 className="animate-spin" />
      </>
    );
  
    if (useQuery.error instanceof Error) return 'An error has occurred: ' + useQuery.error.message;
    
    return (
      <>
      <ul>
      {useQuery.data?.map((person: Person) => 
        <PersonInfo key={person.Id} persons={person} del={useDelete.mutate}/>
      )}
    </ul>
    <p>
      {useQuery.isFetching ? (
      <div className="flex items-center gap-2">
      Updating... <Loader2 className="animate-spin" /> 
      </div>
      ) : undefined}
      {useQuery.data?.length === 0 ? 'No data yet' : undefined}
      {useQuery.isError ? 'An error has occurred' : undefined}
      {useQuery.isLoading ? 
      (<>
      Loading... <Loader2 className="animate-spin" /> 
      </>)
      : undefined}
    </p>
    </>
    )
  }
  export default PersonList;