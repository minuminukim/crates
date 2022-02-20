// import { Link } from 'react-router-dom';
import ReviewsList from '../ReviewsList';
import './AlbumsView.css';

const AlbumsView = () => {
  return (
    <div className="page-container albums-view-container">
      <section className="popular-reviews">
        <h2 className="section-heading">POPULAR REVIEWS THIS WEEK</h2>
        <ReviewsList className="popular" />
      </section>
    </div>
  );
};

export default AlbumsView;
