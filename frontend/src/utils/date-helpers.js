// ISOstring => Feb 06
export const formatDateMonthDay = (dateString) => {
  const string = dateString.split('-').join('/');
  const date = new Date(string);
  return date.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
};

// ISOstring => 06 Feb 2022
export const formatDateDayMonthYear = (dateString) => {
  const string = dateString.split('-').join('/');
  const date = new Date(string);
  const split = date
    .toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
    .split(' ');

  return `${split[1].slice(0, 2)} ${split[0]} ${split[2]}`;
};

export const toDateString = () => {
  const today = new Date();
  const year = today.getFullYear().toString();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate().toString().padStart(2, '0');
  const date = `${year}-${month}-${day}`;
  return date;
};

export const dateTimeToString = (datetime) => {
  const date = new Date(datetime);
  const split = date
    .toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    })
    .split(' ');

  return `${split[1].slice(0, 2)} ${split[0]} ${split[2]}`;
};
