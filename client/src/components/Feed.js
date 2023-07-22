import { Grid } from "@mui/material";
import Post2 from "./Post2";
import { QUERY_EVENTS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import useStyles from './styles';
import React, { useState } from 'react';


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
        <Grid container spacing={3} className={classes.cardContainer}>
           {sortedEvents.map((event) => (
            <Grid item xs={12} sm={12} md={12} className={classes.cardItem} key={event._id}>
              <Post2 
                key={event._id}
                _id={event._id}
                author={event.eventAuthor}
                title={event.eventTitle}
                description={event.eventText}
                date={event.eventDate}
                location={event.eventLocation}
                createdAt={event.createdAt}
                category={event.eventCategory}
                checked={event.signups.some((signup) => signup._id === userId)}
              />
            </Grid>
          ))}
        </Grid>
      )
}

export default Feed;