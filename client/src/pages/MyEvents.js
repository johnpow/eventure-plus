import React from 'react';
import { Grid } from "@mui/material";
import Event from "../components/Event";
import { MY_EVENTS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import useStyles from '../components/styles';

const MyEvents = () => {
    const { loading, data } = useQuery(MY_EVENTS);
    const events = data?.getUserEvents || [];
    const classes = useStyles();

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
                    <Event
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
                      comments={event.comments}
                      signups={event.signups}
                      checked
                    />
                  </Grid>
                ))}
              </Grid>             
      )

export default MyEvents;