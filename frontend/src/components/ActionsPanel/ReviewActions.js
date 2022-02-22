import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleUser } from '../../store/usersReducer';
import StarRating from '../StarRating';
import { ActionsRow } from '.';
import './ReviewActions.css';

const ReviewActions = ({
  userID,
  onEditClick,
  onPostClick,
  onListClick,
  onDeleteClick,
  rating,
}) => {
  const sessionUser = useSelector((state) => state.session.user);
  const isSessionUser = sessionUser?.id === userID;
  const { reviewID } = useParams();

  return (
    <ul className="review-actions">
      <li className="actions-row"></li>
      <ActionsRow
        className="action-row-rated"
        label={'Rated'}
        key={reviewID}
        children={<StarRating reviewRating={rating} readOnly={true} />}
      />
      {isSessionUser && (
        <>
          <ActionsRow
            className="hover"
            label="Edit or delete this review..."
            onClick={onEditClick}
          />
          <ActionsRow
            className="hover"
            label="Delete this review..."
            onClick={onDeleteClick}
          />
        </>
      )}
      <ActionsRow
        label="Review or log again..."
        onClick={onPostClick}
        className="hover"
      />
      <ActionsRow
        label="Add this album to a list..."
        className="hover"
        onClick={onListClick}
      />
    </ul>
  );
};

export default ReviewActions;
