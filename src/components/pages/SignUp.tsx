import React, { FC, useState, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "../../resources/scss/signup.scss";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Message from "../ui/Message";
import {
  facebookSignup,
  googleSignup,
  signup,
  setError
  // twitterSignup
} from "../../store/actions/authActions";
import { RootState } from "../../store";

const Signup: FC = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(""));
      }
    };
  }, [error, dispatch]);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    dispatch(
      signup(
        {
          email,
          password,
          username,
          lastName,
          firstName
        },
        () => setLoading(false)
      )
    );
  };

  const authGoogleProviderSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    googleSignup();
  };

  const authFacebookProviderSubmitHandler = (e: FormEvent) => {
    e.preventDefault();
    facebookSignup();
  };

  // const authTwitterProviderSubmitHandler = (e: FormEvent) => {
  //   e.preventDefault();
  //   dispatch(twitterSignup());
  // };

  return (
    <div className='page'>
      <div className='signup-view'>
        <div className='container'>
          <h2 className='has-text-centered is-size-2 mb-3'>Signup</h2>
          <form className='form' onSubmit={submitHandler}>
            {error && <Message type='danger' msg={error} />}
            <Input
              name='username'
              type='text'
              value={username}
              onChange={(e) => setUsername(e.currentTarget.value)}
              placeholder='Username'
              label='Username'
            />
            <Input
              name='firstName'
              type='text'
              value={firstName}
              onChange={(e) => setFirstName(e.currentTarget.value)}
              placeholder='First Name'
              label='First Name'
            />
            <Input
              name='lastName'
              type='text'
              value={lastName}
              onChange={(e) => setLastName(e.currentTarget.value)}
              placeholder='Last Name'
              label='Last Name'
            />
            <Input
              name='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              placeholder='Email'
              label='Email'
            />
            <Input
              name='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
              placeholder='Password'
              label='Password'
            />
            <Button
              text={loading ? "Loading..." : "Signup"}
              className='is-primary is-fullwidth mt-5'
              disabled={loading}
            />
          </form>
          <div className='text-center my-15'>or</div>
          <div className='center'>
            <form className='form' onSubmit={authFacebookProviderSubmitHandler}>
              <button className='auth-provider' type='submit'>
                <img
                  src='/images/ui/btns/signup/facebook-signup.png'
                  alt='Login with Facebook'
                  height='60'
                />
              </button>
            </form>
            <form className='form' onSubmit={authGoogleProviderSubmitHandler}>
              <button className='auth-provider' type='submit'>
                <img
                  src='/images/ui/btns/signup/google-signup.png'
                  alt='Login with Google'
                  height='60'
                />
              </button>
            </form>
            {/* <p>
              <form
                className='form'
                onSubmit={authTwitterProviderSubmitHandler}
              >
                <button className='auth-provider' type='submit'>
                  <img
                    src='/images/ui/btns/signup/twitter-signup.png'
                    alt='Login with Twitter'
                    height='60'
                  />
                </button>
              </form>
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
