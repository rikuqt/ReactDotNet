const TextField = ({inputs, listContains}: {inputs: any, listContains: boolean}) => {
    if(listContains == true) {
      return <ul>
        <h1 className="text-2xl font-bold">Sending this data to database</h1>       
      <li>Name: {inputs.name}</li>
      <li>Surname: {inputs.surname}</li>
      <li>Age: {inputs.age}</li>
    </ul>
    } else {
      return <p>No data yet</p>
    }
  }

export default TextField