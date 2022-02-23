import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { fetchUserBacklog } from '../../store/backlogsReducer';
import HoverActions from '../../components/HoverActions';
import './Backlog.css';

const Backlog = () => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const { userID } = useParams();
  const [albums, setAlbums] = useState([]);
  // const backlog = useSelector((state) => state.backlogs[+userID]);

  useEffect(() => {
    const fetchBacklog = async () => {
      const backlog = await dispatch(fetchUserBacklog(+userID));
      setAlbums(backlog);
      // setLoading(false);
    };
    fetchBacklog().then(() => setLoading(false));
  }, [dispatch]);

  return (
    !loading && (
      <div>
        <h2 className="section-heading">
          YOU WANT TO LISTEN TO {albums.length} ALBUMS
        </h2>
        <section className="backlog-container">
          <ul className="backlog-grid">
            {albums?.length > 0 &&
              albums.map((album, i) => (
                <li key={`backlog-item-${i}`} className="album-grid-item">
                  <Link to="#">
                    <span className="overlay"></span>
                    <img
                      alt={album.title}
                      src={album.artworkURL}
                      className="backlog-album"
                    />
                  </Link>
                  {/* {!loading && <HoverActions album={album} />} */}
                </li>
              ))}
          </ul>
        </section>
      </div>
    )
  );
};

export default Backlog;
