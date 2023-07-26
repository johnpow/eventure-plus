import { Grid } from "@mui/material";
import Post from "./Post";
import { QUERY_EVENTS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import useStyles from './styles';
import React from 'react';


const Feed = () => {
    const userId = Auth.getUserId();
    const { loading, data } = useQuery(QUERY_EVENTS);
    const events = data?.events || [];
    const classes = useStyles();

// Sorting and filtering logic for events
    const now = Date.now(); 

    const sortedEvents = [...events]
      .filter(event => {
        return event.eventDate >= now; 
      })
      .sort((a, b) => {
        const dateA = a.eventDate;
        const dateB = b.eventDate;
        return dateA - dateB; 
      });

      
    return (
        <Grid className={classes.cardContainer} sx={{ marginTop: '30px', marginRight: 'auto', marginLeft: 'auto', overflowx: 'hidden'}}>
           {sortedEvents.map((event) => (
            <Grid className={classes.cardItem} key={event._id} >
              <Post 
                key={event._id}
                _id={event._id}
                author={event.eventAuthor}
                title={event.eventTitle}
                description={event.eventText}
                date={event.eventDate}
                state={event.eventState}
                city={event.eventCity}
                createdAt={event.createdAt}
                category={event.eventCategory}
                checked={event.signups.some((signup) => signup._id === userId)}
                comments={event.comments}
                signups={event.signups}
              />
            </Grid>
          ))}
        </Grid>
      )
}

export default Feed;