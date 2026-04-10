function SubmitButton({ handleSubmit, disabled }) {
  return (
    <button onClick={handleSubmit} style={btn} disabled={disabled}>
      Add Transaction
    </button>
  );
}
const btn = {
  width: "100%",
  padding: "12px",
  marginTop: "15px",
  marginLeft:"15px",
  background:"black",
  background: "#8a508c",
  color: "white",
  borderRadius:"20px",
};

export default SubmitButton;