import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useMutation } from '@apollo/client';
import { ADD_EVENT_COMMENT, REMOVE_EVENT_COMMENT } from '../utils/mutations';
import { Container } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Auth from '../utils/auth';



const ExpandedCard = ({eventId, comments}) => {
  const [comment, setComment] = useState('');
  const [addEventComment, { error }] = useMutation(ADD_EVENT_COMMENT);
  const [removeEventComment, { error3 }] = useMutation(REMOVE_EVENT_COMMENT);
  const [openDialog, setOpenDialog] = useState(false);

  const handleSaveComment = async () => {
    try {
      const { data } = await addEventComment({
        variables: { eventId: eventId, commentText: comment },
      });
    } catch (error) {
      console.error(error);
    }
    setComment('');
  };

  const handleDeleteComment = async (event) => {
    const id = event.currentTarget.id;
    try {
      await removeEventComment({
        variables: { eventId: eventId, commentId: id },
      });
    } catch (error) {
      console.error(error);
    }
    setOpenDialog(false);
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
                {comment.commentAuthor === Auth.getUsername() && (
                  <IconButton aria-label="delete" id={comment._id} onClick={()=>setOpenDialog(true)}>
                  <DeleteTwoToneIcon />
                </IconButton>
                )}
                <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                  <DialogTitle>Delete Confirmation</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Are you sure you want to delete this comment?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpenDialog(false)} color="primary">
                      Cancel
                    </Button>
                    <Button id={comment._id} onClick={handleDeleteComment} color="secondary" autoFocus>
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
