import ValidationError, { SuccessMessage } from '.';

const ErrorMessages = ({ success, errors }) => {
  return (
    <>
      {success.length > 0 && (
        <div className="success-container">
          <SuccessMessage message={success} />
        </div>
      )}
      <ul className="validation-errors">
        {errors.length > 0 &&
          errors.map((error, i) => (
            <ValidationError key={`error-${i}`} error={error} />
          ))}
      </ul>
    </>
  );
};

export default ErrorMessages;
