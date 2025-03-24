import { list } from "postcss";
import "./App.css";
import { useState, useEffect } from "react";
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

  useEffect(() => {
    console.log("useEffectin info: ", info)
    getData()
  }, [info]
)

  const getData = async () => {
    try {
      const json: any = await ky("http://localhost:5270/api/persons").json()
      console.log("Databasesta tullut json data: ",json)
      SetPersons(json)
      
      return json

    }catch(error){
      console.error("Dataa ei saatu haettua: ", error)}
  }

  const postData = async () => {
      try {
        const json = await ky.post('http://localhost:5270/api/persons', {json: {name: inputs.name, surname: inputs.surname, age: inputs.age}}).json();
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
        const json = await ky.delete(`http://localhost:5270/api/persons/${id}`, {method: 'delete'})
        console.log("Poistettu id =>  ", id)
        getData()

    } catch(error) {

      console.error("Virhe poistaessa: ", error)
    }

      console.log("delete painettu")
    }
  }

  return (
    <div className="App">
       <ul>
        {persons.map((person) => 
          <PersonInfo key={person.Id} persons={person} del={handleDelete}/>
        )}
      </ul>
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
