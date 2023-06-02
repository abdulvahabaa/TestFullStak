import React from "react";
import { useEffect, useState } from "react";

import Backdrop from "@mui/material/Backdrop";

import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";

import { Box, Typography, InputBase, Button } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { setPost } from "../state/userState";
import BASE_URL from "../utils/BASE_URL";

import axios from 'axios';

axios.defaults.baseURL = BASE_URL;


const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function EditPost({
  setIsUpdate,
  postId,
  description,
  picturePath,
  isEdit = false,
  postUserId,
  name,
  userPicturePath,
}) {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const dispatch = useDispatch();
  const [desc, setDesc] = useState(description);

  const [image, setImage] = useState(picturePath);

  const { _id } = useSelector((state) => state.userState.user);
  const token = useSelector((state) => state.userState.token);

  const handlePost = async () => {
    try {
      const formData = new FormData();
      formData.append('userId', _id);
      formData.append('description', desc);
      formData.append('postId', postId);
  
      if (image) {
        formData.append('picture', image);
        formData.append('picturePath', image.name);
      }
  
      const response = await axios.put('/posts/edit', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      const posts = response.data;
      console.log(posts);
      dispatch(setPost({ post: posts }));
      setImage(null);
    } catch (error) {
      console.log(error);
    }
  };
  

  return (
    <div>
      <Button onClick={handleOpen}></Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => {
          setIsUpdate(false);
          handleClose();
        }}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Edit Posts
            </Typography>
            <InputBase
              type="text"
              value={desc}
              onChange={(e) => {
                setDesc(e.target.value);
              }}
            />

            <InputBase
              type="file"
              file={image}
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
            ></InputBase>
            <Button
              type="submit"
              onClick={() => {
                handlePost();
                setIsUpdate(false);
                handleClose();
              }}
            >
              Submit
            </Button>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}

export default EditPost;
