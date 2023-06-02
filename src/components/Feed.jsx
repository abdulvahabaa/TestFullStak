import { Box, Stack, Skeleton } from "@mui/material";
import React, { useState } from "react";
import Post from "./Post";
import { useDispatch, useSelector } from "react-redux";




const Feed = ({ userId }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.userState.posts);
  const token = useSelector((state) => state.userState.token);

  const [loading, setLoading] = useState(true);



  setTimeout(() => {
    setLoading(false);
  }, [3000]);

  return (
    <Box flex={4} p={{ xs: 0, md: 2 }}>

{Array.isArray(posts) && posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          picturePath,
         
        },index) => {
      return (
        <Post
          key={`${_id}-${index}`}
          postId={_id}
          postUserId={userId}
          name={`${firstName} ${lastName}`}
          description={description}
          picturePath={picturePath} />
      );
    }
      )}


    </Box>
  );
};

export default Feed;