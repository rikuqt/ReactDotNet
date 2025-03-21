const SubmitButton = ({text, type}:{text: string, type: "submit"}) => {
    return(
      <button className="text-orange-400 hover:bg-orange-200" type={type}>{text}</button>
    )
  }
  
  export default SubmitButton