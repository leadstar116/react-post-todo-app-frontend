import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import Homepage from "../pages/Homepage/Homepage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Homepage />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;
