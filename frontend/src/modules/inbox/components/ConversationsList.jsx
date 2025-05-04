import { useEffect, useState } from "react";
import { getConversations } from "../api/conversation";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";

const ConversationsList = () => {
  const [conversations, setConversations] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await getConversations();
        setConversations(response);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, [location]);

  return (
    <div className="chat-user-panel px-3 pt-3">
      <div className="d-flex flex-column navigation-mobile pagination-scrool chat-user-scroll">
        {conversations.map((conversation) => {
          const participantNames = conversation.participants
            .map((user) => user.name)
            .join(", ");
          const firstAvatar =
            conversation.participants.length > 0
              ? conversation.participants[0].avatar
              : "default-avatar.jpg";
          return (
            <Link
              key={conversation.id}
              to={`/inbox/${conversation.id}`}
              className="chat-item pointer px-1 d-flex pl-3 pr-0 pt-3 pb-3"
            >
              <div className="w-100">
                <div className="d-flex pl-0">
                  <img
                    className="rounded-circle avatar-sm mr-3"
                    src={firstAvatar}
                  />
                  <div className="ps-2">
                    <p className="margin-auto fw-400">{participantNames}</p>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0 margin-auto pl-2 pr-3">
                <div className="d-flex flex-column">
                  <p className="text-lighter text-right fs-13 mb-2">04:21</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ConversationsList;
