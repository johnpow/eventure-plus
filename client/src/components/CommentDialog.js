import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useMutation } from '@apollo/client';
import { ADD__EVENTCOMMENT } from '../utils/mutations';

const ExpandedCard = () => {
  const [comment, setComment] = useState('');

  const handleSaveComment = () => {
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
    </Card>
  );
};

export default ExpandedCard;
