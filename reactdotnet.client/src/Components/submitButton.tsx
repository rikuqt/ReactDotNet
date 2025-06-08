const SubmitButton = ({text, type, disabled}:{text: string, type: "submit", disabled : boolean}) => {
    return(
      <button className="text-orange-400 hover:bg-orange-200" 
      type={type}
      disabled={disabled}
      >
        {text}
      </button>
    )
  }

  export default SubmitButton