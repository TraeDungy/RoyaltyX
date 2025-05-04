import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import DateRangeSelector from "../../common/components/DateRangeSelector";
import { createReport } from "../api/reports";
import { toast } from "react-toastify";
import Button from "../../common/components/Button";

const CreateNewReport = () => {
  var periodStart = "";
  var periodEnd = "";

  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);

  useEffect(() => {
    periodStart = params.get("period_start");
    periodEnd = params.get("period_end");
  }, [location.search]);

  const handleCreateReport = async () => {
    const period_range = {
      period_start: periodStart,
      period_end: periodEnd,
    };

    try {
      await createReport(period_range);
      navigate("/reports");
      toast.success("Successfully generated a new report!");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mt-4 mb-3 ps-1">
        <h2 className="bold">Generate report</h2>
        <DateRangeSelector />
      </div>

      <p className="mb-4">
        Before submitting this request, make sure to select the time range for
        which the details in the report should apply. If you don't select any
        time range, then the details in the report will be based on data from
        all time.
      </p>

      <Button
        onClick={() => {
          handleCreateReport();
        }}
      >
        Submit Request
      </Button>
    </>
  );
};

export default CreateNewReport;
