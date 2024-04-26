import { AlertTriangle } from "../../components/icons/Icons";

function ErrorMsg({ message }) {
  return (
    <div>
        <AlertTriangle/>
      <h1>{message}</h1>
    </div>
  );
}

export default ErrorMsg;
