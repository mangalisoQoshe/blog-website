import { AlertTriangle } from "../../components/icons/Icons";

function ErrorMsg({ message }) {
  return (
    <div style={{"display":"flex",    
    "alignItems": "center",
    "flexDirection": "column","paddingTop":"3rem"}}>
        <AlertTriangle/>
      <h2 style={{"textAlign":"center","marginTop":"3rem"}}>{message}</h2>
    </div>
  );
}

export default ErrorMsg;
