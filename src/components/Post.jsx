import { Favorite, FavoriteBorder, MoreVert, Share } from "@mui/icons-material";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Checkbox,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";


import DeletePost from "./DeletePost";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPost,} from "../state/userState";
import BASE_URL from "../utils/BASE_URL";
import EditPost from "./EditPost";


const Post = ({
  postId,
  postUserId,
  name,
  description,
  picturePath,
  
}) => {

  const [isUpdate, setIsUpdate] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const token = useSelector((state) => state.userState.token);

  const user = useSelector((state) => state.userState.user);
  const loggedInUserId = useSelector((state) => state.userState.user._id);
 
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  



  return (
    <div>
    {isDelete && (
      <DeletePost
        setIsDelete={setIsDelete}
        postId={postId}
        postUserId={postUserId}
        isRemove={true}
      />
    )}
        {isUpdate && (

        <EditPost
          setIsUpdate={setIsUpdate}
          postId={postId}
          postUserId={postUserId}
          name={name}
          description={description}
          picturePath={picturePath}
         
          isEdit={true}
        />
      )}
 
    
    <Card sx={{ margin: 5 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: 'red' }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" onClick={handleClick}>
            <MoreVert />
          </IconButton>
        }
        title={name}
        subheader="September 14, 2022"
      />

      {picturePath && (
        <CardMedia
          component="img"
          height="20%"
          image={`http://localhost:3001/assets/${picturePath}`}
          alt="No image"
        />
      )}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <Checkbox
            icon={<FavoriteBorder />}
            checkedIcon={<Favorite sx={{ color: 'red' }} />}
          />
        </IconButton>
        <IconButton aria-label="share">
          <Share />
        </IconButton>
      </CardActions>

      <Menu
        id="demo-positioned-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={() => {
                        setIsUpdate(true);
                        handleClose();
                      }}
                      >Edit</MenuItem>
        <MenuItem   sx={{color:"red"}}
                      onClick={() => {
                        setIsDelete(true);
                     
                        handleClose();
                      }}>Delete</MenuItem>
        
      </Menu>
    </Card>
 
    </div>
  );
};

export default Post;