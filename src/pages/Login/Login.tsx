import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectLoggedInStatus } from "../../features/auth/authSlice";
import CircularProgressBar from "../../shared/components/CircularProgressBar/CircularProgressBar";
import styles from "./Login.module.css";
import { useLoginMutation } from "../../app/services/auth";
import { newAlert } from "../../features/alert/alertSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectLoggedInStatus);
  const [login, { isLoading, error }] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (error) {
      dispatch(
        newAlert({ message: (error as any).data.message, type: "error" })
      );
    }
  }, [error, dispatch]);

  const handleLogin = async () => {
    await login({ email, password });
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <Box className={styles.loginPage}>
      <Box className={styles.loginBox}>
        <h1>Login</h1>
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
          color="primary"
          className={styles.actionButton}
          disabled={isLoading}
          onClick={handleLogin}
        >
          {isLoading ? <CircularProgressBar /> : "Login"}
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className={styles.actionButton}
          onClick={handleSignUp}
        >
          Go to Signup
        </Button>
      </Box>
    </Box>
  );
}
