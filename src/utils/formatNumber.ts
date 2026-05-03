export const formatCompactNumber = (number: number) => {
  if (number === undefined || number === null) return "0";
  
  if (number < 1000) {
    return number.toString();
  }
  
  const formatter = new Intl.NumberFormat("en-US", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
  });
  
  return formatter.format(number).toLowerCase();
};
