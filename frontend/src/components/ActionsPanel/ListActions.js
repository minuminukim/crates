import { ActionsRow } from '.';

const ListActions = ({ userID, sessionUserID, listID, handleDelete }) => {
  return (
    <div className="actions-panel edit-actions">
      {userID === sessionUserID && (
        <>
          <ActionsRow
            label="Edit this list..."
            className="list-action"
            link={`/lists/${listID}/edit`}
          />
          <ActionsRow
            label="Delete this list..."
            className="list-action delete"
            onClick={() => handleDelete()}
          />
        </>
      )}
    </div>
  );
};

export default ListActions;
