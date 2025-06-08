import Person from "../types/Person"
import { Trash2 } from 'lucide-react';

const PersonInfo = ({persons, del}: {persons: Person, del: any}) => {
  return (
    <table className="w-full text-sm text-left rtl:text-right">
  <thead className="text-xl  text-center text-orange-400">
    <tr>
      <th >Name</th>
      <th>Surname</th>
      <th>Age</th>
    </tr>
  </thead>
  <tbody >
    <tr >
      <td className="bg-gray-700 text-center">{persons.Name}</td>
      <td className="bg-gray-700 text-center">{persons.Surname}</td>
      <td className="bg-gray-700 text-center">{persons.Age}</td>
      <td>
        <button 
        className="text-orange-400 hover:bg-orange-200 flex items-center gap-2 p-3 rounded"
        onClick={() => del(persons.Id)}>
          Delete 
          <Trash2 className="h-4 w-4"/>
          </button>
      </td>
    </tr>
  </tbody>
</table>
  )
}

export default PersonInfo