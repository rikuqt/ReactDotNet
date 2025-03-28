import Person from '../types/Person';
import GetData from '../services/GetData';
import DeletePerson from '../services/DeletePerson';
import PersonInfo from './personInfo'
import {
    useQuery,
  } from '@tanstack/react-query';

  // TanStack query -> query key defined as 'personData' -> if some other component
  // tries to use/get data from same query key, there is no need to make many GET's
  // isPending, erro , data, isFetching are TanStacks own variables 
  // data returns data if everything goes right -> data is used to return a list to view of persons
  const PersonList = () => {
    const { isLoading, error, data, isFetching } = useQuery<Person[], Error, any, any>({ // <- korjaa any kohdat
      queryKey: ['personData'],
      queryFn: GetData
    });
  
    if (isLoading) return 'Loading...';
  
    if (error instanceof Error) return 'An error has occurred: ' + error.message;
    
    return (
      <>
      <ul>
      {data?.map((person: Person) => 
        <PersonInfo key={person.Id} persons={person} del={DeletePerson}/>
      )}
    </ul>
    <p>{isFetching ? 'Updating...' : ''}</p>
    </>
    )
  }

  // const mutation = useMutation({
  //   mutationFn: postData,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries(['PersonData']);
  //   }
  // });

  export default PersonList;