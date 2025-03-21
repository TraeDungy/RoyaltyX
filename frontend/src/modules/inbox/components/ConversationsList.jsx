import { useEffect, useState } from "react";
import { getConversations } from "../api/conversation";
import { useLocation } from "react-router";

const ConversationsList = () => {

    const [conversations, setConversations] = useState([]);
    const location = useLocation();

    useEffect(() => {
        const fetctConversations = async () => {
            try {
                const response = await getConversations();
                setConversations(response);
            } catch (error) {
                console.error("Error fetching conversations:", error);
            }
        };

        fetctConversations();
    }, [location.search]);


    return (
        <div className="chat-user-panel px-3 pt-3">
            <div className="d-flex flex-column navigation-mobile pagination-scrool chat-user-scroll">
                {conversations.map(conversation => (
                    <div
                        key={conversation.id}
                        className="chat-item d-flex pl-3 pr-0 pt-3 pb-3">
                        <div className="w-100">
                            <div className="d-flex pl-0">
                                <img
                                    className="rounded-circle avatar-sm mr-3"
                                    src="https://user-images.githubusercontent.com/35243461/168796879-f8c5e585-15c0-49ff-94de-c70539ae434c.jpg"
                                />
                                <div className="ps-2">
                                    <p className="margin-auto fw-400">Tessa Nau</p>
                                    <div className="d-flex flex-row mt-1">
                                        <span>
                                            <div className="svg15 single-check"></div>
                                        </span>
                                        <span className="message-shortcut margin-auto txt-lighter fs-13 ml-1 mr-4">
                                            No that's everyhing, thanks again!{" "}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex-shrink-0 margin-auto pl-2 pr-3">
                            <div className="d-flex flex-column">
                                <p className="text-lighter text-right fs-13 mb-2">04:21</p>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default ConversationsList;
