import { Box } from "@mui/material";
import Post from "./Post";
import Login from "../pages/Login";
import { QUERY_EVENTS } from '../utils/queries';
import { useQuery } from '@apollo/client';


const Feed = () => {
    const { loading, data } = useQuery(QUERY_EVENTS);
    const events = data?.events || [];
    return(
        <Box flex={4} p={2}>
            {events.map((event) => (
                <Post key={event._id}
                    _id={event._id}
                    author={event.eventAuthor}
                    title= {event.eventTitle}
                    description={event.eventText}
                    date={event.eventDate}
                    location={event.eventLocation}
                    createdAt={event.createdAt}
                    category={event.eventCategory}
                />
            ))}
        </Box>
    )
}

export default Feed;