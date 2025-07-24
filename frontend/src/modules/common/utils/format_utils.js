export const truncateString = (str, maxLength) => {
  if (str === null || str === undefined) {
    return "";
  }
  if (str?.length <= maxLength) {
    return str;
  }
  return str.slice(0, maxLength) + "...";
};

export const formatMetricTitle = (metric) => {
  if (!metric) return "";
  return metric
    .replace(/_/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (c) => c.toUpperCase());
};
