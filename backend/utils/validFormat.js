export const isValidMonthFormat = (month) => {
  const validMonths = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
  ];
  return validMonths.includes(month.toLowerCase());
};

// Utility function to map month names to numerical representation
export const getMonthNumber = (month) => {
  const monthMappings = {
    january: 1,
    february: 2,
    march: 3,
    april: 4,
    may: 5,
    june: 6,
    july: 7,
    august: 8,
    september: 9,
    october: 10,
    november: 11,
    december: 12,
  };
  return monthMappings[month.toLowerCase()];
};
