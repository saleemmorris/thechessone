import React, { FC, useState, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Input from "../ui/Input";
import Button from "../ui/Button";
import Message from "../ui/Message";
import { signin, setError } from "../../store/actions/authActions";
import { RootState } from "../../store";
import { Link } from "react-router-dom";

const SignIn: FC = () => {
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
      signin(
        {
          email,
          password
        },
        () => setLoading(false)
      )
    );
  };

  return (
    <div className='page'>
      <div className='signin-view'>
        <div className='container'>
          <h2 className='has-text-centered is-size-2 mb-3'>Signin</h2>
          <form className='form' onSubmit={submitHandler}>
            {error && <Message type='danger' msg={error} />}
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
            <p>
              <Link to='/forgot-password'>Forgotten Password</Link>
            </p>
            <Button
              text={loading ? "Loading..." : "Signin"}
              className='is-primary is-fullwidth mt-5'
              disabled={loading}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
