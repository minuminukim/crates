import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { fetchUserLists, appendList } from '../../store/listsReducer';
import { ErrorMessages } from '../ValidationError';
import { AiOutlinePlus } from 'react-icons/ai';
import './AppendList.css';
import Button from '../Button';
// need userID, user lists(length && title), album title
const AppendList = ({ album, onClose }) => {
  const user = useSelector((state) => state.session.user);
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [chosen, setChosen] = useState(null);
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    return (
      dispatch(fetchUserLists(user.id))
        .then((items) => setLists(items))
        .then(() => setIsLoading(false))
        .catch((err) => err)
    );
  }, [dispatch, user.id]);

  const handleDispatch = () => {
    setErrors([]);
    const payload = {
      listID: chosen,
      albumID: album.id,
      spotifyID: album.spotifyID,
      artworkURL: album.artworkURL,
      title: album.title,
      artist: album.artist,
      releaseYear: album.releaseYear,
    };

    return dispatch(appendList(payload))
      .then((list) =>
        setMessage(
          `You have successfully added '${album.title}' to your list '${list.title}'`
        )
      )
      .then(() => setTimeout(() => history.go(0), 2500))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          return setErrors(data.errors);
        }
      });
  };

  return (
    !isLoading && (
      <div className="action-panel append-list">
        <ErrorMessages success={message} errors={errors} />
        <div className="panel-header">
          <h1 className="panel-heading">Add '{album.title}' to lists</h1>
        </div>
        <ul className="user-lists">
          <li className="new-list user-lists-item">
            <Link to={{ pathname: '/lists/new', state: { data: album } }}>
              <span className="append-list-icon">
                <AiOutlinePlus />
              </span>
              New list...
            </Link>
          </li>
          {lists.map((list, i) => (
            <li
              key={`list-${i}`}
              className={
                chosen === list.id
                  ? `user-lists-item chosen`
                  : `user-lists-item`
              }
              onClick={() => setChosen(list.id)}
            >
              <p>{list.title}</p>
            </li>
          ))}
        </ul>
        <div className="action-panel-footer">
          <Button
            label="ADD"
            className="btn-save"
            size="medium"
            onClick={() => handleDispatch()}
            disabled={!chosen}
          />
        </div>
      </div>
    )
  );
};

export default AppendList;
