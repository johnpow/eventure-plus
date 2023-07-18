import React from "react";
import { Stack, Tooltip, Typography } from "@mui/material";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import styled from "@emotion/styled";
import Avatar from '@mui/material/Avatar';
import { DateRange, EmojiEmotions, Image, PersonAdd, VideoCameraBack } from "@mui/icons-material";
import { Button, ButtonGroup, TextField } from "@mui/material";
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import CloseIcon from '@mui/icons-material/Close';
import { useMutation } from '@apollo/client';
import { ADD_SIGNUP } from '../utils/mutations';
import { useState } from 'react';


const StyledModal = styled(Modal) ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
})

const UserBox = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: "10px",
    alignItems: "center",
    marginBottom: "20px",
}))

const Add = () => {
    const [open, setOpen] = React.useState(false);
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
      });
      const [addSignup, { error, data }] = useMutation(ADD_SIGNUP);
      const handleChange = (event) => {
        const { name, value } = event.target;
    
        setFormState({
          ...formState,
          [name]: value,
        });
      };
      
      
    return (
        <>  
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Tooltip 
            title="Add Post" 
            sx={{position:"fixed", bottom:20, left:{xs:"calc(50% - 25px)", md:30}}}
            onClick={() => setOpen(true)}
            >
                <Fab color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </Tooltip>
            <StyledModal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box width={400} 
            bgcolor={"background.default"} 
            color={"text.primary"} p={3} 
            borderRadius={5}
            >
                <Stack direction="row" justifyContent="end" color={"text.secondary"}>
                    <CloseIcon onClick={() => setOpen(false)}/>
                </Stack>
                <Typography variant="h6" color={"gray"} textAlign={"center"}>Create Event</Typography>
                <UserBox>
                    <Avatar 
                    sx={{width: "30px", height:"30px"}} 
                    alt="Ram" 
                    src="https:/mui.com/images/avatar/1.jpg" 
                    onClick={() => setOpen(!open)}
                    />
                    <Typography fontWeight={500} variant="span">Ram</Typography>
                </UserBox>
                <TextField
                sx={{width:"100%", marginBottom:"10px"}}
                variant="outlined"
                placeholder="Title"
                gutterBottom   
                />
                <TextField
                sx={{width:"100%", marginBottom:"10px"}}
                variant="outlined"
                placeholder="Category"
                gutterBottom
                />
                <TextField
                sx={{width:"100%", marginBottom:"10px"}}
                variant="outlined"
                placeholder="Location"
                gutterBottom
                />
                <DatePicker sx={{marginBottom:"10px"}} />
                <TimePicker sx={{marginBottom:"10px"}} />                    
                <TextField
                sx={{width:"100%", marginBottom:"10px"}}
                multiline
                rows={4}
                placeholder="Description"
                variant="outlined"
                />
                
                {/* <Stack direction="row" gap={1} mt={2} mb={3}>
                    <EmojiEmotions color="primary"/>
                    <Image color="secondary"/>
                    <VideoCameraBack color="success"/>
                    <PersonAdd color="error"/>
                </Stack> */}
                <ButtonGroup 
                fullWidth
                variant="contained" aria-label="outlined primary button group">
                    <Button>Create</Button>
                    {/* <Button
                    sx={{width:"100px"}}
                    ><DateRange/></Button> */}
                </ButtonGroup>    
                </Box>
            </StyledModal>
            </LocalizationProvider>   
        </>
    );
}

export default Add;