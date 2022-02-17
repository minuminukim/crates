'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('Albums', [
      {
        spotifyID: '20r762YmB5HeofjMCiPMLv',
        title: 'My Beautiful Dark Twisted Fantasy',
        averageRating: 6.8,
        ratingsCount: 3,
        artistID: 1,
        artist: 'Kanye West',
        artworkURL:
          'https://i.scdn.co/image/ab67616d0000b273d9194aa18fa4c9362b47464f',
        releaseYear: 2010,
        genres: ['rap', 'hip-hop'],
      },
      {
        spotifyID: '5CnpZV3q5BcESefcB3WJmz',
        title: 'Donda',
        averageRating: 7.0,
        ratingsCount: 1,
        artistID: 1,
        artist: 'Kanye West',
        artworkURL:
          'https://i.scdn.co/image/ab67616d0000b273cad190f1a73c024e5a40dddd',
        releaseYear: 2021,
        genres: ['rap', 'hip-hop'],
      },
      {
        spotifyID: '7gsWAHLeT0w7es6FofOXk1',
        title: 'The Life Of Pablo',
        averageRating: 8.6,
        ratingsCount: 2,
        artistID: 1,
        artist: 'Kanye West',
        artworkURL:
          'https://i.scdn.co/image/ab67616d0000b2732a7db835b912dc5014bd37f4',
        releaseYear: 2016,
        genres: ['rap', 'hip-hop'],
      },
      {
        spotifyID: '7D2NdGvBHIavgLhmcwhluK',
        title: 'Yeezus',
        averageRating: 10.0,
        ratingsCount: 1,
        artistID: 1,
        artist: 'Kanye West',
        artworkURL:
          'https://i.scdn.co/image/ab67616d0000b2731dacfbc31cc873d132958af9',
        releaseYear: 2013,
        genres: ['rap', 'hip-hop'],
      },
      {
        spotifyID: '4Uv86qWpGTxf7fU7lG5X6F',
        title: 'The College Dropout',
        averageRating: 9.0,
        ratingsCount: 1,
        artistID: 1,
        artist: 'Kanye West',
        artworkURL:
          'https://i.scdn.co/image/ab67616d0000b27325b055377757b3cdd6f26b78',
        releaseYear: 2004,
        genres: ['rap', 'hip-hop'],
      },
      {
        spotifyID: '2Ek1q2haOnxVqhvVKqMvJe',
        title: 'ye',
        averageRating: 8.0,
        ratingsCount: 1,
        artistID: 1,
        artist: 'Kanye West',
        artworkURL:
          'https://i.scdn.co/image/ab67616d0000b2730cd942c1a864afa4e92d04f2',
        releaseYear: 2018,
        genres: ['rap', 'hip-hop'],
      },
      {
        spotifyID: '0FgZKfoU2Br5sHOfvZKTI9',
        title: 'JESUS IS KING',
        averageRating: 6.0,
        ratingsCount: 1,
        artistID: 1,
        artist: 'Kanye West',
        artworkURL:
          'https://i.scdn.co/image/ab67616d0000b2731bb797bbfe2480650b6c2964',
        releaseYear: 2019,
        genres: ['rap', 'hip-hop'],
      },
      {
        spotifyID: '3WFTGIO6E3Xh4paEOBY9OU',
        title: '808s & Heartbreak',
        averageRating: 8.0,
        ratingsCount: 1,
        artistID: 1,
        artist: 'Kanye West',
        artworkURL:
          'https://i.scdn.co/image/ab67616d0000b273346d77e155d854735410ed18',
        releaseYear: 2018,
        genres: ['rap', 'hip-hop'],
      },
      {
        spotifyID: '5ll74bqtkcXlKE7wwkMq4g',
        title: 'Late Registration',
        averageRating: 8.0,
        ratingsCount: 1,
        artistID: 1,
        artist: 'Kanye West',
        artworkURL:
          'https://i.scdn.co/image/ab67616d0000b273428d2255141c2119409a31b2',
        releaseYear: 2005,
        genres: ['rap', 'hip-hop'],
      },
      {
        spotifyID: '4SZko61aMnmgvNhfhgTuD3',
        title: 'Graduation',
        averageRating: 7.0,
        ratingsCount: 1,
        artistID: 1,
        artist: 'Kanye West',
        artworkURL:
          'https://i.scdn.co/image/ab67616d0000b27326f7f19c7f0381e56156c94a',
        releaseYear: 2007,
        genres: ['rap', 'hip-hop'],
      },
      {
        spotifyID: '1WuyO8qwthV94n8A4crVss',
        title: 'Silentintroduction',
        averageRating: 8.0,
        ratingsCount: 1,
        artistID: 2,
        artist: 'Moodymann',
        artworkURL:
          'https://i.scdn.co/image/ab67616d0000b27372d1e831b30315d08b1f426b',
        releaseYear: 1997,
        genres: ['deep house', 'detroit house', 'detroit techno'],
      },
      {
        spotifyID: '224OuhZ1LThmaYGhD8ikq6',
        title: 'Black Mahogani',
        artworkURL:
          'https://i.scdn.co/image/ab67616d0000b273163a93780dfc3dc608ddd925',
        releaseYear: 2004,
        averageRating: 7.6,
        ratingsCount: 3,
        artistID: 2,
        artist: 'Moodymann',
        genres: ['deep house', 'detroit house', 'detroit techno'],
      },
      {
        spotifyID: '2NhQapO6mTOWbip0fvru36',
        title: 'Forevernevermore',
        artworkURL:
          'https://i.scdn.co/image/ab67616d0000b273acdc6c8b134d4528937c4565',
        releaseYear: 2000,
        averageRating: 8.0,
        ratingsCount: 1,
        artistID: 2,
        artist: 'Moodymann',
        genres: ['deep house', 'detroit house', 'detroit techno'],
      },
      {
        spotifyID: '21dsgJBSUM6IvAGFjfotgF',
        title: 'Double Cup',
        artworkURL:
          'https://i.scdn.co/image/ab67616d0000b273d632858017314cb46e7b0845',
        releaseYear: 2014,
        averageRating: 9.0,
        ratingsCount: 1,
        artistID: 3,
        artist: 'DJ Rashad',
        genres: ['footwork', 'juke'],
      },
      {
        spotifyID: '1KNiYI5CvOUdD8twhsT2lY',
        title: 'TEKLIFE Vol. 1: Welcome to the Chi',
        artworkURL:
          'https://i.scdn.co/image/ab67616d0000b27325a4bcf15a3b4ed8a97d2a28',
        releaseYear: 2012,
        averageRating: 8.0,
        ratingsCount: 1,
        artistID: 3,
        artist: 'DJ Rashad',
        genres: ['footwork', 'juke'],
      },
      {
        spotifyID: '34MHuXONazzgSxI0cThpAg',
        title: '1999',
        artworkURL:
          'https://i.scdn.co/image/ab67616d0000b273337c5517a9a62e0c3f17d59f',
        releaseYear: 1982,
        averageRating: 9.0,
        ratingsCount: 1,
        artistID: 4,
        artist: 'Prince',
        genres: ['funk'],
      },
      {
        spotifyID: '7nXJ5k4XgRj5OLg9m8V3zc',
        title: 'Purple Rain',
        artworkURL:
          'https://i.scdn.co/image/ab67616d0000b273d52bfb90ee8dfeda8378b99b',
        releaseYear: 1984,
        averageRating: 8.0,
        ratingsCount: 1,
        artistID: 4,
        artist: 'Prince',
        genres: ['funk'],
      },
      {
        spotifyID: '4JsSbaggaprB1AfDylXnxO',
        title: 'Dirty Mind',
        artworkURL:
          'https://i.scdn.co/image/ab67616d0000b2733d5eebdf65ca2ccb308df87d',
        releaseYear: 1980,
        averageRating: 10.0,
        ratingsCount: 1,
        artistID: 4,
        artist: 'Prince',
        genres: ['funk'],
      },
      {
        spotifyID: '1y2MGKwD1ap3FxPc4ii6QO',
        title: 'Straight From The Heart',
        artworkURL:
          'https://i.scdn.co/image/ab67616d0000b273a03ea69e2c991c97435a7881',
        releaseYear: 1982,
        averageRating: 8.0,
        ratingsCount: 2,
        artistID: 5,
        artist: 'Patrice Rushen',
        genres: ['disco', 'funk'],
      },
      {
        spotifyID: '45wverkThQijw67ZCPxuBP',
        title: 'Posh',
        artworkURL:
          'https://i.scdn.co/image/ab67616d0000b273dd51f0bf670da32e46f18af8',
        releaseYear: 1980,
        averageRating: 9.0,
        ratingsCount: 1,
        artistID: 5,
        artist: 'Patrice Rushen',
        genres: ['disco', 'funk'],
      },
      {
        spotifyID: '4wCvCNsMJJvyeX5mGO40ae',
        title: 'Promise',
        artworkURL:
          'https://i.scdn.co/image/ab67616d0000b273584302fee10c0d0a12c40c97',
        releaseYear: 1985,
        averageRating: 9.0,
        ratingsCount: 1,
        artistID: 6,
        artist: 'Sade',
        genres: ['soul', 'pop'],
      },
      {
        spotifyID: '44byRkiG5AmHjfrBuodMzp',
        title: 'Body War',
        artworkURL:
          'https://i.scdn.co/image/ab67616d0000b273fc5b945694542a289fd416b5',
        releaseYear: 2016,
        averageRating: 8.0,
        ratingsCount: 1,
        artistID: 7,
        artist: 'Show Me the Body',
        genres: ['punk'],
      },
      {
        spotifyID: '4osZNJ2yO18sYtqJIFvMFy',
        title: 'Dog Whistle',
        artworkURL:
          'https://i.scdn.co/image/ab67616d0000b273dec62246b3568d62f54a74c8',
        releaseYear: 2019,
        averageRating: 7.0,
        ratingsCount: 1,
        artistID: 7,
        artist: 'Show Me the Body',
        genres: ['punk'],
      },
      {
        spotifyID: '3sR99ifBBjElpRmIGkstcm',
        title: 'Corpus I',
        artworkURL:
          'https://i.scdn.co/image/ab67616d0000b2732fd250e2666e6bfb0ea19c68',
        releaseYear: 2017,
        averageRating: 6.0,
        ratingsCount: 1,
        artistID: 7,
        artist: 'Show Me the Body',
        genres: ['punk'],
      },
      {
        spotifyID: '5YZmrMsFY6xdUBsS7DJxaz',
        title: 'Dots And Loops',
        artworkURL:
          'https://i.scdn.co/image/ab67616d0000b273e2a08e86f318fbdc2b1a5c24',
        releaseYear: 1997,
        averageRating: 8.6,
        ratingsCount: 2,
        artistID: 8,
        artist: 'Stereolab',
        genres: ['pop', 'alternative rock'],
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
