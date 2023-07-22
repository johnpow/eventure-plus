// import { Box } from "@mui/material";
import { Grid } from "@mui/material";
import Post2 from "./Post2";
// import Login from "../pages/Login";
import { QUERY_EVENTS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import useStyles from './styles';
import React, { useState } from 'react';


const Feed = ({ selectedCategory }) => {
    // const [selectedCategory, setSelectedCategory] = useState('All'); // Initial value to show all events

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


    const filterEventsByCategory = (events, category) => {
      if (category === 'All') {
        return events; // Show all events if 'All' is selected
      } else {
        return events.filter((event) => event.eventCategory === category);
      }
    };

     // Filter events based on the selected category
     const filteredEvents = filterEventsByCategory(sortedEvents, selectedCategory);

      console.log(sortedEvents);
      return (
        <Grid container spacing={3} className={classes.cardContainer}>
           {filteredEvents.map((event) => (
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
Feed.defaultProps = {
  selectedCategory: 'All',
};
export default Feed;