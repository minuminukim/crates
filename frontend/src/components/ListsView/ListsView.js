import { useHistory } from 'react-router-dom';
import Button from '../Button';

const ListsView = () => {
  const history = useHistory();
  return (
    <div className="page-container lists-view-container">
      <section className="lists-header">
        <h1 className="page-heading">
          Collect, curate, and share. Lists are the perfect way to group albums.
        </h1>
        <Button
          label="Start your own list"
          onClick={() => history.push('/lists/new')}
        />
      </section>
    </div>
  );
};

export default ListsView;
