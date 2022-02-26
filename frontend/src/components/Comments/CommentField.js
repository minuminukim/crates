const CommentField = ({ onChange, value, placeholder = '' }) => {
  return (
    <textarea
      className="comment-field"
      id="body"
      name="body"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    ></textarea>
  );
};

export default CommentField;
