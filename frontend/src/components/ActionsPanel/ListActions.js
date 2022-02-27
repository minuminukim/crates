import { ActionsRow } from '.';

const ListActions = ({ userID, sessionUserID, listID, handleDelete }) => {
  return (
    <div className="actions-panel list-actions">
      {userID === sessionUserID && (
        <>
          <ActionsRow
            label="Edit this list..."
            className="list-action list-edit"
            link={`/lists/${listID}/edit`}
          />
          <ActionsRow
            label="Delete this list..."
            className="list-action list-delete"
            onClick={() => handleDelete()}
          />
        </>
      )}
    </div>
  );
};

export default ListActions;
