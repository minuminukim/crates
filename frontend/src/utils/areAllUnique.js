const areAllUnique = (albums) => {
  const mapped = albums.map((album) => album.spotifyID);
  const unique = [...new Set(mapped)];
  return unique.length === mapped.length;
};

export default areAllUnique;
