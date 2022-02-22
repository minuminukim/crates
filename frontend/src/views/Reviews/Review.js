import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { getSingleReview } from '../../store/reviewsReducer';
import { Modal } from '../../context/Modal';
import EditReviewForm from './EditReviewForm';
import ReviewForm from './ReviewForm';
import ReviewBody from './ReviewBody';
import AlbumArt from '../../components/AlbumArt';
import { ReviewActions, AppendList } from '../../components/ActionsPanel';
import { fetchSingleUser } from '../../store/usersReducer';
import { useModal } from '../../hooks';
import { deleteReview } from '../../store/reviewsReducer';
import WarningMessage from '../../components/WarningMessage';
import './Review.css';

const Review = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { reviewID } = useParams();
  const review = useSelector((state) => state.reviews.items[reviewID]);
  const sessionUser = useSelector((state) => state.session.user);
  const album = review?.album;
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const { showModal: showWarning, toggleModal: toggleWarning } = useModal();
  const [isLoading, setIsLoading] = useState(true);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    // if (review && album) return;
    const fetchData = async () => {
      try {
        const review = await dispatch(getSingleReview(+reviewID));

        // fetching the session user here to set rating state for the action panel
        const { reviews } = await dispatch(fetchSingleUser(sessionUser.id));
        const found = reviews.find((item) => item.albumID === review.albumID);
        setRating(found?.rating || 0);
        setIsLoading(false);
      } catch (res) {
        const data = await res.json();
        if (data && data.errors) {
          console.log('error', data.errors);
        }
      }
    };
    fetchData();
    return () => setRating(0);
  }, [dispatch, reviewID, sessionUser]);

  const handleDelete = () => {
    return dispatch(deleteReview(+reviewID))
      .then(() => history.push('/'))
      .catch((err) => console.log('error deleting review', err));
  };

  // return null when review doesn't exist after dispatching a delete action
  return !review
    ? null
    : !isLoading && (
        <div className="page-container review-page">
          <div>
            <AlbumArt
              title={album?.title}
              artworkURL={album?.artworkURL}
              size="medium"
            />
          </div>
          <div className="review-page-middle">
            <ReviewBody review={review} album={album} />
          </div>
          <div>
            <ReviewActions
              rating={rating}
              albumID={review?.albumID}
              key={rating}
              userID={review?.userID}
              onEditClick={() => setShowEditModal(true)}
              onPostClick={() => setShowPostModal(true)}
              onListClick={() => setShowListModal(true)}
              onDeleteClick={toggleWarning}
            />
          </div>
          {showEditModal && (
            <Modal onClose={() => setShowEditModal(false)}>
              <EditReviewForm
                review={review}
                album={album}
                onSuccess={() => setShowEditModal(false)}
              />
            </Modal>
          )}
          {showPostModal && (
            <Modal onClose={() => setShowPostModal(false)}>
              <ReviewForm
                album={album}
                onSuccess={() => setShowPostModal(false)}
              />
            </Modal>
          )}
          {showListModal && (
            <Modal onClose={() => setShowListModal(false)}>
              <AppendList
                album={album}
                onClose={() => setShowListModal(false)}
              />
            </Modal>
          )}
          {showWarning && (
            <Modal onClose={toggleWarning}>
              <WarningMessage
                item="review"
                toggle={toggleWarning}
                onDelete={handleDelete}
              />
            </Modal>
          )}
        </div>
      );
};

export default Review;
