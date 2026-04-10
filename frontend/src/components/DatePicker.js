
//DatePicker is a functional Component and {date, setDate} is props destructuring
function DatePicker({date, setDate}){
    return(
        <>
        <div style={{marginTop:"10px", color:"#6b166e"}}>
         <lable> Select Date</lable>
         <input 
         type="date"
         value={date}
         onChange={(e)=>setDate(e.target.value)}
         style={input}
         />
        </div>
        
        </>
    );
}

const input = {
  width: "100%",
  padding: "10px",
  marginTop: "5px",
  borderRadius:"10px",
borderColor:"#d38dd6",};
export default DatePicker;
