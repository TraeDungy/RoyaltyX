import { RevenueInLastFourMonthsChart } from "./RevenueInLastFourMonthsChart";
import { InfoPopover } from "../../common/components/InfoPopover";
import { useState } from "react";
import { EyeSlash, Palette, ThreeDotsVertical } from "react-bootstrap-icons";
import { useSettings } from "../../common/contexts/SettingsContext";
import { GraphColorPalette } from "./GraphColorPalette";

export const RevenueCard = ({ analytics }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { setShowTotalRevenueCard } = useSettings();
  const [showGraphColorPalette, setShowGraphColorPalette] = useState(false);
  const { setRevenueOverFourMonthsGraphColor } = useSettings();
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const onSelectColor = (color) => {
    setRevenueOverFourMonthsGraphColor(color);
  };

  return (
    <>
      <div className="col-md-4 p-3">
        <div className="p-3 d-flex justify-content-center rounded flex-column w-100 h-100 border-custom-regular">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6 className="mb-2">
              Revenue
              <InfoPopover
                title="Monthly revenue"
                text="This stat represents the total royalty revenue generated over the last month."
              />
            </h6>
            <div className="d-flex align-items-center">
              <div className="dropdown">
                <button className="btn btn-basic" onClick={toggleDropdown}>
                  <ThreeDotsVertical className="txt-regular" />
                </button>
                {dropdownVisible && (
                  <div className="dropdown-menu shadow-sm dropdown-menu-end show">
                    <button
                      className="dropdown-item py-2"
                      onClick={() => {
                        setShowTotalRevenueCard(false);
                        setDropdownVisible(false);
                      }}
                    >
                      Hide <EyeSlash className="ms-1" />
                    </button>
                    <button
                      className="dropdown-item py-2"
                      onClick={() => {
                        setShowGraphColorPalette(true);
                        setDropdownVisible(false);
                      }}
                    >
                      Customize color <Palette className="ms-2" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <h1 className="bold mb-0 position-relative ps-3 mb-3">
            <span
              className="txt-lighter h6"
              style={{ position: "absolute", top: 0, left: 0 }}
            >
              $
            </span>
            {analytics?.total_royalty_revenue?.toLocaleString()}
          </h1>

          <RevenueInLastFourMonthsChart analytics={analytics} />
        </div>
      </div>
      <GraphColorPalette
        showGraphColorPalette={showGraphColorPalette}
        setShowGraphColorPalette={setShowGraphColorPalette}
        onSelectColor={onSelectColor}
      />
    </>
  );
};
