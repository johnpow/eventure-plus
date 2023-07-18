import React from "react";
import { Avatar, Box, Card, CardActions, CardContent, CardHeader, CardMedia, Container, IconButton, Tooltip, Typography } from "@mui/material";
import { Favorite,FavoriteBorder, MoreVert, Share as ShareIcon } from "@mui/icons-material";
import Checkbox from '@mui/material/Checkbox';
import * as dayjs from 'dayjs';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useState } from "react";


const Post = (props) => {   
    const [checked, setChecked] = useState(false);
    const handleSignUp = () => {
        if(checked){
            
        }
    };

    return (
        <Card sx={{margin:5}}>
            <CardHeader
            avatar={
            <Avatar sx={{ bgcolor: "orange" }}>
                {props.author[0]}
            </Avatar>
            }
            action={
            <IconButton aria-label="settings">
                <MoreVert />
            </IconButton>
            }
            title= {props.title}
            // subheader={dayjs(props.date)}
            subheader={props.date}
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div" color="text.secondary">
                {props.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                <b>Location:  </b>{props.location}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                <b>Category:  </b>{props.category}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                <Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite sx={{color:"red"}}/>} />
                </IconButton>
                <IconButton aria-label="share">
                <ShareIcon />
                </IconButton>
                <IconButton aria-label="share">
                <Tooltip title="Sign Up">
                    <Checkbox icon={<CheckBoxOutlineBlankIcon />} checkedIcon={<CheckBoxIcon sx={{color:"blue"}}/>} />
                </Tooltip>
                </IconButton>
            </CardActions>
        </Card>        
    );
}

export default Post;