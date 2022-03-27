import { useParams } from 'react-router-dom';
import ActionsRow from './ActionsRow';
import StarRating from '../StarRating';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const RatingPanel = ({ albumID }) => {
  const { reviewID } = useParams();
  const userID = useSelector((state) => state.session.user?.id);
  const review = useSelector((state) => state.reviews.items[reviewID]);
  // Iterate over the current user's reviews and derive a rating,
  // if one is found associated with the current album
  const rating = useSelector((state) => {
    if (!userID) return 0;
    const found = state.users[userID].reviews.find((id) => {
      const current = state.reviews.items[id];
      return current?.albumID === review.albumID;
    });
    return found ? state.reviews.items[found].rating : 0;
  });

  // useEffect(() => {
  //   // Iterate over user's reviewIDs, and look for one
  //   // associated with the current album
  //   if (userReviews) {
  //     console.log('userReviews', userReviews);
  //     const matchingID = userReviews.find(
  //       (id) => allReviews[id].albumID === review.albumID
  //     );
  //     console.log('matchingID', matchingID);
  //     setRating(matchingID ? allReviews[matchingID].rating : 0);
  //   }
  // }, [rating, userReviews, review?.albumID]);

  return (
    <ActionsRow
      className="action-row-rated"
      label={rating ? 'Rated' : 'Not Rated'}
      key={reviewID}
    >
      <StarRating reviewRating={rating} readOnly={true} />
    </ActionsRow>
  );
};

export default RatingPanel;
