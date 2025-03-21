import { useState } from "react";
import { Send } from "react-bootstrap-icons";

const MessageInput = ({ onSendMessage }) => {
    const [text, setText] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) return;

        onSendMessage(text);
        setText("");
    };

    return (
        <form className="chat-search px-3" onSubmit={handleSubmit}>
            <div className="input-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Write a message..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <button type="submit" className="input-group-append btn btn-primary px-3 d-flex align-items-center justify-content-center">
                    <Send />
                </button>
            </div>
        </form>
    );
};

export default MessageInput;
