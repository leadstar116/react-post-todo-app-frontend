import React from "react";
import { Box, Grid, Tooltip } from "@mui/material";
import { IPost } from "../../../../app/services/posts";
import styles from "./Post.module.css";

interface PostProps {
  post: IPost;
  onClick: (post: IPost) => void;
}

export default function Post(props: PostProps) {
  const { post, onClick } = props;

  const makeShortText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  return (
    <Box
      sx={{ width: "100%" }}
      className={styles.post}
      onClick={() => onClick(post)}
    >
      <Grid container spacing={2}>
        <Grid item xs={4} md={2}>
          <Box className={styles.cell}>{post.id}</Box>
        </Grid>
        <Grid item xs={8} md={4}>
          <Box className={styles.cell}>
            <Tooltip title={post.title}>
              <Box>{makeShortText(post.title, 30)}</Box>
            </Tooltip>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box className={styles.cell}>
            <Tooltip title={post.description}>
              <Box>{makeShortText(post.description, 200)}</Box>
            </Tooltip>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
