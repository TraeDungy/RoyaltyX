import { truncateString } from "../../common/utils/format_utils";
import { CheckCircleFill } from "react-bootstrap-icons";

const UserCard = ({ user, isSelected, toggleUserSelection }) => {
    return (
        <div className='col-md-3 p-3' onClick={() => toggleUserSelection(user.id)} style={{ cursor: "pointer" }}>
            <div className={`btn-hover py-2 px-1 position-relative`}>
                <div className="d-flex justify-content-center position-relative">
                    <img
                        src={user.avatar}
                        className="rounded mb-1"
                        style={{ width: 40, height: 40, objectFit: "cover" }}
                        alt=""
                    />
                    {isSelected && (
                        <CheckCircleFill className="position-absolute top-0 end-0 text-primary" size={20} />
                    )}
                </div>
                <div className="d-flex flex-column">
                    <span className="medium fw-500 text-center" style={{ color: "var(--color-text)" }}>
                        {user.name}
                    </span>
                    <span className="small txt-lighter text-center">{truncateString(user.email, 20)}</span>
                </div>
            </div>
        </div>
    );
};

export default UserCard;
