import { EditReviewModal } from '../../views/Reviews';
import ActionsRow from './ActionsRow';

const EditReviewPanel = ({ reviewID, albumID }) => {
  return (
    <>
      <EditReviewModal reviewID={reviewID} albumID={albumID}>
        {(toggleEditModal) => (
          <ActionsRow
            className="hover"
            label="Edit or delete this review..."
            onClick={toggleEditModal}
          />
        )}
      </EditReviewModal>
    </>
  );
};

export default EditReviewPanel;
