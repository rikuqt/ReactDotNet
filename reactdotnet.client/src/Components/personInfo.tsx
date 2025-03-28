import Person from "../types/Person"

const PersonInfo = ({persons, del}: {persons: Person, del: any}) => {
  return (
    <table className="w-full text-sm text-left rtl:text-right">
  <thead className="text-xl uppercase text-center text-orange-400">
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
        <button onClick={() => del(persons.Id)}>Delete</button>
      </td>
    </tr>
  </tbody>
</table>
  )
}

export default PersonInfo