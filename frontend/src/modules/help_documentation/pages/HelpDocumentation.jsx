import { InfoCircleFill } from "react-bootstrap-icons";
import TopicsList from "../components/TopicsList";

const HelpDocumentation = () => {
    return (
        <div className="pb-5">
            <h1 className="bold">Help Documentation</h1>
            <div className="alert alert-primary my-5 d-flex align-items-center">
                <div className="pe-3">
                    <InfoCircleFill className="h5" />
                </div>
                This page will contain multiple topics all containing instructions and rules on how to use particular features as a project owner. As we make updates to the project, including how different features are used, we will also make sure to keep this page up to date and provide support in case project owners experience any issues.
            </div>

            <TopicsList />

        </div>
    );
}

export default HelpDocumentation;
