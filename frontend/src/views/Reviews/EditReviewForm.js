import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ValidationError from '../../components/ValidationError';
import { editReview, deleteReview } from '../../store/reviewsReducer';
import AlbumArt from '../../components/AlbumArt';
import { InputField, InputLabel } from '../../components/InputField';
import { SaveButton, DeleteButton } from '../../components/Button';
import StarRating from '../../components/StarRating';
import './ReviewForm.css';

const EditReviewForm = ({ review, onSuccess }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState([]);
  const [action, setAction] = useState(null);
  const sessionUser = useSelector((state) => state.session.user);
  const { album, user } = review;
  const [form, setForm] = useState({
    listenedDate: review.listenedDate,
    isRelisten: review.isRelisten,
    body: review.body,
    rating: review.rating,
    // ...review
  });

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
        {errors.length > 0 &&
          errors.map((error) => <ValidationError error={error} />)}
        <section className="review-form-left">
          <AlbumArt
            title={album?.title}
            artworkURL={album?.artworkURL}
            size="medium"
          />
        </section>
        <section className="review-form-right">
          <div className="review-form-header">
            <h1>EDIT DIARY ENTRY</h1>
            <div>
              <h2>{album?.title}</h2>
              <span>{album?.releaseYear}</span>
            </div>
          </div>
          <div className="form-row">
            <InputLabel label="Specify the date you listened to it" />
            <InputField
              type="date"
              id="listenedDate"
              value={form.listenedDate}
              // error={errors?.listenedDate}
              onChange={handleChange}
              max={today}
            />
          </div>
          <div className="form-row">
            <input
              type="checkbox"
              value={form.isRelisten}
              checked={form.isRelisten}
              onChange={handleCheckbox}
            />
            {/* {errors?.isRelisten} */}
            <label>I've listened to this album before</label>
          </div>
          <div className="form-row">
            <textarea
              id="body"
              placeholder="Add a review..."
              value={form.body}
              onChange={(e) => console.log(e.target.id)}
              onChange={handleChange}
            />
            {/* {errors?.body} */}
          </div>
          <div className="form-row">
            <InputLabel label="Rating" />
            <InputField
              type="number"
              id="rating"
              value={form.rating}
              // error={errors?.rating}
              onChange={handleChange}
              hidden={true}
            />
            <StarRating
              reviewRating={form.rating}
              handleForm={handleStarRating}
            />
          </div>
          <div className="form-row">
            <SaveButton
              onClick={onEdit}
              disabled={errors && errors.length > 0}
            />
            <DeleteButton onClick={onDelete} />
          </div>
        </section>
      </form>
    </div>
  );
};

export default EditReviewForm;
