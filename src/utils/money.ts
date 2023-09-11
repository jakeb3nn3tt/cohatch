const formatter = new Intl.NumberFormat('en-US', {
  currency: 'USD',
  minimumFractionDigits: 2,
});

export const formatMoneyToStripe = (value: number) => {
  return formatter.format(value).replace('.', '').replace(',', '');
};
