import { SalesChart } from "./SalesChart";
import { InfoPopover } from "../../common/components/InfoPopover";
import { useState } from "react";
import { EyeSlash, Palette } from "react-bootstrap-icons";
import { useSettings } from "../../common/contexts/SettingsContext";
import { GraphColorPalette } from "./GraphColorPalette";
import { IconButton } from "@mui/material";
import { EllipsisVertical } from "lucide-react";
export const SalesCard = ({ analytics }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { setShowTotalSalesCard } = useSettings();
  const [showGraphColorPalette, setShowGraphColorPalette] = useState(false);
  const { setsalesGraphColor } = useSettings();
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const onSelectColor = (color) => {
    setsalesGraphColor(color);
  };

  return (
    <>
      <div className="col-md-4 p-3">
        <div className="p-3 d-flex justify-content-center rounded flex-column w-100 h-100 border-custom-regular">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <h6 className="mb-2">
              Sales
              <InfoPopover
                title="Sales over time"
                text="Total number of sales during the selected period for the analytics"
              />
            </h6>
            <div className="d-flex align-items-center">
              <div className="dropdown">
                <IconButton onClick={toggleDropdown}>
                  <EllipsisVertical size={20} color="var(--color-text)" />
                </IconButton>
                {dropdownVisible && (
                  <div className="dropdown-menu shadow-sm show">
                    <button
                      className="dropdown-item py-2"
                      onClick={() => {
                        setShowTotalSalesCard(false);
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
            {analytics?.total_sales_count}
          </h1>

          <SalesChart analytics={analytics} />
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
