const Sequelize = require('sequelize');
const { Review } = require('../db/models');

const generateNewAverageRating = async (albumID) => {
  const reviews = await Review.findAll({
    where: { albumID: albumID },
    attributes: [[Sequelize.fn('avg', Sequelize.col('rating')), 'average']],
    raw: true,
  });
  const [{ average }] = reviews;

  return parseFloat(average).toFixed(1);
};

module.exports = generateNewAverageRating;
