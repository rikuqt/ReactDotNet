import { useState } from "react";
import Info from "../types/Info";
import PostData from "../services/PostData";
import InputField from "./inputfield";
import TextField from "./textfield";
import SubmitButton from "./submitButton";


const SubmitForm =  () => {
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
        PostData(inputs)
      };
    
    return (
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
    )
}

export default SubmitForm