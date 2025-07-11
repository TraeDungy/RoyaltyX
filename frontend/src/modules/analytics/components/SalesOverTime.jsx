import { useSettings } from "../../common/contexts/SettingsContext";
import LineChart from "../../common/components/LineChart";
import { CHART_CONFIGS } from "../../common/config/chartConfig";

const SalesOverTime = ({ analytics }) => {
  const { setShowSalesOverTime, setSalesOverTimeGraphColor, salesOverTimeGraphColor } = useSettings();

  return (
    <LineChart
      analytics={analytics}
      title="Sales Over Time"
      metric="sales"
      color={salesOverTimeGraphColor}
      onColorChange={setSalesOverTimeGraphColor}
      onHide={() => setShowSalesOverTime(false)}
      customOptions={CHART_CONFIGS.standard}
    />
  );
};

export default SalesOverTime;
