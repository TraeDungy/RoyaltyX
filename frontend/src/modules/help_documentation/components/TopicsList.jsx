import { Link } from "react-router-dom";

const TopicsList = () => {
    return (
        <>
            <h4 className="bold mb-4">Topics</h4>
            <ul>
                <li className="py-2">
                    <Link to="/documentation/data-upload"
                        className="h5 mb-0 fw-400 txt-primary">
                        Data Upload
                    </Link>
                </li>
                <li className="py-2">
                    <Link to="/documentation/producer-upload"
                        className="h5 mb-0 fw-400 txt-primary">
                        Producer Upload
                    </Link>
                </li>
                <li className="py-2">
                    <Link to="/documentation/products-list-view"
                        className="h5 mb-0 fw-400 txt-primary">
                        Products List View
                    </Link>
                </li>
                <li className="py-2">
                    <Link to="/documentation/report-generation"
                        className="h5 mb-0 fw-400 txt-primary">
                        Report Generation
                    </Link>
                </li>
                <li className="py-2">
                    <Link to="/documentation/messaging"
                        className="h5 mb-0 fw-400 txt-primary">
                        Messaging
                    </Link>
                </li>
            </ul>
        </>

    );
}

export default TopicsList;
