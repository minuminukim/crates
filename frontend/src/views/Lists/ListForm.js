import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory, useLocation, Redirect } from 'react-router-dom';
import { InputField, InputLabel } from '../../components/InputField';
import { SaveButton, CancelButton } from '../../components/Button';
import { ErrorMessages } from '../../components/ValidationError';
import Checkbox from '../../components/Checkbox';
import DraggableList from '../../components/DraggableList/DraggableList';
import areAllUnique from '../../utils/areAllUnique';
import ListFormSearch from './ListFormSearch';
import './ListForm.css';
import {
  createList,
  editList,
  fetchSingleList,
} from '../../store/listsReducer';

const initialForm = {
  title: '',
  description: '',
  isRanked: false,
};

const ListForm = ({ isPost = true }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const { listID } = useParams();
  const user = useSelector((state) => state.session?.user);
  const list = useSelector((state) => state.lists.items[listID]);
  const listAlbums = useSelector((state) => {
    if (!list) return;
    const albumIDs = list.isRanked
      ? [...list.albums].sort((a, b) => a.listIndex - b.listIndex)
      : list.albums;
    return albumIDs.map(({ id }) => state.albums.items[id]);
  });

  // An album was passed in as a prop on the location object when redirected
  // from the 'add to new list' action panel
  const albumData = location.state?.data;
  const [form, setForm] = useState(initialForm);
  const [albums, setAlbums] = useState([]);
  const [errors, setErrors] = useState([]);
  const [message, setMessage] = useState('');
  const [isUnauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    if (isPost && albumData) {
      setAlbums([albumData]);
      return;
    }
  }, [isPost, albumData]);

  useEffect(() => {
    if (!listID) return;
    if (list) {
      const { title, description, isRanked, userID } = list;
      if (userID !== user.id) {
        setUnauthorized(true);
      }

      setForm({
        title,
        description,
        isRanked,
      });
      setAlbums(listAlbums);
      return;
    }

    dispatch(fetchSingleList(+listID)).catch((error) =>
      console.log('error fetching list', error)
    );
  }, [listID, list, history, dispatch, listAlbums, user.id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    if (albums.length === 0) {
      setErrors(['A list must contain at least one album.']);
      return;
    }

    if (!areAllUnique(albums)) {
      setErrors([...errors, 'Albums in a list must all be unique.']);
      return;
    }

    const payload = {
      userID: user.id,
      ...form,
      albums,
    };

    if (!isPost) {
      payload.id = +listID;
    }

    const thunk = isPost ? createList : editList;

    return dispatch(thunk(payload))
      .then((list) => {
        setMessage(`Your list '${list.title}' has been saved successfully.`);
        return list.id;
      })
      .then((listID) =>
        setTimeout(() => history.push(`/lists/${listID}`), 3000)
      )
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors([...Object.values(data.errors)]);
          return;
        }
      });
  };

  const handleFormChange = (e) => {
    const updatedForm = { ...form };
    updatedForm[e.target.name] = e.target.value;
    setForm(updatedForm);
  };

  const handleCheckbox = () => setForm({ ...form, isRanked: !form.isRanked });
  const updateAlbums = (next) => setAlbums(next);
  const updateErrors = (error) => setErrors(error);

  if (isUnauthorized) {
    return <Redirect to="/unauthorized" />;
  }

  return (
    <div className="page-container list-form-page">
      <ErrorMessages success={message} errors={errors} />
      <form className="list-form" onSubmit={handleSubmit}>
        <h1 className="page-heading">{!listID ? 'New List' : 'Edit List'}</h1>
        <div className="list-form-top">
          <div className="list-form-left">
            <div className="form-row">
              <InputLabel label="Name of list" required />
              <InputField
                id="title"
                value={form.title}
                onChange={handleFormChange}
              />
            </div>
            <div className="form-row checkbox">
              <Checkbox value={form.isRanked} onChange={handleCheckbox}>
                <InputLabel label="Ranked list">
                  <p className="label-details">Show position for each album.</p>
                </InputLabel>
              </Checkbox>
            </div>
          </div>
          <div className="list-form-right">
            <div className="form-row">
              <InputLabel label="Description" />
              <textarea
                id="description"
                name="description"
                value={form.description}
                onChange={handleFormChange}
              ></textarea>
            </div>
          </div>
        </div>
        <div className="list-form-bottom">
          <ListFormSearch
            albums={albums}
            updateAlbums={updateAlbums}
            updateErrors={updateErrors}
          />
          <div className="list-form-btns">
            <CancelButton />
            <SaveButton />
          </div>
        </div>
        <DraggableList
          items={albums}
          isRanked={form.isRanked}
          albums={albums}
          updateAlbums={updateAlbums}
        />
      </form>
    </div>
  );
};

export default ListForm;
