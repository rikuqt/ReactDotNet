import { list } from "postcss";
import "./App.css";
import { useState } from "react";
import ky from "ky";
import { InputField, SubmitButton, TextField, PersonInfo, } from "./Components";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

// Types and interfaces
type Person = {
  Id: string;
  Name: string;
  Surname: string;
  Age: number;
}

interface Info {
  name?: string;
  surname?: string;
  age?: number;
  }

export default function App() {
  const [info, setInfo] = useState<Info[]>([]);
  const [inputs, setInputs] = useState<Info>({});
  const [listContains, SetListContains] = useState<boolean>(false)
  const [persons, SetPersons] = useState<Person[]>([])

  const getData = async () => {
    try {
      const json: any = await ky("https://philosophical-kayley-ite22v2-c2d0e70d.koyeb.app/api/persons").json()
      console.log("Databasesta tullut json data: ",json)
      SetPersons(json)
      
      return json

    }catch(error){
      console.error("Dataa ei saatu haettua: ", error)}
  }

  const postData = async () => {
      try {
        const json = await ky.post('https://philosophical-kayley-ite22v2-c2d0e70d.koyeb.app/api/persons', {json: {name: inputs.name, surname: inputs.surname, age: inputs.age}}).json();
        console.log("lähetetty tieto backendiin: ", json)
        getData()

    } catch(error) {

      console.error("Virhe tietoja lähettäessä: ", error)
    }
  }

  const handleChange = (event: { target: { name: any; value: any; }; }) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({
      ...values,
      [name]: value,
    }));
  };

  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    console.log(inputs);
    setInfo([...info, { inputs }]);
    console.log("HandleSubmit funktion info: ", info);
    SetListContains(true)
    postData()
  };

  const handleDelete = async (id:(id:string) => void) => {
    if (window.confirm("You really want to delete this?")){
      try {
        const json = await ky.delete(`https://philosophical-kayley-ite22v2-c2d0e70d.koyeb.app/api/persons/${id}`, {method: 'delete'})
        console.log("Poistettu id =>  ", id)
        getData()

    } catch(error) {

      console.error("Virhe poistaessa: ", error)
    }

      console.log("delete painettu")
    }
  }

  const MappingPerson = () => {
    const { isPending, error, data, isFetching }  = useQuery({
      queryKey: ['personData'],
      queryFn: async () => {
        const json = await ky("https://philosophical-kayley-ite22v2-c2d0e70d.koyeb.app/api/persons").json();
        console.log("Databasesta tullut json data: ", json);
        return json; 
      },
    });
  
    if (isPending) return 'Loading...';
  
    if (error) return 'An error has occurred: ' + error.message;
    
    return (
      <>
      <ul>
      {data?.map((person: Person) => 
        <PersonInfo key={person.Id} persons={person} del={handleDelete}/>
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
      <MappingPerson />
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
