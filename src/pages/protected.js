import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/auth";


export const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
  const { isAuthenticated } = useAuth();
  return (
    
    <Route
      {...rest}
      render={props => {
        if (isAuthenticated) {
          return <Component {...props} />;
        } else {
          return (
            <Navigate to="/" replace />
          );
        }
      }}
    />
  );
};