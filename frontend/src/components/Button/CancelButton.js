import { useHistory } from 'react-router-dom';
import Button from './Button';

const CancelButton = () => {
  const history = useHistory();

  return (
    <Button
      className="btn-cancel"
      label="CANCEL"
      onClick={() => history.goBack()}
    />
  );
};

export default CancelButton;
