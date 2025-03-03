import { ExclamationTriangleFill } from 'react-bootstrap-icons';

const Messaging = () => {
    return (
        <div>

            <h4 className="bold mb-3">Messaging</h4>

            <div className="alert alert-warning my-5 d-flex align-items-center">
                <div className="pe-3">
                    <ExclamationTriangleFill className="h5" />
                </div>
                This feature is currently in development. It is in a mockup stage, so you can view the UI elements but not actually use any functionality yet.
            </div>
        </div>
    );
}

export default Messaging;
