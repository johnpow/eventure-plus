import { Box } from "@mui/material";
import { Grid } from "@mui/material";
import Event from "../components/Event";
import { MY_EVENTS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import useStyles from '../components/styles';

const MyEvents = () => {
    const userId = Auth.getUserId();
    const { loading, data } = useQuery(MY_EVENTS, {
        variables: { userId: userId },
        });
    const events = data?.getUserEvents || [];
    const classes = useStyles();

    // Sort events by eventDate
    const sortedEvents = [...events].sort((a, b) => {
        const dateA = new Date(a.eventDate * 1000);
        const dateB = new Date(b.eventDate * 1000);
        return dateA - dateB;
      });
      console.log(sortedEvents);
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
                location={event.eventLocation}
                createdAt={event.createdAt}
                category={event.eventCategory}
                checked
              />
            </Grid>
          ))}
        </Grid>
      )
}

export default MyEvents;