import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useMutation } from '@apollo/client';
import { ADD_EVENT_COMMENT, REMOVE_COMMENT } from '../utils/mutations';
import { Container } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import IconButton from '@mui/material/IconButton';




const ExpandedCard = ({eventId, comments}) => {
  const [comment, setComment] = useState('');
  const [addEventComment, { error }] = useMutation(ADD_EVENT_COMMENT);
  const [removeComment, { error3 }] = useMutation(REMOVE_COMMENT);
  const [dialogOpen, setDialogOpen] = useState(false);

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

  const handleDelete = (commentId) => {
    try {
      removeComment({
        variables: { commentId: commentId },
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
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
            <Typography sx={{ marginBottom: '15px' }} variant='h6'>Comments</Typography>
            {comments.map((comment, index) => (
              <Card elevation={3} sx={{ maxWidth: 300, marginBottom: '15px', borderRadius: '1rem' }} key = {index} >
                <CardHeader sx={{ marginBottom: '0' }}
                  avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="commenter profile image">
                    {comment.commentAuthor[0]}
                  </Avatar>
                  }
                  title={comment.commentAuthor}
                  subheader={comment.createdAt}                                  
                />
                <CardContent sx={{ padding: '0 20px 0' }}>
                  <Typography variant="body2">
                    {comment.commentText}
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                <IconButton aria-label="delete" onClick={()=>setDialogOpen(true)}>
                  <DeleteTwoToneIcon />
                </IconButton>
                <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
                  <DialogTitle>Delete Confirmation</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Are you sure you want to delete this comment?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setDialogOpen(false)} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={handleDelete} color="secondary" autoFocus>
                      Delete
                    </Button>
                  </DialogActions>
                </Dialog> 
                </CardActions>
              </Card>
            ))}
          </Container>
        )}
    </Card>
  );
};

export default ExpandedCard;
