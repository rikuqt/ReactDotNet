const InputField = ({type, name, value, onChange, placeholder }: {type: "text" | "number",name: string, value: string | number, 
  onChange: React.ChangeEventHandler<HTMLInputElement>, placeholder: string }) => {
  return (
    <label>
      <input
        className="hover:bg-orange-400 text-white placeholder:text-white p-2 rounded"
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </label>
  );
}

export default InputField;