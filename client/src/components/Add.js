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
import { ADD_EVENT } from '../utils/mutations';
import { QUERY_EVENTS, QUERY_ME } from '../utils/queries';
import dayjs from 'dayjs';
import Auth from '../utils/auth';

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
        eventTitle: '',
        eventText: '',
        eventAuthor: '',
        eventLocation: '',
        eventDate: '',
        eventCategory: '',
      });
      
        const [addEvent, { error }] = useMutation(ADD_EVENT, {
            update(cache, { data: { addEvent } }) {
                try {
                    const { events } = cache.readQuery({ query: QUERY_EVENTS });

                    cache.writeQuery({
                        query: QUERY_EVENTS,
                        data: { events: [addEvent, ...events] },
                    });
                } catch (e) {
                    console.error(e);
                }

                // update me object's cache
                const { me } = cache.readQuery({ query: QUERY_ME });
                cache.writeQuery({
                    query: QUERY_ME,
                    data: { me: { ...me, events: [...me.events, addEvent] } },
                });
            },
        });

        const handleFormSubmit = async (event) => {
            event.preventDefault();

            try {
                const { data } = await addEvent({
                    variables: {
                        eventTitle: formState.eventTitle,
                        eventText: formState.eventText,
                        eventAuthor: formState.eventAuthor,
                        eventLocation: formState.eventLocation,
                        eventDate: formState.eventDate,
                        eventCategory: formState.eventCategory,
                    },
                });

                setFormState({
                    eventTitle: '',
                    eventText: '',
                    eventAuthor: '',
                    eventLocation: '',
                    eventDate: '',
                    eventCategory: '',
                });
            } catch (err) {
                console.error(err);
            }
            setOpen(false);
        };

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
                    alt={Auth.getUsername()} 
                    // src="https:/mui.com/images/avatar/1.jpg" 
                    onClick={() => setOpen(!open)}
                    />
                    <Typography fontWeight={500} variant="span">{Auth.getUsername()}</Typography>
                </UserBox>
                <form
                    onSubmit={handleFormSubmit}
                 >
                <TextField
                name='eventTitle'
                value={formState.eventTitle}
                sx={{width:"100%", marginBottom:"10px"}}
                variant="outlined"
                placeholder="Title"               
                required  
                onChange={handleChange}
                />
                <TextField
                name='eventCategory'
                value={formState.eventCategory}
                sx={{width:"100%", marginBottom:"10px"}}
                variant="outlined"
                placeholder="Category"       
                required 
                onChange={handleChange}
                />
                <TextField
                name='eventLocation'
                value={formState.eventLocation}
                sx={{width:"100%", marginBottom:"10px"}}
                variant="outlined"
                placeholder="Location"                
                required 
                onChange={handleChange}
                />
                <TextField
                name='eventDate'
                value={formState.eventDate}
                sx={{width:"100%", marginBottom:"10px"}}
                variant="outlined"
                placeholder="Date"                
                required 
                onChange={handleChange}
                />
                {/* <DatePicker 
                name='eventDate'
                value={formState.eventDate}
                sx={{marginBottom:"10px"}} /> */}
                <TimePicker sx={{marginBottom:"10px"}} />                    
                <TextField
                name='eventText'
                value={formState.eventText}
                sx={{width:"100%", marginBottom:"10px"}}
                multiline
                rows={4}
                placeholder="Description"
                variant="outlined"
                required 
                onChange={handleChange}
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
                    <Button type = 'submit' >Create</Button>
                    {/* <Button
                    sx={{width:"100px"}}
                    ><DateRange/></Button> */}
                </ButtonGroup>  
                </form>  
                </Box>
            </StyledModal>
            </LocalizationProvider>   
        </>
    );
}

export default Add;