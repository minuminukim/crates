import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signup } from '../../store/session';
import { InputField, InputLabel } from '../InputField';
import ValidationError from '../ValidationError';
import Button from '../Button';
import { AiOutlineClose } from 'react-icons/ai';

import './SignupForm.css';

function SignupForm({ onClose }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) {
    return <Redirect to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    return dispatch(
      signup({ email, username, password, confirmPassword })
    ).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        return setErrors(Object.values(data.errors));
      }
    });
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="sign-up-form">
        <div className="form-header">
          <h1>JOIN CRATES</h1>
          <AiOutlineClose className="close-icon large" onClick={onClose} />
        </div>
        <div className="form-row">
          <InputLabel label="Email address" />
          <InputField
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-row form-row-username">
          <InputLabel label="Username" />
          <InputField
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-row form-row-password">
          <InputLabel label="Password" />
          <InputField
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-row form-row-confirm">
          <InputLabel label="Confirm password" />
          <InputField
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <div className="form-row-btn">
          <Button
            className="btn-save btn-register"
            type="submit"
            label="SIGN UP"
          />
        </div>
        <ul className="validation-errors">
          {errors.length > 0 &&
            errors.map((error, i) => (
              <ValidationError key={`error-${i}`} error={error} index={i} />
            ))}
        </ul>
      </form>
    </>
  );
}

export default SignupForm;
