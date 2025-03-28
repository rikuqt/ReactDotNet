import ky from 'ky';

// Website url for koyeb
const website = import.meta.env.VITE_API_WEBSITE_URL

// Handles delete -> Site ask before deleting -> this function is used in MappingPerson function
// Each person have unique id and it deletes that one 
export const deletePerson = async (id:(id:string) => void) => {
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