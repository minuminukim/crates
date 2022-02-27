export const sortByRecent = (items) => {
  return items.sort((a, b) => b.id - a.id);
};

export const sortByDateListened = (reviews) => {
  return [...reviews].sort(
    (a, b) => new Date(b.listenedDate) - new Date(a.listenedDate)
  );
};
