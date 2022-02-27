import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams, useRouteMatch, Switch, Route } from 'react-router-dom';
import { fetchSingleAlbum } from '../../store/albumsReducer';
import AlbumArt from '../../components/AlbumArt';
import { AlbumNavigation, Tracklist } from '.';
import { getReviews } from '../../store/reviewsReducer';
import ReviewListItem from '../../components/ReviewListItem';
import { sortByRecent } from '../../utils/sorts';
import './Album.css';

const Album = (id) => {
  const [album, setAlbum] = useState();
  const [loading, setLoading] = useState(true);
  // const [errors, setErrors] = useState(false);
  const [reviews, setReviews] = useState([]);
  const { spotifyID } = useParams();
  const dispatch = useDispatch();
  const { path } = useRouteMatch();

  useEffect(() => {
    (async () => {
      try {
        const [album, reviews] = await Promise.all([
          dispatch(fetchSingleAlbum(spotifyID)),
          dispatch(getReviews()),
        ]);
        const filtered = reviews.filter(
          (review) => review.album.spotifyID === spotifyID
        );
        setReviews(sortByRecent([...filtered]));
        setAlbum(album);
        setLoading(false);
      } catch (err) {
        return err;
      }
    })();
  }, [dispatch, spotifyID]);

  return (
    !loading && (
      <div className="single-album-view">
        <section className="album-view-left">
          <AlbumArt
            title={album.title}
            artworkURL={album.artworkURL}
            size="230"
          />
        </section>
        <section className="album-view-main">
          <div>
            <div className="album-header">
              <h1>{album.title}</h1>
              <p>{album.releaseYear}</p>
              <p>By {album.artist}</p>
            </div>
            <div className="album-view-details">
              <AlbumNavigation />
              <Switch>
                <Route path={`${path}/tracks`}>
                  <Tracklist tracks={album.tracks} />
                </Route>
                <Route path={`${path}/genres`}>
                  <h2>GENRES</h2>
                </Route>
              </Switch>
            </div>
            <div className="album-reviews">
              <h3 className="section-heading">RECENT REVIEWS</h3>
              {reviews.length > 0 &&
                reviews.map((review) => (
                  <ReviewListItem
                    key={review.id}
                    review={review}
                    shape="landscape"
                    withArt={false}
                    showInfo={false}
                  />
                ))}
            </div>
          </div>
          {/* <div><ReviewActions /></div> */}
        </section>
      </div>
    )
  );
};

export default Album;
