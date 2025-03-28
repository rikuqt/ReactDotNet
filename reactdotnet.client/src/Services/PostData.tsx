import ky from 'ky';
import { Info } from "../types";

// Website url for koyeb
const website = import.meta.env.VITE_API_WEBSITE_URL;

// POST to .net backend -> MongoDB used to store the data
export const postData = async (inputs: Info ) => {
    try {
    const json = await ky.post(`${website}`, {json: {name: inputs.name, surname: inputs.surname, age: inputs.age}}).json();
    console.log("lähetetty tieto backendiin: ", json);
    

} catch(error) {

    console.error("Virhe tietoja lähettäessä: ", error);
    }
};