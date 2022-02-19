import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { signup } from '../../store/session';
import InputField from '../InputField';
import InputLabel from '../InputLabel';
import ValidationError from '../ValidationError';
import Button from '../Button';
import './SignupForm.css';

function SignupForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});

  if (sessionUser) {
    return <Redirect to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    return dispatch(
      signup({ email, username, password, confirmPassword })
    ).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) {
        return setErrors(data.errors);
      }
    });
    // if (password === confirmPassword) {
    //   setErrors({});
    //   return dispatch(signup({ email, username, password })).catch(
    //     async (res) => {
    //       const data = await res.json();
    //       if (data && data.errors) setErrors(data.errors);
    //     }
    //   );
    // }
    // return setErrors([
    //   'Confirm Password field must be the same as the Password field',
    // ]);
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="sign-up-form">
        <h2>JOIN CRATES</h2>
        <div className="form-row">
          <InputLabel label="Email address" />
          <InputField
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // error={errors.email}
          />
        </div>
        <div className="form-row form-row-username">
          <InputLabel label="Username" />
          <InputField
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            // error={errors.username}
          />
        </div>
        <div className="form-row form-row-password">
          <InputLabel label="Password" />
          <InputField
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // error={errors.password}
          />
        </div>
        <div className="form-row form-row-confirm">
          <InputLabel label="Confirm password" />
          <InputField
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            // error={errors.confirmPassword}
          />
        </div>
        {/* <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul> */}
        <Button
          className="btn-save btn-register"
          type="submit"
          label="SIGN UP"
        />
        {Object.values(errors).length > 0 &&
          Object.values(errors).map((error) => (
            <ValidationError error={error} />
          ))}
      </form>
    </>
  );
}

export default SignupForm;
