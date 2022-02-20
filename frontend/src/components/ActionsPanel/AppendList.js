import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchUserLists, appendList } from '../../store/listsReducer';
import ValidationError from '../ValidationError';
import './AppendList.css';
import Button from '../Button';
// need userID, user lists(length && title), album title
const AppendList = ({ album }) => {
  const user = useSelector((state) => state.session.user);
  const [lists, setLists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [chosen, setChosen] = useState(null);
  const [errors, setErrors] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    return dispatch(fetchUserLists(user.id))
      .then((items) => items.filter((item) => item.userID === user.id))
      .then((filtered) => setLists(filtered))
      .then(() => setIsLoading(false))
      .catch((err) => console.log('error fetching user lists', err));
  }, [dispatch]);

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
      .then((list) => console.log('success', list))
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
