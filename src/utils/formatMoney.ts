export const formatMoney = (
  amount: number,
  maxFractionDigis = 0,
  minFractionDigits = 0,
) => {
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: maxFractionDigis,
    minimumFractionDigits: minFractionDigits,
  });
  return formatter.format(amount);
};
