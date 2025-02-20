import { useState, useEffect } from "react";
import { getUserInfo } from "../api/user";

function Account() {
  const [userInfo, setUserInfo] = useState([]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const fetchedUserInfo = await getUserInfo();
        setUserInfo(fetchedUserInfo);
      } catch (error) {
        console.error("Error fetching :", error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div className="container p-5">
      <h2 className="bold mb-4">Account</h2>

      <p className="txt-lighter">Name: {userInfo.name}</p>
      <p className="txt-lighter">Email: {userInfo.email}</p>
      <p className="txt-lighter">Profile Created At: {userInfo.created_at}</p>
      <p className="txt-lighter">
        Email Verified:{" "}
        <span className="badge bagde-primary bg-danger">No</span>
      </p>
      <p className="txt-lighter m-0">
        Role:{" "}
        <span className="badge bagde-primary bgc-success">
          {userInfo.role ? userInfo.role.name : ""}
        </span>
      </p>
    </div>
  );
}

export default Account;
