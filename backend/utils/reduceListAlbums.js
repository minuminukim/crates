const { Album } = require('../db/models');

// helper function that reduces albums in a list,
// finding or creating records for each
const reduceListAlbums = async (items) => {
  return await items.reduce(async (promise, item) => {
    // await the previous callback
    const acc = await promise;
    const { spotifyID } = item;
    const [album] = await Album.findOrCreate({
      where: { spotifyID: spotifyID },
      defaults: {
        spotifyID: spotifyID,
        title: item.title,
        averageRating: 0.0,
        ratingsCount: 0,
        artworkURL: item.artworkURL,
        artist: item.artist,
        releaseYear: item.releaseYear,
      },
      raw: true,
    });

    return [...acc, album];
  }, Promise.resolve([]));
};

module.exports = reduceListAlbums;
