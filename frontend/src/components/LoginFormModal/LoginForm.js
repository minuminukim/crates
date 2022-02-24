import React, { useState } from 'react';
import { login } from '../../store/session';
import { useDispatch } from 'react-redux';
import Button from '../Button';
import { InputField, InputLabel } from '../InputField';
import { AiOutlineClose } from 'react-icons/ai';
import ValidationError from '../ValidationError';
import { useDemo } from '../../hooks';
import './LoginForm.css';

function LoginForm({ handleModal }) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);
  const { handleDemoUser } = useDemo();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(login({ credential, password })).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(Object.values(data.errors));
    });
  };

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-header">
          <h1 className="page-heading">Sign In</h1>
          <AiOutlineClose className="close-icon large" onClick={handleModal} />
        </div>
        <div className="form-row">
          <InputLabel className="login" label="Username or Email" />
          <InputField
            type="text"
            id="credential"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </div>
        <div className="form-row">
          <InputLabel className="login" label="Password" />
          <InputField
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="row-btn">
          <Button
            className="btn-save"
            type="submit"
            label="SIGN IN"
            size="medium"
            color="green"
          />
          <Button
            className="btn-save"
            label="TRY DEMO"
            // size="medium"
            onClick={handleDemoUser}
          />
        </div>
      </form>
      <ul className="validation-errors">
        {errors.map((error, idx) => (
          <ValidationError key={`error-${idx}`} error={error} index={idx} />
        ))}
      </ul>
    </>
  );
}

export default LoginForm;
