import { list } from "postcss";
import "./App.css";
import { useState, useEffect } from "react";
import ky from "ky";
import { List } from "postcss/lib/list";
import { InputField, SubmitButton, TextField } from "./Components";


// const PersonInfo = ({persons}: {persons: List}) => {
//   return <ul>
//   {persons.map((person) => (
//     <li key={person.Id}>{person.Name}{person.Surame}{person.Age}</li>
//   ))}
// </ul>
// }

type Person = {
  name: string;
  surname: string;
  age: number;
}

interface Info {
  id: number;
  name?: string;
  surname?: string;
  age?: number;
  }
  
export default function App() {
  let [id, setId] = useState<number>(1);
  const [info, setInfo] = useState<Info[]>([]);
  const [inputs, setInputs] = useState<Info>({ id: 0 });
  const [listContains, SetListContains] = useState<boolean>(false)
  const [persons, SetPersons] = useState<List[]>([])

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
    console.log("Persons dictionary: ", persons)
    
    return json

  }catch(error){
    console.error("Dataa ei saatu haettua: ", error)}
}

const postData = async () => {
    try {
      const json = await ky.post('http://localhost:5270/api/persons', {json: {name: inputs.name, surname: inputs.surname, age: inputs.age}}).json();
      console.log("lähetetty tieto backendiin: ", json)

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
    const { id: _, ...rest } = inputs;
    setInfo([...info, { id, ...rest }]);
    setId(id + 1);
    console.log("HandleSubmit funktion info: ", info);
    SetListContains(true)
    postData()
  };
  return (
    <div className="App">
       <ul>
      {persons.map((person: any) => (
        <li key={person.Id}>Name: {person.Name} | Surname: {person.Surname} | Age: {person.Age}</li>
      ))}
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
