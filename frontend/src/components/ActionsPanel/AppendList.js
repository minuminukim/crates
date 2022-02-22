import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { fetchUserLists, appendList } from '../../store/listsReducer';
import ValidationError from '../ValidationError';
import { SuccessMessage } from '../ValidationError';
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
        // .then((items) => items.filter((item) => item.userID === user.id))
        .then((items) => setLists(items))
        .then(() => setIsLoading(false))
        .catch((err) => console.log('error fetching user lists', err))
    );
  }, [dispatch, user.id]);

  const handleDispatch = () => {
    console.log('album', album);
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
          `You have successfully added ${album.title} to your list ${list.title}`
        )
      )
      .then(() => setTimeout(() => history.go(0), 3000))
      .catch(async (res) => {
        const data = await res.json();
        console.log('res', data);
        if (data && data.errors) {
          return setErrors(data.errors);
        }
      });
  };

  return (
    !isLoading &&
    lists?.length > 0 && (
      <div className="action-panel append-list">
        {message.length > 0 && <SuccessMessage message={message} />}
        {errors.length > 0 &&
          errors.map((error, i) => (
            <ValidationError key={`error-${i}`} error={error} />
          ))}
        <h1 className="panel-heading">Add '{album.title}' to lists</h1>
        <ul className="user-lists">
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
              <p>{`${list.albums.length} album(s)`}</p>
            </li>
          ))}
        </ul>
        <div className="action-panel-footer">
          <Button
            label="ADD"
            className="btn-save"
            size="medium"
            onClick={() => handleDispatch()}
          />
        </div>
      </div>
    )
  );
};

export default AppendList;
