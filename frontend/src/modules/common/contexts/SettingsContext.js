import { createContext, useContext, useEffect, useState } from "react";

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

  const [
    impressionsOverFourMonthsGraphColor,
    setImpressionsOverFourMonthsGraphColor,
  ] = useState(() => {
    const savedImpressionsOverFourMonthsGraphColor = localStorage.getItem(
      "impressionsOverFourMonthsGraphColor",
    );
    return savedImpressionsOverFourMonthsGraphColor !== null
      ? savedImpressionsOverFourMonthsGraphColor
      : "#009efd";
  });

  const [salesOverFourMonthsGraphColor, setSalesOverFourMonthsGraphColor] =
    useState(() => {
      const savedSalesOverFourMonthsGraphColor = localStorage.getItem(
        "salesOverFourMonthsGraphColor",
      );
      return savedSalesOverFourMonthsGraphColor !== null
        ? savedSalesOverFourMonthsGraphColor
        : "#009efd";
    });

  const [revenueOverFourMonthsGraphColor, setRevenueOverFourMonthsGraphColor] =
    useState(() => {
      const savedRevenueOverFourMonthsGraphColor = localStorage.getItem(
        "revenueOverFourMonthsGraphColor",
      );
      return savedRevenueOverFourMonthsGraphColor !== null
        ? savedRevenueOverFourMonthsGraphColor
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
      "impressionsOverFourMonthsGraphColor",
      impressionsOverFourMonthsGraphColor,
    );
  }, [impressionsOverFourMonthsGraphColor]);

  useEffect(() => {
    localStorage.setItem(
      "salesOverFourMonthsGraphColor",
      salesOverFourMonthsGraphColor,
    );
  }, [salesOverFourMonthsGraphColor]);

  useEffect(() => {
    localStorage.setItem(
      "revenueOverFourMonthsGraphColor",
      revenueOverFourMonthsGraphColor,
    );
  }, [revenueOverFourMonthsGraphColor]);

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
      "impressionsOverTimeGraphColor",
      impressionsOverTimeGraphColor,
    );
  }, [impressionsOverTimeGraphColor]);

  useEffect(() => {
    localStorage.setItem(
      "impressionRevenueOverTimeGraphColor",
      impressionRevenueOverTimeGraphColor,
    );
  }, [impressionRevenueOverTimeGraphColor]);

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
        impressionsOverFourMonthsGraphColor,
        setImpressionsOverFourMonthsGraphColor,
        salesOverFourMonthsGraphColor,
        setSalesOverFourMonthsGraphColor,
        revenueOverFourMonthsGraphColor,
        setRevenueOverFourMonthsGraphColor,
        salesOverTimeGraphColor,
        setSalesOverTimeGraphColor,
        rentalsOverTimeGraphColor,
        setRentalsOverTimeGraphColor,
        impressionsOverTimeGraphColor,
        setImpressionsOverTimeGraphColor,
        impressionRevenueOverTimeGraphColor,
        setImpressionRevenueOverTimeGraphColor,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
