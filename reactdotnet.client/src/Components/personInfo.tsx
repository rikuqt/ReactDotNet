import { Person } from "../types";

export const PersonInfo = ({persons, del}: {persons: Person, del: any}) => {
  return (
    <table className="table-auto align-middle">
  <thead>
    <tr>
      <th>Name</th>
      <th>Surname</th>
      <th>Age</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{persons.Name}</td>
      <td>{persons.Surname}</td>
      <td>{persons.Age}</td>
      <td>
        <button onClick={() => del(persons.Id)}>Delete</button>
      </td>
    </tr>
  </tbody>
</table>
  )
}