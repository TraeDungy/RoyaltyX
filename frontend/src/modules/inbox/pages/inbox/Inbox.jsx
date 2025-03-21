import "./Inbox.css";
import CreateNewConversation from "../../components/CreateNewConversation";
import { Chat } from "react-bootstrap-icons";

function Inbox() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center w-100" style={{ height: 'calc(100vh - 65px)' }}>
      <Chat style={{ fontSize: 50 }} />
      <h5 className="mb-0 mt-3">Your inbox</h5>
      <p className="txt-lighter py-2 mb-3">Create a new conversation!</p>
      <CreateNewConversation />
    </div>
  );
}

export default Inbox;
