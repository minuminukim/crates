const Album = require('../db/models');

const useAlbumFindOrCreate = async (data) => {
  const [album, created] = await Album.findOrCreate({
    where: { spotifyID: spotifyID },
    defaults: {
      spotifyID: data.spotifyID,
      title: data.title,
      averageRating: 0.0,
      ratingsCount: 0,
      artworkURL: data.artworkURL,
      artist: data.artist,
      releaseYear: data.releaseYear,
    },
  });

  return { album, created };
};

module.exports = useAlbumFindOrCreate;
