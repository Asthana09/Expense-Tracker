function DescriptionInput({description, setDescription}){
  return (
    <input
      type="text"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      placeholder="Description"
      style={input}
    />
  );
}

const input = {
  width: "100%",
  padding: "10px",
  marginTop: "10px",
  borderRadius:"10px",
borderColor:"#d38dd6",   
};
export default DescriptionInput;