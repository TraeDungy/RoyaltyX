import { useEffect, useState } from "react";
import { Send } from "react-bootstrap-icons";
import { useParams } from "react-router";
import { getConversation, getConversationMessages } from "../../api/conversation";
import Message from "../../components/Message";

const Conversation = () => {

    const [conversation, setConversation] = useState([]);
    const [messages, setMessages] = useState([]);

    const { conversation_id } = useParams();

    useEffect(() => {
        const fetchConversation = async () => {
            try {
                const response = await getConversation(conversation_id);
                setConversation(response);
            } catch (error) {
                console.error("Error fetching conversation:", error);
            }
        };
        const fetchMessages = async () => {
            try {
                const response = await getConversationMessages(conversation_id);
                setMessages(response);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchConversation();
        fetchMessages();
    }, [conversation_id]);

    const participantNames = conversation?.participants?.map(user => user.name).join(", ");
    const firstAvatar = conversation?.participants?.[0].avatar;

    return (
        <div className="bgc-body chat chat-panel w-100">
            <div className="p-3 chat-header">
                <div className="d-flex">
                    <div className="w-100 d-flex pl-0">
                        <img
                            className="rounded-circle avatar-sm mr-3 chat-profile-picture"
                            src={firstAvatar}
                        />
                        <div className="mr-3 ps-2">
                            <a href="!#">
                                <p className="fw-400 mb-0">{participantNames}</p>
                            </a>
                            <p className="sub-caption text-lighter text-small mb-0">
                                <i className="la la-clock mr-1"></i>last seen today at 09:15
                                PM
                            </p>
                        </div>
                    </div>
                    <div className="flex-shrink-0 margin-auto">
                        <a
                            href="#"
                            className="btn ml-2"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                width="15"
                                height="15"
                                stroke="currentColor"
                                stroke-width="2"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                className="feather"
                            >
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="16" x2="12" y2="12"></line>
                                <line x1="12" y1="8" x2="12.01" y2="8"></line>
                            </svg>
                        </a>
                        <a
                            href="#"
                            className="btn ml-2"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                width="15"
                                height="15"
                                stroke="currentColor"
                                stroke-width="2"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                className="feather"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </a>
                        <a
                            href="#"
                            className="btn ml-2"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                width="15"
                                height="15"
                                stroke="currentColor"
                                stroke-width="2"
                                fill="none"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                className="feather"
                            >
                                <circle cx="12" cy="12" r="1"></circle>
                                <circle cx="12" cy="5" r="1"></circle>
                                <circle cx="12" cy="19" r="1"></circle>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-row navigation-mobile scrollable-chat-panel chat-panel-scroll">
                <div className="w-100 p-3">
                    {messages.map(message => (
                        <Message message={message} />
                    ))}
                </div>
            </div>
            <div className="chat-search px-3">
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Write a message"
                    />
                    <div className="input-group-append btn btn-primary px-2 d-flex align-items-center justify-content-center">
                        <Send />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Conversation;
