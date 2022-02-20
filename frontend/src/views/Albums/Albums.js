// import { Link } from 'react-router-dom';
import ReviewsList from '../../components/ReviewsList';
import './Albums.css';

const Albums = () => {
  return (
    <div className="page-container albums-view-container">
      <section className="popular-reviews">
        <h2 className="section-heading">POPULAR REVIEWS THIS WEEK</h2>
        <ReviewsList className="popular" />
      </section>
    </div>
  );
};

export default Albums;
