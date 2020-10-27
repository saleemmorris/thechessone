import React, { FC } from "react";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Button from "../ui/Button";
import { RootState } from "../../store";
import { signout } from "../../store/actions/authActions";

const Header: FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { authenticated } = useSelector((state: RootState) => state.auth);

  const logoutClickHandler = () => {
    dispatch(signout());
  };

  return (
    <div className='header'>
      <div className='container'>
        <div className='header-left'>
          {!authenticated ? (
            ""
          ) : (
            <Link to='#'>
              <img
                src={`${process.env.PUBLIC_URL}images/svg/ui/menu-btn.svg`}
                alt='Menu'
              />
            </Link>
          )}
        </div>
        <div className='header-center'>
          <Link to={!authenticated ? "/" : "/dashboard"}>
            <div className='logo-inner'>
              <span className='logo-the'>the </span>
              <span className='logo-chess'>Chess</span>
              <span className='logo-horse'>1</span>
            </div>
          </Link>
        </div>
        {!authenticated ? (
          <div className='header-right'>
            <Button
              text='Signup'
              onClick={() => {
                history.push("/signup");
              }}
            />
            <Button
              text='Signin'
              onClick={() => {
                history.push("/signin");
              }}
            />
          </div>
        ) : (
          <Button text='Sign Out' onClick={logoutClickHandler} />
        )}
      </div>
    </div>
  );
};

export default Header;
