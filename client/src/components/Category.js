import { Grid } from "@mui/material";
import Post2 from "./Post2";
import { QUERY_EVENTS_BY_CATEGORY } from '../utils/queries';
import { useQuery } from '@apollo/client';
import Auth from '../utils/auth';
import useStyles from './styles';
import { useParams } from 'react-router-dom';

const Category = () => {
    const userId = Auth.getUserId();
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