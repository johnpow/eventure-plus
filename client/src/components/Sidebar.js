import { Box, Switch } from "@mui/material";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import EventRoundedIcon from '@mui/icons-material/EventRounded';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import CheckBoxRoundedIcon from '@mui/icons-material/CheckBoxRounded';
import { ModeNight } from "@mui/icons-material";

const Sidebar = ({mode, setMode}) => {
    return (
        <Box  
        flex={1} p={2} 
        sx={{ display: { xs: "none", sm: "block"}}}>
            <Box position={"fixed"}>
            <List>
            <ListItem disablePadding>
                <ListItemButton component='a' href="#home">
                <ListItemIcon>
                    <HomeIcon />    
                </ListItemIcon>
                <ListItemText primary="Homepage" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton component='a' href="#myEvents">
                <ListItemIcon>
                    <EventRoundedIcon />    
                </ListItemIcon>
                <ListItemText primary="My Events" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton component='a' href="#signedUp">
                <ListItemIcon>
                    <CheckBoxRoundedIcon />    
                </ListItemIcon>
                <ListItemText primary="Signed Up" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton component='a' href="newEvent">
                <ListItemIcon>
                    <AddRoundedIcon />    
                </ListItemIcon>
                <ListItemText primary="New Event" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton component='a' href="#profile">
                <ListItemIcon>
                    <AccountCircleRoundedIcon />    
                </ListItemIcon>
                <ListItemText primary="Profile" />
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton component='a' href="#profile">
                <ListItemIcon>
                    <ModeNight />    
                </ListItemIcon>
                <Switch onChange={() => setMode(mode==="light" ? "dark" : "light")}/>
                </ListItemButton>
            </ListItem>
            </List>
            </Box>
        </Box>
        
    );
}

export default Sidebar;