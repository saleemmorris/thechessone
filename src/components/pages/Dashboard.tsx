import React, { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Message from "../ui/Message";
import { setSuccess } from "../../store/actions/authActions";
import { RootState } from "../../store";

const Dashboard: FC = () => {
  const { user, needVerification, success } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      dispatch(setSuccess(""));
    }
  }, [success, dispatch]);

  return (
    <div className='page'>
      <div className='dashboard-view'>
        <div className='container'>
          {needVerification && (
            <Message type='success' msg='Please Verify Your Email Address' />
          )}
          <h1 className='is-size-1'> Welcome {user?.firstName}</h1>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
