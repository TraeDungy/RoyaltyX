import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getConversation, getConversationMessages, sendConversationMessage } from "../../api/conversation";
import Message from "../../components/Message";
import MessageInput from "../../components/MessageInput";
import { useAuth } from "../../../common/contexts/AuthContext";

const Conversation = () => {

    const [conversation, setConversation] = useState([]);
    const [messages, setMessages] = useState([]);

    const { conversation_id } = useParams();
    const { id } = useAuth();

    useEffect(() => {
        const fetchConversation = async () => {
            try {
                const response = await getConversation(conversation_id);
                setConversation(response);
            } catch (error) {
                console.error("Error fetching conversation:", error);
            }
        };

        fetchConversation();
    }, [conversation_id]);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await getConversationMessages(conversation_id);
                setMessages(response);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        fetchMessages();

        const interval = setInterval(fetchMessages, 8000);

        return () => clearInterval(interval);
    }, [conversation_id]);


    const onSendMessage = async (text) => {
        const tempId = Date.now();
        const newMessage = {
            id: tempId,
            text: text,
            sent_by: id,
            created_at: new Date().toISOString(),
        };

        setMessages((prevMessages) => [...prevMessages, newMessage]);

        try {
            const response = await sendConversationMessage(conversation_id, { text });

            setMessages((prevMessages) =>
                prevMessages.map((msg) =>
                    msg.id === tempId ? response : msg
                )
            );
        } catch (error) {
            setMessages((prevMessages) =>
                prevMessages.filter((msg) => msg.id !== tempId)
            );
            console.error("Failed to send message:", error);
        }
    };


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
                <div className="w-100 p-3" style={{ background: 'var(--color-light-gray)' }}>
                    {messages.map(message => (
                        <Message message={message} />
                    ))}
                </div>
            </div>
            <MessageInput onSendMessage={onSendMessage} />
        </div>
    );
}

export default Conversation;
