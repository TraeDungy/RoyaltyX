import { createContext, useContext, useEffect, useState } from "react";
import {
  getDashboardPreferences,
  saveDashboardPreferences,
} from "../../analytics/api/dashboardPreferences";

const defaultAnalyticsOrder = ["impressions", "sales", "revenue", "clock"];

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [showSalesOverTime, setShowSalesOverTime] = useState(() => {
    const savedShowSalesOverTimePreference =
      localStorage.getItem("showSalesOverTime");
    return savedShowSalesOverTimePreference !== null
      ? savedShowSalesOverTimePreference === "true"
      : true;
  });

  const [showRentalsOverTime, setShowRentalsOverTime] = useState(() => {
    const savedShowRentalsOverTimePreference = localStorage.getItem(
      "showRentalsOverTime",
    );
    return savedShowRentalsOverTimePreference !== null
      ? savedShowRentalsOverTimePreference === "true"
      : true;
  });

  const [showImpressionsOverTime, setShowImpressionsOverTime] = useState(() => {
    const savedShowImpressionsOverTimePreference = localStorage.getItem(
      "showImpressionsOverTime",
    );
    return savedShowImpressionsOverTimePreference !== null
      ? savedShowImpressionsOverTimePreference === "true"
      : true;
  });

  const [showImpressionRevenueOverTime, setShowImpressionRevenueOverTime] =
    useState(() => {
      const savedShowImpressionRevenueOverTimePreference = localStorage.getItem(
        "showImpressionRevenueOverTime",
      );
      return savedShowImpressionRevenueOverTimePreference !== null
        ? savedShowImpressionRevenueOverTimePreference === "true"
        : true;
    });

  const [showTotalImpressionsCard, setShowTotalImpressionsCard] = useState(
    () => {
      const savedShowTotalImpressionsCardPreference = localStorage.getItem(
        "showTotalImpressionsCard",
      );
      return savedShowTotalImpressionsCardPreference !== null
        ? savedShowTotalImpressionsCardPreference === "true"
        : true;
    },
  );

  const [showTotalSalesCard, setShowTotalSalesCard] = useState(() => {
    const savedShowTotalSalesCardPreference =
      localStorage.getItem("showTotalSalesCard");
    return savedShowTotalSalesCardPreference !== null
      ? savedShowTotalSalesCardPreference === "true"
      : true;
  });

  const [showTotalRevenueCard, setShowTotalRevenueCard] = useState(() => {
    const savedShowTotalRevenueCardPreference = localStorage.getItem(
      "showTotalRevenueCard",
    );
    return savedShowTotalRevenueCardPreference !== null
      ? savedShowTotalRevenueCardPreference === "true"
      : true;
  });

  const [showClockCard, setShowClockCard] = useState(() => {
    const saved = localStorage.getItem("showClockCard");
    return saved !== null ? saved === "true" : true;
  });

  const [showBanner, setShowBanner] = useState(() => {
    const saved = localStorage.getItem("showBanner");
    return saved !== null ? saved === "true" : true;
  });

  const convertCountdownToMs = (value, unit) => {
    const hour = 60 * 60 * 1000;
    switch (unit) {
      case "years":
        return value * 365 * 24 * hour;
      case "months":
        return value * 30 * 24 * hour;
      case "weeks":
        return value * 7 * 24 * hour;
      case "days":
        return value * 24 * hour;
      default:
        return value * hour; // hours
    }
  };

  const initialCountdownValue = () => {
    const v = localStorage.getItem("countdownValue");
    return v !== null ? Number(v) : 1;
  };

  const initialCountdownUnit = () =>
    localStorage.getItem("countdownUnit") || "days";

  const initialCountdownTarget = () => {
    const saved = localStorage.getItem("countdownTargetTime");
    if (saved) return new Date(saved);
    return new Date(
      Date.now() + convertCountdownToMs(initialCountdownValue(), initialCountdownUnit()),
    );
  };

  const [countdownValue, setCountdownValue] = useState(initialCountdownValue);
  const [countdownUnit, setCountdownUnit] = useState(initialCountdownUnit);
  const [countdownTargetTime, setCountdownTargetTime] = useState(initialCountdownTarget);

  const [showProductImageCard, setShowProductImageCard] = useState(() => {
    const saved = localStorage.getItem("showProductImageCard");
    return saved !== null ? saved === "true" : true;
  });

  const [showAverageEcpmCard, setShowAverageEcpmCard] = useState(() => {
    const saved = localStorage.getItem("showAverageEcpmCard");
    return saved !== null ? saved === "true" : true;
  });

  const [showRoyaltyPerSaleCard, setShowRoyaltyPerSaleCard] = useState(() => {
    const saved = localStorage.getItem("showRoyaltyPerSaleCard");
    return saved !== null ? saved === "true" : true;
  });

  const [showImpressionsPerProductCard, setShowImpressionsPerProductCard] = useState(() => {
    const saved = localStorage.getItem("showImpressionsPerProductCard");
    return saved !== null ? saved === "true" : true;
  });

  const [dashboardAnalyticsOrder, setDashboardAnalyticsOrder] = useState(() => {
    const savedOrder = localStorage.getItem("dashboardAnalyticsOrder");
    return savedOrder ? JSON.parse(savedOrder) : defaultAnalyticsOrder;
  });

  const [preferencesLoaded, setPreferencesLoaded] = useState(false);

  const resetDashboardAnalyticsOrder = () => {
    setDashboardAnalyticsOrder(defaultAnalyticsOrder);
  };

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getDashboardPreferences();
        if (data.dashboardAnalyticsOrder) {
          setDashboardAnalyticsOrder(data.dashboardAnalyticsOrder);
        }
        if (data.colorSettings) {
          const colors = data.colorSettings;
          if (colors.impressionsGraphColor) setimpressionsGraphColor(colors.impressionsGraphColor);
          if (colors.salesGraphColor) setsalesGraphColor(colors.salesGraphColor);
          if (colors.revenueGraphColor) setrevenueGraphColor(colors.revenueGraphColor);
          if (colors.impressionsOverTimeGraphColor)
            setImpressionsOverTimeGraphColor(colors.impressionsOverTimeGraphColor);
          if (colors.salesOverTimeGraphColor) setSalesOverTimeGraphColor(colors.salesOverTimeGraphColor);
          if (colors.rentalsOverTimeGraphColor) setRentalsOverTimeGraphColor(colors.rentalsOverTimeGraphColor);
          if (colors.impressionRevenueOverTimeGraphColor)
            setImpressionRevenueOverTimeGraphColor(colors.impressionRevenueOverTimeGraphColor);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setPreferencesLoaded(true);
      }
    };
    load();
  }, []);

  const [
    impressionsGraphColor,
    setimpressionsGraphColor,
  ] = useState(() => {
    const savedimpressionsGraphColor = localStorage.getItem(
      "impressionsGraphColor",
    );
    return savedimpressionsGraphColor !== null
      ? savedimpressionsGraphColor
      : "#009efd";
  });

  const [salesGraphColor, setsalesGraphColor] =
    useState(() => {
      const savedsalesGraphColor = localStorage.getItem(
        "salesGraphColor",
      );
      return savedsalesGraphColor !== null
        ? savedsalesGraphColor
        : "#009efd";
    });

  const [impressionsGraphType, setImpressionsGraphType] = useState(() => {
    const saved = localStorage.getItem("impressionsGraphType");
    return saved || "line";
  });

  const [salesGraphType, setSalesGraphType] = useState(() => {
    const saved = localStorage.getItem("salesGraphType");
    return saved || "line";
  });

  const [revenueGraphType, setRevenueGraphType] = useState(() => {
    const saved = localStorage.getItem("revenueGraphType");
    return saved || "line";
  });

  const [impressionsValueFormat, setImpressionsValueFormat] = useState(() => {
    const saved = localStorage.getItem("impressionsValueFormat");
    return saved || "number";
  });

  const [salesValueFormat, setSalesValueFormat] = useState(() => {
    const saved = localStorage.getItem("salesValueFormat");
    return saved || "number";
  });

  const [revenueValueFormat, setRevenueValueFormat] = useState(() => {
    const saved = localStorage.getItem("revenueValueFormat");
    return saved || "currency";
  });

  const [revenueGraphColor, setrevenueGraphColor] =
    useState(() => {
      const savedrevenueGraphColor = localStorage.getItem(
        "revenueGraphColor",
      );
      return savedrevenueGraphColor !== null
        ? savedrevenueGraphColor
        : "#009efd";
    });

  const [salesOverTimeGraphColor, setSalesOverTimeGraphColor] = useState(() => {
    const savedSalesOverTimeGraphColor = localStorage.getItem(
      "salesOverTimeGraphColor",
    );
    return savedSalesOverTimeGraphColor !== null
      ? savedSalesOverTimeGraphColor
      : "#009efd";
  });

  const [rentalsOverTimeGraphColor, setRentalsOverTimeGraphColor] = useState(
    () => {
      const savedRentalsOverTimeGraphColor = localStorage.getItem(
        "rentalsOverTimeGraphColor",
      );
      return savedRentalsOverTimeGraphColor !== null
        ? savedRentalsOverTimeGraphColor
        : "#009efd";
    },
  );

  const [impressionsOverTimeGraphColor, setImpressionsOverTimeGraphColor] =
    useState(() => {
      const savedImpressionsOverTimeGraphColor = localStorage.getItem(
        "impressionsOverTimeGraphColor",
      );
      return savedImpressionsOverTimeGraphColor !== null
        ? savedImpressionsOverTimeGraphColor
        : "#009efd";
    });

  const [
    impressionRevenueOverTimeGraphColor,
    setImpressionRevenueOverTimeGraphColor,
  ] = useState(() => {
    const savedImpressionRevenueOverTimeGraphColor = localStorage.getItem(
      "impressionRevenueOverTimeGraphColor",
    );
    return savedImpressionRevenueOverTimeGraphColor !== null
      ? savedImpressionRevenueOverTimeGraphColor
      : "#009efd";
  });

  useEffect(() => {
    localStorage.setItem("showSalesOverTime", showSalesOverTime.toString());
  }, [showSalesOverTime]);

  useEffect(() => {
    localStorage.setItem("showRentalsOverTime", showRentalsOverTime.toString());
  }, [showRentalsOverTime]);

  useEffect(() => {
    localStorage.setItem(
      "showImpressionsOverTime",
      showImpressionsOverTime.toString(),
    );
  }, [showImpressionsOverTime]);

  useEffect(() => {
    localStorage.setItem(
      "showImpressionRevenueOverTime",
      showImpressionRevenueOverTime.toString(),
    );
  }, [showImpressionRevenueOverTime]);

  useEffect(() => {
    localStorage.setItem(
      "showTotalImpressionsCard",
      showTotalImpressionsCard.toString(),
    );
  }, [showTotalImpressionsCard]);

  useEffect(() => {
    localStorage.setItem("showTotalSalesCard", showTotalSalesCard.toString());
  }, [showTotalSalesCard]);

  useEffect(() => {
    localStorage.setItem(
      "showTotalRevenueCard",
      showTotalRevenueCard.toString(),
    );
  }, [showTotalRevenueCard]);

  useEffect(() => {
    localStorage.setItem(
      "showProductImageCard",
      showProductImageCard.toString(),
    );
  }, [showProductImageCard]);

  useEffect(() => {
    localStorage.setItem("showClockCard", showClockCard.toString());
  }, [showClockCard]);

  useEffect(() => {
    localStorage.setItem("showBanner", showBanner.toString());
  }, [showBanner]);

  useEffect(() => {
    localStorage.setItem("countdownValue", countdownValue.toString());
  }, [countdownValue]);

  useEffect(() => {
    localStorage.setItem("countdownUnit", countdownUnit);
  }, [countdownUnit]);

  useEffect(() => {
    const target = new Date(
      Date.now() + convertCountdownToMs(countdownValue, countdownUnit),
    );
    setCountdownTargetTime(target);
  }, [countdownValue, countdownUnit]);

  useEffect(() => {
    localStorage.setItem(
      "countdownTargetTime",
      countdownTargetTime.toISOString(),
    );
  }, [countdownTargetTime]);

  useEffect(() => {
    localStorage.setItem(
      "showAverageEcpmCard",
      showAverageEcpmCard.toString(),
    );
  }, [showAverageEcpmCard]);

  useEffect(() => {
    localStorage.setItem(
      "showRoyaltyPerSaleCard",
      showRoyaltyPerSaleCard.toString(),
    );
  }, [showRoyaltyPerSaleCard]);

  useEffect(() => {
    localStorage.setItem(
      "showImpressionsPerProductCard",
      showImpressionsPerProductCard.toString(),
    );
  }, [showImpressionsPerProductCard]);

  useEffect(() => {
    localStorage.setItem(
      "impressionsGraphColor",
      impressionsGraphColor,
    );
  }, [impressionsGraphColor]);

  useEffect(() => {
    localStorage.setItem(
      "salesGraphColor",
      salesGraphColor,
    );
  }, [salesGraphColor]);

  useEffect(() => {
    localStorage.setItem("impressionsGraphType", impressionsGraphType);
  }, [impressionsGraphType]);

  useEffect(() => {
    localStorage.setItem("salesGraphType", salesGraphType);
  }, [salesGraphType]);

  useEffect(() => {
    localStorage.setItem("revenueGraphType", revenueGraphType);
  }, [revenueGraphType]);

  useEffect(() => {
    localStorage.setItem("impressionsValueFormat", impressionsValueFormat);
  }, [impressionsValueFormat]);

  useEffect(() => {
    localStorage.setItem("salesValueFormat", salesValueFormat);
  }, [salesValueFormat]);

  useEffect(() => {
    localStorage.setItem("revenueValueFormat", revenueValueFormat);
  }, [revenueValueFormat]);

  useEffect(() => {
    localStorage.setItem(
      "revenueGraphColor",
      revenueGraphColor,
    );
  }, [revenueGraphColor]);

  useEffect(() => {
    localStorage.setItem(
      "impressionsOverTimeGraphColor",
      impressionsOverTimeGraphColor,
    );
  }, [impressionsOverTimeGraphColor]);

  useEffect(() => {
    localStorage.setItem("salesOverTimeGraphColor", salesOverTimeGraphColor);
  }, [salesOverTimeGraphColor]);

  useEffect(() => {
    localStorage.setItem(
      "rentalsOverTimeGraphColor",
      rentalsOverTimeGraphColor,
    );
  }, [rentalsOverTimeGraphColor]);

  useEffect(() => {
    localStorage.setItem(
      "impressionRevenueOverTimeGraphColor",
      impressionRevenueOverTimeGraphColor,
    );
  }, [impressionRevenueOverTimeGraphColor]);

  useEffect(() => {
    localStorage.setItem(
      "dashboardAnalyticsOrder",
      JSON.stringify(dashboardAnalyticsOrder),
    );
  }, [dashboardAnalyticsOrder]);

  useEffect(() => {
    if (!preferencesLoaded) return;
    const payload = {
      dashboardAnalyticsOrder,
      colorSettings: {
        impressionsGraphColor,
        salesGraphColor,
        revenueGraphColor,
        impressionsOverTimeGraphColor,
        salesOverTimeGraphColor,
        rentalsOverTimeGraphColor,
        impressionRevenueOverTimeGraphColor,
      },
    };
    saveDashboardPreferences(payload).catch(() => {});
  }, [
    preferencesLoaded,
    dashboardAnalyticsOrder,
    impressionsGraphColor,
    salesGraphColor,
    revenueGraphColor,
    impressionsOverTimeGraphColor,
    salesOverTimeGraphColor,
    rentalsOverTimeGraphColor,
    impressionRevenueOverTimeGraphColor,
  ]);

  return (
    <SettingsContext.Provider
      value={{
        showSalesOverTime,
        setShowSalesOverTime,
        showRentalsOverTime,
        setShowRentalsOverTime,
        showImpressionsOverTime,
        setShowImpressionsOverTime,
        showImpressionRevenueOverTime,
        setShowImpressionRevenueOverTime,
        showTotalImpressionsCard,
        setShowTotalImpressionsCard,
        showTotalSalesCard,
        setShowTotalSalesCard,
        showTotalRevenueCard,
        setShowTotalRevenueCard,
        showClockCard,
        setShowClockCard,
        showBanner,
        setShowBanner,
        countdownValue,
        setCountdownValue,
        countdownUnit,
        setCountdownUnit,
        countdownTargetTime,
        setCountdownTargetTime,
        showProductImageCard,
        setShowProductImageCard,
        showAverageEcpmCard,
        setShowAverageEcpmCard,
        showRoyaltyPerSaleCard,
        setShowRoyaltyPerSaleCard,
        showImpressionsPerProductCard,
        setShowImpressionsPerProductCard,
        impressionsGraphColor,
        setimpressionsGraphColor,
        impressionsGraphType,
        setImpressionsGraphType,
        impressionsValueFormat,
        setImpressionsValueFormat,
        salesGraphColor,
        setsalesGraphColor,
        salesGraphType,
        setSalesGraphType,
        salesValueFormat,
        setSalesValueFormat,
        revenueGraphColor,
        setrevenueGraphColor,
        revenueGraphType,
        setRevenueGraphType,
        revenueValueFormat,
        setRevenueValueFormat,
        salesOverTimeGraphColor,
        setSalesOverTimeGraphColor,
        rentalsOverTimeGraphColor,
        setRentalsOverTimeGraphColor,
        impressionsOverTimeGraphColor,
        setImpressionsOverTimeGraphColor,
        impressionRevenueOverTimeGraphColor,
        setImpressionRevenueOverTimeGraphColor,
        dashboardAnalyticsOrder,
        setDashboardAnalyticsOrder,
        resetDashboardAnalyticsOrder,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
