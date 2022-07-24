import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { selectLoggedInStatus } from "../features/auth/authSlice";

export function PrivateRoute({ children }: { children: JSX.Element }) {
  const isLoggedIn = useAppSelector(selectLoggedInStatus);
  let location = useLocation();

  if (!isLoggedIn) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
