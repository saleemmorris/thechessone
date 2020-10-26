import React, { FC, useState, FormEvent, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Input from "../ui/Input";
import Button from "../ui/Button";
import Message from "../ui/Message";
import {
  sendPasswordResetEmail,
  setError,
  setSuccess
} from "../../store/actions/authActions";
import { RootState } from "../../store";

const ForgotPassword: FC = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const { error, success } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    return () => {
      if (error) {
        dispatch(setError(""));
      }
      if (success) {
        dispatch(setSuccess(""));
      }
    };
  }, [error, success, dispatch]);

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await dispatch(sendPasswordResetEmail(email, "Email Sent!"));
    setLoading(false);
  };

  return (
    <div className='page'>
      <div className='forgot-password-view'>
        <div className='container'>
          <h2 className='has-text-centered is-size-2 mb-3'>Reset Password</h2>
          <form className='form' onSubmit={submitHandler}>
            {error && <Message type='danger' msg={error} />}
            {success && <Message type='success' msg={success} />}
            <Input
              name='email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
              placeholder='Email Address'
              label='Email Address'
            />
            <Button
              text={loading ? "Loading..." : "Send Password Reset Email"}
              className='is-primary is-fullwidth mt-5'
              disabled={loading}
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
