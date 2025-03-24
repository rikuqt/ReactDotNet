type Person = {
    Id: string;
    Name: string;
    Surname: string;
    Age: number;
  }

const PersonInfo = ({persons, del}: {persons: Person[], del: (id:string) => void}) => {
  return (
    <table>
    <tr>
    <td>Name: {persons.Name} | Surname: {persons.Surname} | Age: {persons.Age}</td>
    <td><button onClick={() => del(persons.Id)}>delete</button></td>
    </tr>
  </table>
  )
}

export default PersonInfo