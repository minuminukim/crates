import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ActionsRow } from '.';
import { MdHearing, MdMoreTime } from 'react-icons/md';
import { appendBacklog } from '../../store/backlogsReducer';

const ListenActions = ({ album }) => {
  const sessionUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(appendBacklog(album, sessionUser.id))
      .then((response) => console.log('response', response))
      .catch(async (error) => console.log('error', await error.json()))
  }, [dispatch, sessionUser.id]);
  // const onAdd = () => {
  //   console.log('object');
  //   dispatch(appendBacklog(album, sessionUser.id))
  //     .then((response) => console.log('response', response))
  //     .catch((error) => console.log('error', error));
  // };

  return (
    <ActionsRow className="listen-actions">
      <div className="action-icon">
        <MdHearing className="action-icon" />
        <p className="action-label">Listen</p>
      </div>
      <div className="action-icon">
        {/* <MdMoreTime className="action-icon" onClick={() => onAdd()}/> */}
        <p className="action-label">Backlog</p>
      </div>
    </ActionsRow>
  );
};

export default ListenActions;
