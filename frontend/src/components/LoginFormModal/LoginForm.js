import React, { useState } from 'react';
import { login } from '../../store/session';
import { useDispatch } from 'react-redux';
import Button from '../Button';
import { InputField, InputLabel } from '../InputField';
import { AiOutlineClose } from 'react-icons/ai';
import ValidationError from '../ValidationError';
import './LoginForm.css';

function LoginForm({ handleModal }) {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

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
        <AiOutlineClose
          className="close-icon"
          onClick={handleModal}
          style={{ cursor: 'pointer' }}
        />
        <div>
          <InputLabel label="Username or Email" />
          <InputField
            type="text"
            id="credential"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </div>
        <div>
          <InputLabel label="Password" />
          <InputField
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" label="SIGN IN" size="medium" color="green" />
      </form>
      <ul className="validation-errors">
        {errors.map((error, idx) => (
          <ValidationError key={`error-${idx}`} error={error} />
        ))}
      </ul>
    </>
  );
}

export default LoginForm;
