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
import { ADD_SIGNUP, REMOVE_SIGNUP } from '../utils/mutations';
import dayjs from 'dayjs';
import ExpandedCard from './CommentDialog';
import InsertCommentTwoToneIcon from '@mui/icons-material/InsertCommentTwoTone';
import FormControlLabel from '@mui/material/FormControlLabel';

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

const Post2 = (props) => {
  const [expanded, setExpanded] = useState(false);
  const [addSignup, { error }] = useMutation(ADD_SIGNUP);
  const [removeSignup, { error2 }] = useMutation(REMOVE_SIGNUP);
  const [checked, setChecked] = useState(props.checked);
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [open, setOpen] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleExpandCard = (postId) => {
    setExpandedPostId(postId);
    setOpen(!open);
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
        <Typography variant="body2" color="text.secondary"  marginBottom={2}>
          {props.description}
        </Typography>
        <Typography paragraph><b>Location: </b> {props.city}, {props.state}</Typography>
        <Typography paragraph><b>Category: </b> {props.category}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="share">
          <Tooltip title="Sign Up">
          <FormControlLabel 
          label={props.signups.length} 
          control={
            <Checkbox              
              checked={checked}
              icon={<HowToRegOutlinedIcon />} 
              checkedIcon={<HowToRegIcon sx={{color:"blue"}}/>}
              id={props._id}
              onChange={handleSignUp}
            />
          }
          />
          </Tooltip>
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton aria-label="comment" onClick={() => handleExpandCard(props._id)}>
            <InsertCommentTwoToneIcon /> <Typography p={1}> {props.comments.length}</Typography>
        </IconButton>
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
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {/* <Typography paragraph><b>Location: </b> {props.location}</Typography>
          <Typography paragraph><b>Category: </b> {props.category}</Typography> */}
          {props.signups.map((signup) => (
            <Typography paragraph key={signup._id}>
              {signup.username}
            </Typography> 
          ))}
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Post2;