import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useMutation } from '@apollo/client';
import { ADD_EVENT_COMMENT } from '../utils/mutations';
import { Container } from '@mui/material';

const ExpandedCard = ({eventId, comments}) => {
  const [comment, setComment] = useState('');
  const [addEventComment, { error }] = useMutation(ADD_EVENT_COMMENT);

  const handleSaveComment = () => {
    console.log(comment);
    console.log("I am in handleSaveComment");
    console.log(eventId);
    addEventComment({
        variables: { eventId: eventId, commentText: comment },
    });
    window.location.reload();
    setComment('');
  };

  return (
    <Card>
      <CardContent>
        <TextField
          variant="outlined"
          fullWidth
          placeholder="Enter your comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </CardContent>
      <CardActions>
        <Button onClick={handleSaveComment} color="primary">
          Save
        </Button>
      </CardActions>
      {comments && comments.length > 0 && (
          <Container>
            <Typography variant='h6'>Comments</Typography>
            {comments.map((comment, index) => (
              <div key={index}>{comment.commentText}</div>
            ))}
          </Container>
        )}
    </Card>
  );
};

export default ExpandedCard;
