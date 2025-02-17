import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../../common/components/Button";
import styles from "./ResetPassword.module.css";
import { resetPassword } from "../../api/auth";

export default function ResetPassword() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());

    const { success, message } = await resetPassword(data);
    if (success) {
      toast.success("Password changed successfully!");
      navigate("/");
    } else {
      setError(message);
    }

    setLoading(false);
  };

  return (
    <div className={styles.resetPasswordPageWrapper}>
      <div style={{ maxWidth: 470 }} className="w-100">
        <h2 className="mb-4 bold">Reset Password</h2>
        {error && <span className="text-danger small">{error}</span>} {}
        <form onSubmit={handleSubmit}>
          <div className="py-2">
            <label className="mb-1">
              Current Password <span className="text-danger">*</span>
            </label>
            <input
              type="password"
              name="current_password"
              className="form-control py-3"
              placeholder="••••••••"
            />
          </div>
          <div className="py-2">
            <label className="mb-1">
              New Password <span className="text-danger">*</span>
            </label>
            <input
              type="password"
              name="new_password"
              className="form-control py-3"
              placeholder="••••••••"
            />
          </div>
          <div className="py-2">
            <label className="mb-1">
              New Password <span className="text-danger">*</span>
            </label>
            <input
              type="password"
              name="confirm_password"
              className="form-control py-3"
              placeholder="••••••••"
            />
          </div>

          <div className="py-2 mt-3">
            <Button variant="primary" size="lg" type="submit" loading={loading}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
