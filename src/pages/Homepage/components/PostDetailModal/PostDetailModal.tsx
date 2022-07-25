import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
  Box,
} from "@mui/material";
import {
  IPost,
  useDeletePostMutation,
  useUpdatePostMutation,
} from "../../../../app/services/posts";
import styles from "./PostDetailModal.module.css";
import CircularProgressBar from "../../../../shared/components/CircularProgressBar/CircularProgressBar";
import { useAppDispatch } from "../../../../app/hooks";
import { newAlert } from "../../../../features/alert/alertSlice";

interface PostDetailModalProps {
  post: IPost;
  open: boolean;
  onClose: () => void;
}

export default function PostDetailModal(props: PostDetailModalProps) {
  const { post, open, onClose } = props;

  const dispatch = useAppDispatch();
  const [newTitle, setNewTitle] = useState(post.title);
  const [newDescription, setNewDescription] = useState(post.description);

  const [
    updatePost,
    {
      isLoading: updateLoading,
      error: updateError,
      isSuccess: isUpdateSuccess,
    },
  ] = useUpdatePostMutation();
  const [
    deletePost,
    {
      isLoading: deleteLoading,
      error: deleteError,
      isSuccess: isDeleteSuccess,
    },
  ] = useDeletePostMutation();

  useEffect(() => {
    if (isUpdateSuccess || isDeleteSuccess || updateError || deleteError) {
      const message = isUpdateSuccess
        ? "Post updated successfully"
        : isDeleteSuccess
        ? "Post deleted successfully"
        : updateError
        ? (updateError as any).data.message
        : deleteError
        ? (deleteError as any).data.message
        : "";
      dispatch(
        newAlert({
          message,
          type: isUpdateSuccess || isDeleteSuccess ? "success" : "error",
        })
      );
    }
  }, [isUpdateSuccess, isDeleteSuccess, updateError, deleteError, dispatch]);

  const handleUpdate = async () => {
    await updatePost({
      id: post.id,
      title: newTitle,
      description: newDescription,
    });
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await deletePost(post.id);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Post</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Edit the post title and description below.
        </DialogContentText>
        <Box className={styles.content}>
          <TextField
            label="Title"
            margin="normal"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <TextField
            label="Description"
            margin="normal"
            rows={4}
            multiline
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "center" }}>
        <Button variant="contained" color="info" onClick={onClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="success"
          disabled={updateLoading || deleteLoading}
          onClick={handleUpdate}
        >
          {updateLoading ? <CircularProgressBar /> : "Update"}
        </Button>
        <Button
          variant="contained"
          color="error"
          disabled={updateLoading || deleteLoading}
          onClick={handleDelete}
        >
          {deleteLoading ? <CircularProgressBar /> : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
