import React, { useState } from "react";
import { Box, Grid, Paper } from "@mui/material";
import styles from "./PostsList.module.css";
import Post from "../Post/Post";
import { IPost } from "../../../../app/services/posts";
import PostDetailModal from "../PostDetailModal/PostDetailModal";

interface PostsListProps {
  posts: IPost[];
}

export default function PostsList(props: PostsListProps) {
  const { posts } = props;

  const [openDetails, setOpenDetails] = useState<boolean>(false);
  const [openPost, setOpenPost] = useState<IPost | null>(null);

  const handlePostClick = (post: IPost) => {
    setOpenDetails(true);
    setOpenPost(post);
  };

  const handleModalClose = () => {
    setOpenDetails(false);
    setOpenPost(null);
  };

  return (
    <Paper className={styles.postsList} elevation={3}>
      <Grid container spacing={2} className={styles.header}>
        <Grid item xs={4} md={2}>
          <Box className={styles.headerText}>Id</Box>
        </Grid>
        <Grid item xs={8} md={4}>
          <Box className={styles.headerText}>Title</Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box className={styles.headerText}>Description</Box>
        </Grid>
      </Grid>
      {posts.length === 0 ? (
        <Box className={styles.noPostText}>No Posts</Box>
      ) : (
        posts.map((post, index) => (
          <Post post={post} key={index} onClick={handlePostClick} />
        ))
      )}
      {openDetails && openPost && (
        <PostDetailModal
          post={openPost}
          open={openDetails}
          onClose={handleModalClose}
        />
      )}
    </Paper>
  );
}
