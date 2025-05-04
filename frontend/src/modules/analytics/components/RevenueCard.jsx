import { Link } from "react-router-dom";
import { RevenueInLastFourMonthsChart } from "./RevenueInLastFourMonthsChart";
import { InfoCircleFill } from "react-bootstrap-icons";

export const RevenueCard = ({ analytics }) => {
  return (
    <div className="col-md-4 p-3">
      <div className="p-3 d-flex justify-content-center rounded flex-column w-100 h-100 border-custom-regular">
        <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="mb-2">Revenue <InfoCircleFill /> </h6>
        <Link to="/reports/create" className="btn btn-outline-secondary small">View report</Link>
        </div>
        <h1 className="bold mb-0 position-relative ps-3 mb-3">
            <span className="txt-lighter h6" style={{ position: "absolute", top: 0, left: 0 }}>$</span>
          {analytics?.total_royalty_revenue?.toLocaleString()}
        </h1>

        <RevenueInLastFourMonthsChart analytics={analytics} />
      </div>
    </div>
  );
};
