// import { Box } from "@mui/material";
import { Grid } from "@mui/material";
import Post2 from "./Post2";
// import Login from "../pages/Login";
import { QUERY_USER_SIGNUPS } from '../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import useStyles from './styles';

const UserSignup = () => {
    const userId = Auth.getUserId();
    const { loading, data } = useQuery(QUERY_USER_SIGNUPS);
    const events = data?.getUserSignups || [];
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
                checked
              />
            </Grid>
          ))}
        </Grid>
      )
}

export default UserSignup;