import { useEffect, useState } from "react";
import { getTaskStatus } from "../api/tasks";

const TaskProgress = ({ taskId }) => {
  const [progress, setProgress] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!taskId) return;

    const interval = setInterval(async () => {
      try {
        const data = await getTaskStatus(taskId);
        setProgress(data.progress);
        setMessage(data.message);
        if (data.progress >= 100) {
          clearInterval(interval);
        }
      } catch (err) {
        console.error(err);
        clearInterval(interval);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [taskId]);

  if (progress === null) {
    return null;
  }

  return (
    <div className="w-100 mt-3">
      <div className="progress">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${progress}%` }}
          aria-valuenow={progress}
          aria-valuemin="0"
          aria-valuemax="100"
        >
          {progress}%
        </div>
      </div>
      {message && <p className="small mt-1">{message}</p>}
    </div>
  );
};

export default TaskProgress;
