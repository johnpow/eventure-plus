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
import { Checkbox, Tooltip, Divider } from '@mui/material';
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
import FormControlLabel from '@mui/material/FormControlLabel';
import { QUERY_EVENTS, QUERY_USER_SIGNUPS, MY_EVENTS } from '../utils/queries';

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
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

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

  const [removeEvent, { error3 }] = useMutation(REMOVE_EVENT, {
    update(cache, { data: { removeEvent } }) {
      try {
        const { getUserEvents } = cache.readQuery({ query: MY_EVENTS });
        cache.writeQuery({
          query: MY_EVENTS,
          data: { getUserEvents: getUserEvents.filter((event) => event._id !== removeEvent._id) },
        });
      } catch (e) {
        console.error(e);
      }

      try {
        const { events } = cache.readQuery({ query: QUERY_EVENTS });
        cache.writeQuery({
          query: QUERY_EVENTS,
          data: { events: events.filter((event) => event._id !== removeEvent._id) },
        });
      } catch (e) {
        console.error(e);
      }

      try {
        const { userSignups } = cache.readQuery({ query: QUERY_USER_SIGNUPS });
        cache.writeQuery({
          query: QUERY_USER_SIGNUPS,
          data: { userSignups: userSignups.filter((event) => event._id !== removeEvent._id) },
        });
      } catch (e) {
        console.error(e);
      }
    }
  });
  const [checked, setChecked] = useState(props.checked);
  const [edit, setEdit] = useState(false);
  const [expandedPostId, setExpandedPostId] = useState(null);
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleEdit = () => {
    setEdit(!edit);
  };
 
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDelete = async () => {
    try {
        await removeEvent({
            variables: { eventId: props._id },
        });
    }
    catch (error) {
        console.error(error);
    }
    window.location.reload();
  };


  const handleSignUp = async (event) => {
    if(event.target.checked){
        try {
            const {data} = await addSignup({
                variables: { eventId: event.target.id },
            });
        }
        catch (error) {
            console.error(error);
        }
    } else {
        try {
            await removeSignup({
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

  return (
    <Card elevation={5} sx={{ maxWidth: 320, marginBottom: "20px", marginRIght: 'auto', marginLeft: 'auto', borderRadius: '0.5rem' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[700], color: 'white'}} aria-label="user profile image">
            {props.author[0]}
          </Avatar>
        }
        // action={
        //   <IconButton aria-label="settings">
        //     <MoreVertIcon />
        //   </IconButton>
        // }
        title= {props.title}
        subheader= {formatDate(props.date)}
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
        <Typography variant="body2" color="text.primary" marginBottom={2}>
          {props.description}
        </Typography>
        <Typography paragraph><b>Location: </b> {props.city}, {props.state}</Typography>
        <Typography paragraph><b>Category: </b> {props.category}</Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton>
          <Tooltip title="Sign Up">
          <FormControlLabel 
          label={props.signups.length} 
          control={
            <Checkbox              
              checked={checked}
              icon={<HowToRegOutlinedIcon />} 
              checkedIcon={<HowToRegIcon sx={{color:"#009688"}}/>}
              id={props._id}
              onChange={handleSignUp}
            />
          }
          />  
          </Tooltip>
        </IconButton>
        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        <IconButton aria-label="comment" onClick={() => handleExpandCard(props._id)}>
            <InsertCommentTwoToneIcon /> <Typography p={1}> {props.comments.length}</Typography>
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
          title="See signed up users" 
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

export default Event;