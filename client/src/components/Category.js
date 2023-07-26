import { Grid } from "@mui/material";
import Post from "./Post";
import { QUERY_EVENTS_BY_CATEGORY } from '../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import useStyles from './styles';
import { useParams } from 'react-router-dom';

const Category = () => {
    const { category } = useParams();
    const { loading, data } = useQuery(QUERY_EVENTS_BY_CATEGORY, {
        variables: { eventCategory: category },
      });
    const events = data?.getEventsByCategory || [];
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
            comments={event.comments}
            signups={event.signups}
            checked={event.signups.some((signup) => signup.username === Auth.getUsername())}
            />
        </Grid>
        ))}
    </Grid>
    )
}

export default Category;