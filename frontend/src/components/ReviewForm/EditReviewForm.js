import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { editReview, deleteReview } from '../../store/reviewsReducer';
import AlbumArt from '../AlbumArt';
import InputField from '../InputField';
import InputLabel from '../InputLabel';
import { SaveButton, DeleteButton } from '../Button/SaveDeleteButtons';
import './ReviewForm.css';

const EditReviewForm = ({ review, onSuccess }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState({});
  // const { errors } = useSelector((state) => state.reviews);
  const { album, user } = review;
  const [form, setForm] = useState({
    listenedDate: review.listenedDate,
    isRelisten: review.isRelisten,
    body: review.body,
    rating: review.rating,
    // ...review
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    const params = { ...form, userID: user.id, id: review.id };
    return dispatch(editReview(params))
      .then(() => onSuccess())
      .then(() => history.push(`/reviews/${review.id}`))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    return dispatch(deleteReview(review.id))
      .then(() => history.push('/'))
      .catch((err) => err);
  };
  return (
    <div>
      <form onSubmit={handleSubmit} className="review-form edit">
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
              error={errors?.listenedDate}
              onChange={handleChange}
            />
          </div>
          <div className="form-row">
            <input
              type="checkbox"
              value={form.isRelisten}
              checked={form.isRelisten}
              onChange={handleCheckbox}
            />
            {errors?.isRelisten}
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
            {errors?.body}
          </div>
          <div className="form-row">
            <InputLabel label="Rating" />
            <InputField
              type="number"
              id="rating"
              value={form.rating}
              error={errors?.rating}
              onChange={handleChange}
            />
            {/* TODO: star rating component */}
          </div>
          <div className="form-row">
            <SaveButton />
            <DeleteButton onClick={handleDelete} />
          </div>
        </section>
      </form>
    </div>
  );
};

export default EditReviewForm;