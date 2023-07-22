import React from "react";
import { Stack, Tooltip, Typography } from "@mui/material";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import styled from "@emotion/styled";
import Avatar from '@mui/material/Avatar';
import { Button, ButtonGroup, TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import CloseIcon from '@mui/icons-material/Close';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { ADD_EVENT } from '../utils/mutations';
import { QUERY_EVENTS, QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';
import FormControl from '@mui/material/FormControl';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { ListItem } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

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
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
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
                const updatedAddEvent = { ...addEvent, signups: [] };
                cache.writeQuery({
                  query: QUERY_EVENTS,
                  data: { events: [updatedAddEvent, ...events] },
                });
            } catch (e) {
                console.error(e);
      }}});

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

    const resetFormState = () => {
        setFormState({
          eventTitle: '',
          eventText: '',
          eventAuthor: '',
          eventLocation: '',
          eventDate: '',
          eventCategory: '',
        });
      };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };
    const handleDateChange = (newValue) => {
        setValue(newValue);
        setFormState({
            ...formState,
            eventDate: newValue,
        });
    };
      
    return (
        <>  
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Tooltip 
            title="Create New Event" 
            sx={{position:"fixed", bottom:20, left:{xs:"calc(50% - 25px)", md:30}}}
            onClick={() => setOpen(true)}
            >
                <Fab color="primary" aria-label="add">
                    <AddIcon />
                </Fab>
            </Tooltip>
            <StyledModal
            open={open}
            onClose={() => {setOpen(false);
                resetFormState();}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box width={400} 
            bgcolor={"background.default"} 
            color={"text.primary"} p={3} 
            borderRadius={5}
            >
                <Stack direction="row" justifyContent="end" color={"text.secondary"}>
                    <CloseIcon onClick={() => {setOpen(false);
                    resetFormState();}}/>
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

                <FormControl fullWidth >
                <ListItem sx={{marginBottom: '10px', marginLeft: '2px'}}>Choose a Category</ListItem>
                  <Select
                    name='eventCategory'
                    value={formState.eventCategory}
                    sx={{ width: "100%", marginBottom: "10px", color: 'gray' }}
                    variant= "outlined"
                    placeholder="Category"
                    required
                    onChange={handleChange}
                    MenuProps={MenuProps}
                    displayEmpty
                    renderValue={(selected) => {
                        if (selected.length === 0) {
                          return <em>Category</em>;
                        }
                        return selected;
                    }}
                  >   
                  <MenuItem disabled value=""><em>Category</em></MenuItem>          
                    <MenuItem value={"Arts and Crafts"}>Arts and Crafts</MenuItem>
                    <MenuItem value={"Education"}>Education</MenuItem>
                    <MenuItem value={"Entertainment"}>Entertainment</MenuItem>
                    <MenuItem value={"Music"}>Music</MenuItem>
                    <MenuItem value={"Outdoors"}>Outdoors</MenuItem>
                    <MenuItem value={"Pets"}>Pets</MenuItem>
                    <MenuItem value={"Sports"}>Sports</MenuItem>
                    <MenuItem value={"Social"}>Social</MenuItem>
                    <MenuItem value={"Tech"}>Tech</MenuItem>
                    <MenuItem value={"Trivia"}>Trivia</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                name='eventLocation'
                value={formState.eventLocation}
                sx={{width:"100%", marginBottom:"10px"}}
                variant="outlined"
                placeholder="Location"                
                required 
                onChange={handleChange}
                />
                <ListItem disablePadding sx={{marginBottom: '10px', marginLeft: '2px'}}>Date and Time</ListItem>
                <DateTimePicker fullWidth 
                    sx={{ marginBottom:"10px" }}
                    // label="Date and Time"
                    name='eventDate'
                    value={value}
                    onChange={handleDateChange}
                />
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
                <ButtonGroup 
                fullWidth
                variant="contained" aria-label="outlined primary button group">
                    <Button type = 'submit' >Create</Button>
                </ButtonGroup>  
                </form>  
                </Box>
            </StyledModal>
            </LocalizationProvider>   
        </>
    );
}

export default Add;