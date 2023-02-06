export default function getCurrencySign(currency) {
  switch (currency) {
    case 'USD':
      return '$';
    case 'EUR':
      return '€';
    case 'UAH':
      return '₴';
    case 'TRX':
    default:
      return '$';
  }
}
