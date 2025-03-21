import Conversation from "./pages/Conversation/Conversation";
import Inbox from "./pages/inbox/Inbox";

const inboxRoutes = [
  {
    path: "inbox",
    element: <Inbox />,
  },
  {
    path: "inbox/:conversation_id",
    element: <Conversation />,
  },
];

export default inboxRoutes;
