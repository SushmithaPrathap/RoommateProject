import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../../api/context";
import { apiAuth, apiUsers } from "../../api";

export default function PrivateRoute({ children }) {
  const { auth } = useAuth();
  
    if (apiAuth.isAuth()==false) {
      return <Navigate to="/login" />;
    }

    return children;


}