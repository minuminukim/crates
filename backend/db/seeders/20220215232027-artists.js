'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('Artists', [
      {
        spotifyID: '5K4W6rqBFWDnAN6FQUkS6x',
        name: 'Kanye West',
        imageURL:
          'https://i.scdn.co/image/ab6761610000e5eb867008a971fae0f4d913f63a',
      },
      {
        spotifyID: '6pohviZSNRueSX7uNu63ZX',
        name: 'Moodymann',
        imageURL:
          'https://i.scdn.co/image/849e40b627748ad8daeb95c18e227fc605d1c9fb',
      },
      {
        spotifyID: '4zGBj9dI63YIWmZkPl3o7V',
        name: 'DJ Rashad',
        imageURL:
          'https://i.scdn.co/image/a283f137c033bace0fa5e268be62459f72e0887b',
      },
      {
        spotifyID: '5a2EaR3hamoenG9rDuVn8j',
        name: 'Prince',
        imageURL:
          'https://i.scdn.co/image/ab6761610000e5ebeaca358712b3fe4ed9814640',
      },
      {
        spotifyID: '1mNnxxnPfHQDOkFjnZmdkc',
        name: 'Patrice Rushen',
        imageURL:
          'https://i.scdn.co/image/ab6761610000e5eb71fda335e8846c853aa669d6',
      },
      {
        spotifyID: '47zz7sob9NUcODy0BTDvKx',
        name: 'Sade',
        imageURL:
          'https://i.scdn.co/image/ab6761610000e5eb92883b0e094a36d2f43ad284',
      },
      {
        spotifyID: '5jh7sgXW2njALiIh0aPXjB',
        name: 'Show Me the Body',
        imageURL:
          'https://i.scdn.co/image/ab6761610000e5ebcc19084c7d763c5730e9f088',
      },
      {
        spotifyID: '3Rj0tDHoX7C5NFq5DKIpHt',
        name: 'Stereolab',
        imageURL:
          'https://i.scdn.co/image/ab6761610000e5ebce71a14e2327722a8ed5245c',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    const Op = Sequelize.Op;

    return await queryInterface.bulkDelete('Artists', {
      name: {
        [Op.in]: [
          'Kanye West',
          'Moodymann',
          'DJ Rashad',
          'Prince',
          'Patrice Rushen',
          'Sade',
          'Show Me the Body',
          'Stereolab',
        ],
      },
    });
  },
};
