import { Outlet } from "react-router-dom";
import ConversationsList from "../components/ConversationsList";
import CreateNewConversation from "../components/CreateNewConversation";

function InboxLayout() {
  return (
    <div className="main-wrapper">
      <div className="page-content">
        <div className="row m-0">
          <div className="col-md-3 col-12 card-stacked shadow-sm">
            <div className="bgc-body chat px-0 pt-4 w-100">
              <div className="text-center">
                <CreateNewConversation />
              </div>
              <ConversationsList />
            </div>
          </div>
          <div className="col-md-9 col-12 card-stacked">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InboxLayout;
