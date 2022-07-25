import React from "react";
import { Box, Skeleton, Button } from "@mui/material";
import styles from "./Homepage.module.css";
import NewPostForm from "./components/NewPostForm/NewPostForm";
import PostsList from "./components/PostsList/PostsList";
import { useGetPostsQuery } from "../../app/services/posts";
import { useAppDispatch } from "../../app/hooks";
import { logout } from "../../features/auth/authSlice";

export default function Homepage() {
  const { data: userPosts, isLoading } = useGetPostsQuery();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Box className={styles.homepage}>
      <Box sx={{ width: "100%", textAlign: "right" }}>
        <Button variant="contained" color="error" onClick={handleLogout}>
          Logout
        </Button>
      </Box>
      <h1>Manage your posts</h1>
      <NewPostForm />
      {isLoading || !userPosts ? (
        <Box sx={{ margin: "30px 0", width: "100%" }}>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton />
        </Box>
      ) : (
        <PostsList posts={userPosts} />
      )}
    </Box>
  );
}
