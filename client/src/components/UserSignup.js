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
        <Grid className={classes.cardContainer} sx={{marginTop: '30px', marginRight: 'auto', marginLeft: 'auto'}}>
          {sortedEvents.map((event) => (
            <Grid className={classes.cardItem} key={event._id}>
              <Post2
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
}

export default UserSignup;