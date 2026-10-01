export function formatVND(amount: number): string {
  if (amount >= 1000000000) {
    const billions = amount / 1000000000;
    return `${billions.toLocaleString('vi-VN', { maximumFractionDigits: 3 })} tỷ VNĐ`;
  }
  const millions = amount / 1000000;
  return `${millions.toLocaleString('vi-VN', { maximumFractionDigits: 1 })} triệu VNĐ`;
}

export function formatVNDExact(amount: number): string {
  return `${amount.toLocaleString('vi-VN')} VNĐ`;
}

export function formatNumber(num: number): string {
  return num.toLocaleString('vi-VN');
}
