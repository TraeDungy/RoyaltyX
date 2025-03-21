import { useAuth } from "../../common/contexts/AuthContext";

const Message = ({ message }) => {

    const { id } = useAuth();

    console.log(message.sent_by);
    console.log(id);

    return (
        <div className={`fs-13 mb-2 ${message.sent_by == id ? 'right-chat-message' : 'left-chat-message'}`}>
            <div className="mb-0 mr-3 pe-5">
                <div className="d-flex flex-row">
                    <div className="me-5">{message.text}</div>
                    <div className="pr-4"></div>
                </div>
            </div>
            <div className="message-options dark">
                <div className="message-time">
                    <div className="d-flex flex-row">
                        <div className="pe-2">06:49</div>
                        <div className="svg15 double-check"></div>
                    </div>
                </div>
                <div className="message-arrow">
                    <i className="text-lighter la la-angle-down fs-17"></i>
                </div>
            </div>
        </div>
    );
}

export default Message;
