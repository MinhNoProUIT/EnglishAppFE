// utils/format.ts

/**
 * Định dạng số thành tiền tệ VNĐ: 12345678 -> "12.345.678 VNĐ"
 */
export const formatCurrency = (value: number | string): string => {
  if (!value) return "0 VNĐ";

  const number =
    typeof value === "string" ? parseInt(value.replace(/\D/g, ""), 10) : value;

  return number.toLocaleString("vi-VN") + " VNĐ";
};
