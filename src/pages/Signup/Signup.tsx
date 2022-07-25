import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import styles from "./Signup.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectLoggedInStatus } from "../../features/auth/authSlice";
import CircularProgressBar from "../../shared/components/CircularProgressBar/CircularProgressBar";
import { useRegisterMutation } from "../../app/services/auth";
import { newAlert } from "../../features/alert/alertSlice";

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectLoggedInStatus);
  const [register, { isLoading, error }] = useRegisterMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (error) {
      dispatch(
        newAlert({ message: (error as any).data.message, type: "error" })
      );
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = () => {
    navigate("/login");
  };
  const handleSignup = async () => {
    await register({ email, password });
  };

  return (
    <Box className={styles.signUpPage}>
      <Box className={styles.signUpBox}>
        <h1>SignUp</h1>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          margin="normal"
        />
        <TextField
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          margin="dense"
        />
        <Button
          variant="contained"
          color="secondary"
          className={styles.actionButton}
          disabled={isLoading}
          onClick={handleSignup}
        >
          {isLoading ? <CircularProgressBar /> : "Register"}
        </Button>
        <Button
          variant="contained"
          color="primary"
          className={styles.actionButton}
          onClick={handleLogin}
        >
          Go to Login
        </Button>
      </Box>
    </Box>
  );
}
