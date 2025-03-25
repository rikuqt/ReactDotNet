import "./App.css";
import { useState } from "react";
import { InputField, SubmitButton, TextField, PersonInfo, } from "./Components";
import { getData, postData, deletePerson } from "./Services/api";
import { Person, Info } from "./Types";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// Tanstack queryclient
const queryClient = new QueryClient()

export default function App() {
  const [info, setInfo] = useState<Info[] | any>([]); // <- pitäisi löytää parempi kuin "any"
  const [inputs, setInputs] = useState<Info>({});
  const [listContains, SetListContains] = useState<boolean>(false)

  // Handles inputfields -> event follows user inputs that is added to list
  // with right key value pairs
  const handleChange = (event: { target: { name: any; value: any; }; }) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({
      ...values,
      [name]: value,
    }));
  };

  // Handles submit buttons logic -> preventdefault so site doesn't refresh when clicked
  // Sets inputs to info list
  // SetlistContains is used to check if field contains data or not -> returns "No data yet" on false
  // if there is data data is returned
  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    setInfo([...info, inputs]);
    console.log("HandleSubmit funktion info: ", info); 
    SetListContains(true)
    console.log("Info jota postataan: ", info)
    postData(inputs)
  };

  // TanStack query -> query key defined as 'personData' -> if some other component
  // tries to use/get data from same query key, there is no need to make many GET's
  // isPending, erro , data, isFetching are TanStacks own variables 
  // data returns data if everything goes right -> data is used to return a list to view of persons
  const MappingPerson = () => {
    const { isLoading, error, data, isFetching } = useQuery<Person[], Error, any, any>({ // <- korjaa any kohdat
      queryKey: ['personData'],
      queryFn: getData
    });
  
    if (isLoading) return 'Loading...';
  
    if (error instanceof Error) return 'An error has occurred: ' + error.message;
    
    return (
      <>
      <ul>
      {data?.map((person: Person) => 
        <PersonInfo key={person.Id} persons={person} del={deletePerson}/>
      )}
    </ul>
    <p>{isFetching ? 'Updating...' : ''}</p>
    </>
    )
  }

  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
          <MappingPerson/>
      </QueryClientProvider>

      <form onSubmit={handleSubmit}>
        <label>

         <InputField type="text" 
         name="name" 
         value={inputs.name || ""} 
         onChange={handleChange} 
         placeholder="First name"
         />
        </label>
        
        <label>
        <InputField type="text" 
         name="surname" 
         value={inputs.surname || ""} 
         onChange={handleChange} 
         placeholder="Surname" 
         />
        </label>

        <label>
        <InputField type="number"
         name="age"
         value={inputs.age || ""}
         onChange={handleChange}
         placeholder="Age"
         />
        </label>

        <SubmitButton type={"submit"} text="Submit"/>

        <TextField inputs={inputs} listContains={listContains}/>
      </form>
    </div>
  );
}
