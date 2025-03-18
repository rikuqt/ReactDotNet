import { list } from "postcss";
import "./App.css";
import { useState } from "react";
import React from "react";

// refaktoroi input fieldit omaksi kompotentiksi

const InputField = ({type, name, value, onChange, placeholder }: {type: "text" | "number",name: string, value: string | number, 
  onChange: React.ChangeEventHandler<HTMLInputElement>, placeholder: string }) => {
  return (
    <label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </label>
  );
}

const Button= ({type, text}:{type: "submit", text: string}) => {
  return(
    <button className="text-orange-400 hover:bg-orange-200" type="submit">{text}</button>
  )
}

export default function App() {
    interface Info {
        id: number;
        name?: string;
        surname?: string;
        age?: number;
        }
  let [id, setId] = useState<number>(1);
  const [info, setInfo] = useState<Info[]>([]);
  const [inputs, setInputs] = useState<Info>({ id: 0 });


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
    console.log(info);
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

      </form>
      <p>Sent to DB</p>
      <ul className="font-extralight text-2xl">
            <li>Name: {info[1].name}</li>
            <li>Surname: {info[1].surname}</li>
            <li>Age: {info[1].age}</li>
      </ul>
    </div>
  );
}
