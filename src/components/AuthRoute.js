import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from "../context/AuthContext";
import { AUTH_TYPES } from '../constants/authTypes';

const AuthRoute = ({ children, mode }) => {
  const { user } = UserAuth();
  const { PROTECTED, UNAUTHENTICATED } = AUTH_TYPES;

  if ((mode === PROTECTED && !user) || (mode === UNAUTHENTICATED && user)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AuthRoute;