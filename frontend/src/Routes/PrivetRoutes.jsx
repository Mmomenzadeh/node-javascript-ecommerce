import React from "react";
import { Navigate } from "react-router-dom";

export const PrivetRoutes = ({ children }) => {
  return localStorage.getItem("accessToken") ||
    localStorage.getItem("refreshToken") ? (
    <>{children} </>
  ) : (
    <Navigate to="/login" />
  );
};
