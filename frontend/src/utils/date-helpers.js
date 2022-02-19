// Feb 06
export const formatDateMonthDay = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
};

// 06 Feb 2022
export const formatDateDayMonthYear = (dateString) => {
  const date = new Date(dateString);
  const split = date
    .toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
    .split(' ');

  return `${split[1].slice(0, 2)} ${split[0]} ${split[2]}`;
};
