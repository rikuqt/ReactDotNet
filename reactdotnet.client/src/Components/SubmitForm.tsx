import { useState } from "react";
import Info from "../types/Info";
import InputField from "./inputfield";
import SubmitButton from "./submitButton";
import { usePostMutation } from "../Queries/Mutations";
import { Loader2 } from 'lucide-react';
import PersonList from "./PersonList";


const SubmitForm =  () => {
          const [info, setInfo] = useState<Info[] | any>([]); // <- pitäisi löytää parempi kuin "any"
          const [inputs, setInputs] = useState<Info>({});

          const { mutate, isLoading, error } = usePostMutation();

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
        console.log("Info jota postataan: ", info)
        mutate(inputs);
        setInputs({}); // Reset inputs after submission
      };
    
    return (
      <div className="flex flex-col justify-center md:flex md:shrink-0">
        <div className="flex flex-col items-center justify-center mb-4">
          <PersonList />
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col items-center outline-orange-400 outline-dashed gap-3 p-4 rounded-lg shadow-md">
          <label>
            <InputField type="text" 
            name="name" 
            value={inputs.name || ""} 
            onChange={handleChange} 
            placeholder="First name"
            disabled={isLoading ? true : false}
            />
            </label>
            
            <label>
            <InputField type="text" 
            name="surname" 
            value={inputs.surname || ""} 
            onChange={handleChange} 
            placeholder="Surname" 
            disabled={isLoading ? true : false}
            />
            </label>

            <label>
            <InputField type="number"
            name="age"
            value={inputs.age || ""}
            onChange={handleChange}
            placeholder="Age"
            disabled={isLoading ? true : false}
            />
            </label>
            <p>
              {isLoading ? (
                <div className="flex items-center gap-2">
                  Sending new info... <Loader2 className="h-6 w-6 text-gray-500" />
                </div>
              ) : undefined}
              {error ? `Error: ${error.message}` : undefined}
            </p>
            <SubmitButton type={"submit"} text="Submit" disabled={isLoading ? true : false}/>
          </form>
      </div>
    )
}

export default SubmitForm