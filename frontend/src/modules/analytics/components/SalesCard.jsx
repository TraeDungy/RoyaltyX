import { Link } from "react-router-dom";
import { SalesInLastFourMonthsChart } from "./SalesInLastFourMonthsChart";
import { InfoPopover } from "../../common/components/InfoPopover";

export const SalesCard = ({ analytics }) => {
  return (
    <div className="col-md-4 p-3">
      <div className="p-3 d-flex justify-content-center rounded flex-column w-100 h-100 border-custom-regular">
        <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="mb-2">Sales <InfoPopover text="Total number of sales during the selected period for the analytics" /> </h6>
        <Link to="/reports/create" className="btn btn-outline-secondary small">View report</Link>
        </div>
        <h1 className="bold mb-0 position-relative ps-3 mb-3">
          {analytics?.total_sales_count}
        </h1>

        <SalesInLastFourMonthsChart analytics={analytics} />
      </div>
    </div>
  );
};
