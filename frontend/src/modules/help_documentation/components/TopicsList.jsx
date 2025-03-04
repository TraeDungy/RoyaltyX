const TopicsList = () => {
    return (
        <>
            <h4 className="bold mb-4">Topics</h4>
            <ul>
                <li className="py-2">
                    <a href="/documentation/report-upload"
                        className="h5 mb-0 fw-400 txt-primary">
                        Report Upload
                    </a>
                </li>
                <li className="py-2">
                    <a href="/documentation/producer-upload"
                        className="h5 mb-0 fw-400 txt-primary">
                        Producer Upload
                    </a>
                </li>
                <li className="py-2">
                    <a href="/documentation/products-list-view"
                        className="h5 mb-0 fw-400 txt-primary">
                        Products List View
                    </a>
                </li>
                <li className="py-2">
                    <a href="/documentation/messaging"
                        className="h5 mb-0 fw-400 txt-primary">
                        Messaging
                    </a>
                </li>
            </ul>
        </>

    );
}

export default TopicsList;
