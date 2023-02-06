const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

export function unixConverter(unix) {
  const full_date = new Date(unix);
  var year = full_date.getFullYear();
  var month = months[full_date.getMonth()];
  var date = full_date.getDate();

  return `${date} ${month} ${year}`;
}
