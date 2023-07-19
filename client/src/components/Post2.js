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
import CampingImg from '../images/cards/Camping.png';
import { Checkbox, Tooltip } from '@mui/material';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_SIGNUP, REMOVE_SIGNUP } from '../utils/mutations';
import dayjs from 'dayjs';


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
  const [expanded, setExpanded] = React.useState(false);
  const [addSignup, { error }] = useMutation(ADD_SIGNUP);
  const [removeSignup, { error2 }] = useMutation(REMOVE_SIGNUP);
  const [checked, setChecked] = useState(props.checked);

  const handleExpandClick = () => {
    setExpanded(!expanded);
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
        height="194"
        image= {CampingImg}
        alt="event image"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="share">
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
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph><b>Location: </b> {props.location}</Typography>
          <Typography paragraph><b>Category: </b> {props.category}</Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}

export default Post2;