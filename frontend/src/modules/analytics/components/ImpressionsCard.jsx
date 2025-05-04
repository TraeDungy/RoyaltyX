import { Link } from "react-router-dom";
import { InfoCircleFill } from "react-bootstrap-icons";
import { ImpressionsInLastFourMonthsChart } from "./ImpressionsInLastFourMonthsChart";

export const ImpressionsCard = ({ analytics }) => {
  return (
    <div className="col-md-4 p-3">
      <div className="p-3 d-flex justify-content-center rounded flex-column w-100 h-100 border-custom-regular">
        <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="mb-2">Impressions <InfoCircleFill /> </h6>
        <Link to="/reports/create" className="btn btn-outline-secondary small">View report</Link>
        </div>
        <h1 className="bold mb-0 position-relative ps-3 mb-3">
          {analytics?.total_impressions.toLocaleString()}
        </h1>

        <ImpressionsInLastFourMonthsChart analytics={analytics} />
      </div>
    </div>
  );
};
