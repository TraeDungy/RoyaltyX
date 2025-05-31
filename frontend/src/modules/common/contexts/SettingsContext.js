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
      "showRentalsOverTime"
    );
    return savedShowRentalsOverTimePreference !== null
      ? savedShowRentalsOverTimePreference === "true"
      : true;
  });

  const [showImpressionsOverTime, setShowImpressionsOverTime] = useState(() => {
    const savedShowImpressionsOverTimePreference = localStorage.getItem(
      "showImpressionsOverTime"
    );
    return savedShowImpressionsOverTimePreference !== null
      ? savedShowImpressionsOverTimePreference === "true"
      : true;
  });

  const [showImpressionRevenueOverTime, setShowImpressionRevenueOverTime] =
    useState(() => {
      const savedShowImpressionRevenueOverTimePreference = localStorage.getItem(
        "showImpressionRevenueOverTime"
      );
      return savedShowImpressionRevenueOverTimePreference !== null
        ? savedShowImpressionRevenueOverTimePreference === "true"
        : true;
    });

  const [showTotalImpressionsCard, setShowTotalImpressionsCard] = useState(
    () => {
      const savedShowTotalImpressionsCardPreference = localStorage.getItem(
        "showTotalImpressionsCard"
      );
      return savedShowTotalImpressionsCardPreference !== null
        ? savedShowTotalImpressionsCardPreference === "true"
        : true;
    }
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
      "showTotalRevenueCard"
    );
    return savedShowTotalRevenueCardPreference !== null
      ? savedShowTotalRevenueCardPreference === "true"
      : true;
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
      showImpressionsOverTime.toString()
    );
  }, [showImpressionsOverTime]);

  useEffect(() => {
    localStorage.setItem(
      "showImpressionRevenueOverTime",
      showImpressionRevenueOverTime.toString()
    );
  }, [showImpressionRevenueOverTime]);

  useEffect(() => {
    localStorage.setItem(
      "showTotalImpressionsCard",
      showTotalImpressionsCard.toString()
    );
  }, [showTotalImpressionsCard]);

  useEffect(() => {
    localStorage.setItem("showTotalSalesCard", showTotalSalesCard.toString());
  }, [showTotalSalesCard]);

  useEffect(() => {
    localStorage.setItem(
      "showTotalRevenueCard",
      showTotalRevenueCard.toString()
    );
  }, [showTotalRevenueCard]);

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
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
