import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Switch } from "react-router-dom";

import Header from "./components/sections/Header";
import Footer from "./components/sections/Footer";
import SignUp from "./components/pages/SignUp";
import SignIn from "./components/pages/SignIn";
import ForgotPassword from "./components/pages/ForgotPassword";
import Homepage from "./components/pages/Homepage";
import Dashboard from "./components/pages/Dashboard";
import PrivateRoutes from "./components/auth/PrivateRoutes";
import PublicRoutes from "./components/auth/PublicRoutes";
import Loader from "./components/ui/Loader";
import firebase from "./firebase/config";
import {
  getUserById,
  setLoading,
  setNeedVerification
} from "./store/actions/authActions";
import { RootState } from "./store";

import "./resources/scss/main.scss";

const App: FC = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    dispatch(setLoading(true));
    const unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        dispatch(setLoading(true));
        await dispatch(getUserById(user.uid));
        if (!user.emailVerified) {
          dispatch(setNeedVerification());
        }
      }
      dispatch(setLoading(false));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return (
    <BrowserRouter>
      <div className='main'>
        <div className='l-spacer'></div>
        <Header />
        <Switch>
          <PublicRoutes path='/' component={Homepage} exact />
          <PublicRoutes path='/signup' component={SignUp} exact />
          <PublicRoutes path='/signin' component={SignIn} exact />
          <PublicRoutes
            path='/forgot-password'
            component={ForgotPassword}
            exact
          />
          <PublicRoutes path='*' component={Homepage} />
          <PrivateRoutes path='/dashboard' component={Dashboard} exact />
          <PublicRoutes path='*' component={Dashboard} />
        </Switch>
        <div className='r-spacer'></div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
