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
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Checkbox, Tooltip, Divider } from '@mui/material';
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
import { QUERY_EVENTS, QUERY_USER_SIGNUPS, MY_EVENTS } from '../utils/queries';

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

const Post = (props) => {
  console.log(props.signups)
  const [expanded, setExpanded] = useState(false);
  const [addSignup, { error }] = useMutation(ADD_SIGNUP, {
    update(cache, { data: { addSignup } }) {
      try {
        const { events } = cache.readQuery({ query: QUERY_EVENTS });
        cache.writeQuery({
          query: QUERY_EVENTS,
          data: { events: events.map((event) => event._id === addSignup._id ? { ...event, signups: [...event.signups, addSignup] } : event) },
        });
      } catch (e) {
        console.error(e);
      }

      try {
        const { getUserSignups} = cache.readQuery({ query: QUERY_USER_SIGNUPS }); 
        cache.writeQuery({
          query: QUERY_USER_SIGNUPS,
          data: { getUserSignups: [...getUserSignups, addSignup] },
        });
      } catch (e) {
        console.error(e);
      }

      try {
        const { myEvents } = cache.readQuery({ query: MY_EVENTS });
        cache.writeQuery({
          query: MY_EVENTS,
          data: { myEvents: [...myEvents, addSignup] },
        });               
      } catch (e) {
        console.error(e);
      }
      
    },
  });

  const [removeSignup, { error2 }] = useMutation(REMOVE_SIGNUP, {
    update(cache, { data: { removeSignup } }) {
      try {
        const { events } = cache.readQuery({ query: QUERY_EVENTS });
        cache.writeQuery({
          query: QUERY_EVENTS,
          data: { events: events.map((event) => event._id === props._id ? { ...event, signups: [...event.signups.filter((signup) => signup._id !== removeSignup.signups._id)] } : event) },
        });
      } catch (e) {
        console.error(e);
      }

      try {
        const { getUserSignups} = cache.readQuery({ query: QUERY_USER_SIGNUPS });
        cache.writeQuery({
          query: QUERY_USER_SIGNUPS,
          data: { getUserSignups: getUserSignups.filter((event) => event._id !== props._id) },
        });
      } catch (e) {
        console.error(e);
      }

      try {
        const { myEvents } = cache.readQuery({ query: MY_EVENTS });
        cache.writeQuery({
          query: MY_EVENTS,
          data: { myEvents: myEvents.map((event) => event._id === props._id ? { ...event, signups: [...event.signups.filter((signup) => signup._id !== removeSignup.signups._id)] } : event) },
        });               
      } catch (e) {
        console.error(e);
      }
    },
  });

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
    <Card elevation={5} sx={{ maxWidth: 320, marginBottom: "20px", marginRIght: 'auto', marginLeft: 'auto', borderRadius: '0.5rem' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[700], color: 'white' }} aria-label="user profile image">
            {props.author[0]}
          </Avatar>
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
      <CardContent >
        <Typography variant="body2" color="text.primary"  marginBottom={2}>
          {props.description}
        </Typography>
        <Typography paragraph><b>Location: </b> {props.city}, {props.state}</Typography>
        <Typography paragraph><b>Category: </b> {props.category}</Typography>
      </CardContent>
      <CardActions disableSpacing>
      <Tooltip title="Sign Up">
          <IconButton >
          <FormControlLabel 
          label={props.signups.length} 
          control={
            <Checkbox              
              checked={checked}
              icon={<HowToRegOutlinedIcon />} 
              checkedIcon={<HowToRegIcon sx={{color:'#009688'}}/>}
              id={props._id}
              onChange={handleSignUp}
            />
          }
          />
        </IconButton>
        </Tooltip>
        <IconButton aria-label="comment" onClick={() => handleExpandCard(props._id)}>
            <InsertCommentTwoToneIcon /> <Typography p={1}> {props.comments.length}</Typography>
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          title="See signed up accounts"
        >
        <ExpandMoreIcon />
        </ExpandMore>
       
      </CardActions>
      {open && expandedPostId === props._id && (
        <ExpandedCard eventId= {expandedPostId} comments={props.comments} />
      )}
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent >
          <Card elevation={5} sx={{ maxWidth: 300, marginBottom: '15px', borderRadius: '1rem' }}>
          <CardContent sx={{ padding: '20px 20px 0' }}>
            <Typography paragraph ><b>Created by:</b> {props.author}</Typography>
            <Typography sx={{ fontStyle: 'italic' }} >Users attending:</Typography>
            <Divider sx={{marginBottom: "16px" }} />
              {props.signups.map((signup) => (
                <Typography paragraph key={signup._id}>
              {signup.username}
            </Typography> 
          ))}
          </CardContent>
          </Card>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Post;