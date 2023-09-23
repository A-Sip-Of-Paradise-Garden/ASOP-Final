import React from 'react';
import { Navigate } from 'react-router-dom';
import { UserAuth } from "../context/AuthContext";
import { AUTH_TYPES } from '../constants/authTypes';

const AuthRoute = ({ children, mode }) => {
  const { user, userProfile } = UserAuth();
  const { PROTECTED, UNAUTHENTICATED, ADMIN } = AUTH_TYPES;

  if ((mode === PROTECTED && !user) || (mode === UNAUTHENTICATED && user)) {
    return <Navigate to="/" />;
  }

  if (mode === ADMIN && (!user || !userProfile.isAdmin)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AuthRoute;