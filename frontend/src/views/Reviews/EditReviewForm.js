import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ValidationError from '../../components/ValidationError';
import { editReview, deleteReview } from '../../store/reviewsReducer';
import AlbumArt from '../../components/AlbumArt';
import { InputField, InputLabel } from '../../components/InputField';
import { SaveButton, DeleteButton } from '../../components/Button';
import StarRating from '../../components/StarRating';
import { ErrorMessages } from '../../components/ValidationError';
import { AiOutlineClose, AiOutlineCheck } from 'react-icons/ai';
import './ReviewForm.css';

const EditReviewForm = ({ review, onSuccess }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [action, setAction] = useState(null);
  const { album, user } = review;
  const [message, setMessage] = useState('');
  const [form, setForm] = useState({
    listenedDate: review.listenedDate,
    isRelisten: review.isRelisten,
    body: review.body,
    rating: review.rating,
    // ...review
  });
  const hiddenInput = useRef(null);
  const today = new Date().toISOString().slice(0, 10);

  const handleChange = (e) =>
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });

  const handleCheckbox = (e) => {
    setForm({
      ...form,
      isRelisten: !form.isRelisten,
    });
  };

  const handleStarRating = (star) =>
    setForm({
      ...form,
      rating: star,
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    if (action && action === 'delete') {
      return dispatch(deleteReview(review.id))
        .then(() => history.push('/'))
        .then(() => onSuccess())
        .catch((err) => console.log('error on delete submission: ', err));
    }

    const params = { ...form, userID: user.id, id: review.id };

    return (
      dispatch(editReview(params))
        .then(() =>
          setMessage(
            `You have successfully edited your entry for '${album?.title}'`
          )
        )
        .then(() => onSuccess())
        // force re-render on ReviewActions with updated rating
        .then(() => history.go(0))
        // .then(() => history.push(`/reviews/${review.id}`))
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(Object.values(data.errors));
          }
        })
    );
  };

  const onEdit = () => setAction('edit');
  const onDelete = () => setAction('delete');

  return (
    <div>
      <form onSubmit={handleSubmit} className="review-form edit">
        <ErrorMessages errors={errors} success={message} />
        <section className="review-form-left">
          <AlbumArt
            title={album?.title}
            artworkURL={album?.artworkURL}
            size="medium"
          />
        </section>
        <section className="review-form-right">
          <div className="review-form-header">
            <div className="label-row">
              <h1>EDIT DIARY ENTRY</h1>
              <AiOutlineClose
                className="close-icon large"
                onClick={onSuccess}
              />
            </div>
            <div>
              <h2>
                {album?.title}
                <span className="review-form-year">{album?.releaseYear}</span>
              </h2>
            </div>
          </div>
          <div className="form-row checkbox">
            <div
              className="replace-checkbox"
              onClick={() => hiddenInput.current.click()}
            >
              {form.isRelisten && <AiOutlineCheck />}
            </div>
            <input
              type="checkbox"
              value={form.isRelisten}
              checked={form.isRelisten}
              onChange={handleCheckbox}
              ref={hiddenInput}
              hidden
            />
            <label>I've listened to this album before</label>
          </div>
          <div className="form-row">
            <InputLabel label="Specify the date you listened to it" required />
            <InputField
              type="date"
              id="listenedDate"
              value={form.listenedDate}
              onChange={handleChange}
              // max={today}
            />
          </div>
          <div className="form-row">
            <textarea
              id="body"
              placeholder="Add a review..."
              value={form.body}
              onChange={handleChange}
            />
          </div>
          <div className="form-row bottom-row">
            <div className="form-row rating-row">
              <div className="label-row">
                <InputLabel label="Rating" required />
                {form.rating > 0 && (
                  <p className="rating-label">{`${
                    form.rating / 2
                  } out of 5`}</p>
                )}
              </div>
              <InputField
                type="number"
                id="rating"
                value={form.rating}
                // error={errors?.rating}
                onChange={handleChange}
                hidden
              />
              <StarRating
                reviewRating={form.rating}
                handleForm={handleStarRating}
              />
            </div>
            <div className="form-row btns">
              <DeleteButton onClick={onDelete} />
              <SaveButton
                onClick={onEdit}
                disabled={errors && errors.length > 0}
              />
            </div>
          </div>
        </section>
      </form>
    </div>
  );
};

export default EditReviewForm;
