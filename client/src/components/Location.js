import { Grid } from "@mui/material";
import Post2 from "./Post2";
import { QUERY_EVENTS_BY_STATE_AND_CITY } from '../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import useStyles from './styles';
import { useParams } from 'react-router-dom';

const Location = () => {
    const userId = Auth.getUserId();
    const { city } = useParams();
    const { state } = useParams();

    const { loading, data } = useQuery(QUERY_EVENTS_BY_STATE_AND_CITY, {
        variables: { eventState: state, eventCity: city },
      });
    const events = data?.getEventsByStateAndCity || [];
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
    <Grid  className={classes.cardContainer} sx={{ marginTop: '30px', marginRight: 'auto', marginLeft: 'auto'}}>
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
            checked={event.signups.some((signup) => signup.username === Auth.getUsername())}
            />
        </Grid>
        ))}
    </Grid>
    )
}

export default Location;