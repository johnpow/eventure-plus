import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Checkbox, Tooltip } from '@mui/material';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_SIGNUP, REMOVE_SIGNUP, REMOVE_EVENT } from '../utils/mutations';
import dayjs from 'dayjs';
import InsertCommentTwoToneIcon from '@mui/icons-material/InsertCommentTwoTone';
import ExpandedCard from './CommentDialog';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import Edit from './Edit';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Button } from '@mui/material';


import ArtsAndCraftsImg from '../images/cards/ArtsandCrafts.png';
import EducationImg from '../images/cards/Education.png';
import EntertainmentImg from '../images/cards/Entertainment.png';
import BoardgamesImg from '../images/cards/Boardgames.png';
import MusicImg from '../images/cards/Music.png';
import OutdoorsImg from '../images/cards/Outdoors.png';
import PetsImg from '../images/cards/Pets.png';
import SocialImg from '../images/cards/Social.png';
import SportsImg from '../images/cards/Sports.png';
import TechImg from '../images/cards/Tech.png';
import defaultImg from '../images/cards/defaultImg.png';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

const formatDate = (dateValue) => {
    const formattedDate = dayjs.unix(dateValue/1000).format('MMMM DD YYYY h:mm A');
    return formattedDate;
  };

const Event = (props) => {
  const [expanded, setExpanded] = React.useState(false);
  const [addSignup, { error }] = useMutation(ADD_SIGNUP);
  const [removeSignup, { error2 }] = useMutation(REMOVE_SIGNUP);
  const [removeEvent, { error3 }] = useMutation(REMOVE_EVENT);
  const [checked, setChecked] = useState(props.checked);
  const [edit, setEdit] = useState(false);
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [comments, setComments] = useState({});
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleEdit = () => {
    setEdit(!edit);
  };
 
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDelete = () => {
    try {
        removeEvent({
            variables: { eventId: props._id },
        });
        window.location.reload();
    }
    catch (error) {
        console.error(error);
    }
  };


  const handleSignUp = (event) => {
    if(event.target.checked){
        try {
            const {data} = addSignup({
                variables: { eventId: event.target.id },
            });
        }
        catch (error) {
            console.error(error);
        }
    } else {
        try {
            removeSignup({
                variables: { eventId: event.target.id },
            });
        }
        catch (error) {
            console.error(error);
        }
    }
    setChecked(event.target.checked);
  };  

  const handleExpandCard = (postId) => {
    setExpandedPostId(postId);
    setOpen(!open);
  };

  const handleSaveComment = (postId, comment) => {
    setComments((prevComments) => ({
      ...prevComments,
      [postId]: comment,
    }));
    setExpandedPostId(null);
  };

  return (
    <Card elevation={3} sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="user profile image">
            {props.author[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title= {props.title}
        subheader={formatDate(props.date)}
      />
      <CardMedia
        component="img"
        height="220"
        image={
          props.category === 'Arts and Crafts' ? ArtsAndCraftsImg :
          props.category === 'Education' ? EducationImg :
          props.category === 'Entertainment' ? EntertainmentImg :
          props.category === 'Music' ? MusicImg :
          props.category === 'Outdoors' ? OutdoorsImg :
          props.category === 'Pets' ? PetsImg :
          props.category === 'Social' ? SocialImg :
          props.category === 'Sports' ? SportsImg :
          props.category === 'Tech' ? TechImg :
          props.category === 'Boardgames' ? BoardgamesImg :
          defaultImg 
         } 
       alt="event image"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton>
          <Tooltip title="Sign Up">
              <Checkbox 
              checked={checked}
              icon={<HowToRegOutlinedIcon />} 
              checkedIcon={<HowToRegIcon sx={{color:"blue"}}/>}
              id={props._id}
              onChange={handleSignUp}
              />
          </Tooltip>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="comment" onClick={() => handleExpandCard(props._id)}>
            <InsertCommentTwoToneIcon />
        </IconButton>
        <IconButton aria-label="edit" onClick={handleEdit}>
            <EditTwoToneIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={()=>setDialogOpen(true)}>
            <DeleteTwoToneIcon />
        </IconButton>
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>Delete Confirmation</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this item?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDelete} color="secondary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      {open && expandedPostId === props._id && (
        <ExpandedCard eventId= {expandedPostId} comments={props.comments} />
      )}
      {edit && (
        <Edit open 
        {...props}
        />
      )}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph><b>Location: </b> {props.location}</Typography>
          <Typography paragraph><b>Category: </b> {props.category}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Event;