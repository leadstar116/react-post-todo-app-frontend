import React, { useEffect, useState } from "react";
import { Box, Button, TextField } from "@mui/material";
import styles from "./NewPostForm.module.css";
import { useCreatePostMutation } from "../../../../app/services/posts";
import CircularProgressBar from "../../../../shared/components/CircularProgressBar/CircularProgressBar";
import { useAppDispatch } from "../../../../app/hooks";
import { newAlert } from "../../../../features/alert/alertSlice";

export default function NewPostForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [createPost, { isLoading, isSuccess }] = useCreatePostMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        newAlert({ message: "Post created successfully", type: "success" })
      );
    }
  }, [isSuccess, dispatch]);

  const handleAddNewPost = async () => {
    await createPost({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <Box className={styles.newPostForm}>
      <TextField
        label="Title"
        margin="normal"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Description"
        margin="normal"
        rows={4}
        multiline
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Button
        className={styles.addNewPostBtn}
        variant="contained"
        color="primary"
        disabled={isLoading}
        onClick={handleAddNewPost}
      >
        {isLoading ? <CircularProgressBar /> : "Add new post"}
      </Button>
    </Box>
  );
}
