import { list } from "postcss";
import "./App.css";
import { useState, useEffect } from "react";
import React from "react";
import ky from "ky";


// refaktoroi input fieldit omaksi kompotentiksi
// alert jos kentissä on tyhjää

const InputField = ({type, name, value, onChange, placeholder }: {type: "text" | "number",name: string, value: string | number, 
  onChange: React.ChangeEventHandler<HTMLInputElement>, placeholder: string }) => {
  return (
    <label>
      <input
        className="hover:bg-orange-400 text-white placeholder:text-white p-2 rounded"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </label>
  );
}

const Button = ({text, type}:{text: string, type: "submit"}) => {
  return(
    <button className="text-orange-400 hover:bg-orange-200" type={type}>{text}</button>
  )
}

const TextField = ({info, listContains}: {info: any, listContains: boolean}) => {
  if(listContains == true) {
    return <ul>       
    <li>Name: {info[0].name}</li>
    <li>Surname: {info[0].surname}</li>
    <li>Age: {info[0].age}</li>
  </ul>
  } else {
    return <p>No data yet</p>
  }
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

  useEffect(() => {
    console.log("useEffectin info: ", info)
  }, [info]
)

const postData = async () => {
    try {const json = await ky.post('http://localhost:5270/api/persons', {json: {name: "testi3", surname: "testi3", age: 3}}).json();
      
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

        <Button type={"submit"} text="Submit"/>

        <TextField info={info} listContains={listContains}/>
      </form>
    </div>
  );
}
