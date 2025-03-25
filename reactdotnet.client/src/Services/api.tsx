import ky from 'ky';
import { Person, Info } from "../Types";

// Website url for koyeb

const website = import.meta.env.VITE_API_WEBSITE_URL

// GET for .net backend -> backend running on koyeb -> MongoDB for stored data
const getData = async () => {
try {
    const json: any = await ky.get(`${website}`).json()
    console.log("Databasesta tullut json data: ",json)
    
    return json as Person[]

}catch(error){
    console.error("Dataa ei saatu haettua: ", error)}
}

// POST to .net backend -> MongoDB used to store the data
const postData = async (inputs: Info ) => {
    try {
    const json = await ky.post(`${website}`, {json: {name: inputs.name, surname: inputs.surname, age: inputs.age}}).json();
    console.log("lähetetty tieto backendiin: ", json)
    

} catch(error) {

    console.error("Virhe tietoja lähettäessä: ", error)
}
}

// Handles delete -> Site ask before deleting -> this function is used in MappingPerson function
// Each person have unique id and it deletes that one 
const deletePerson = async (id:(id:string) => void) => {
if (window.confirm("You really want to delete this?")){
    try {
    await ky.delete(`${website}/${id}`, {method: 'delete'})
    console.log("Poistettu id =>  ", id)
    

} catch(error) {

    console.error("Virhe poistaessa: ", error)
}

    console.log("delete painettu")
}
}

export { getData, postData, deletePerson };