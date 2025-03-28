import ky from 'ky';
import { Person } from "../types";

// Website url for koyeb
const website = import.meta.env.VITE_API_WEBSITE_URL

// GET for .net backend -> backend running on koyeb -> MongoDB for stored data
export const getData = async () => {
try {
    const json: any = await ky.get(`${website}`).json()
    console.log("Databasesta tullut json data: ",json)
    
    return json as Person[]

}catch(error){
    console.error("Dataa ei saatu haettua: ", error)}
}