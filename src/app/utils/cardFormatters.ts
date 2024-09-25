export const formatCardNumber = (value: string): string => {
  const digits = value.replace(/\D/g, "").slice(0, 19); // Limit to 19 digits
  const groups = [];

  for (let i = 0; i < digits.length; i += 4) {
    groups.push(digits.slice(i, i + 4));
  }

  return groups.join(" ").trim();
};

export const formatExpiry = (value: string): string => {
  const digits = value.replace(/\D/g, "");
  if (digits.length >= 2) {
    return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
  }
  return digits;
};

// Format CVC for display
export const formatCVC = (value: string): string => {
  return value.replace(/\D/g, "").slice(0, 4);
};

export const formatCardholderName = (value: string): string => {
  return value.replace(/[^a-zA-Z\s]/g, "").toUpperCase();
};
