import { PostReviewModal } from '../../views/Reviews';
import ActionsRow from './ActionsRow';

// Take in album object rather than albumID in instance
// review is being created for an album pulled from spotify API
// that doesn't yet exist in the store
const PostReviewPanel = ({ album }) => {
  return (
    <>
      <PostReviewModal album={album}>
        {(togglePostModal) => (
          <ActionsRow
            label="Review or log..."
            onClick={togglePostModal}
            className="hover"
          />
        )}
      </PostReviewModal>
    </>
  );
};

export default PostReviewPanel;
