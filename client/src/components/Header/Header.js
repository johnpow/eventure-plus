import { AppBar } from "@mui/material";
import { Toolbar } from "@mui/material";
import { Typography, Button } from "@mui/material";
import { styled } from "@mui/material";
import EventRoundedIcon from '@mui/icons-material/EventRounded';
import Auth from '../../utils/auth';
import { Link } from 'react-router-dom';



const StyledToolbar = styled(Toolbar)({
    display: "flex",
    justifyContent: "space-between"
})

const Header = () => {
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
      };
    return (
        <AppBar position="sticky">
            <StyledToolbar>
            <Typography variant="h6" sx={{ display: {xs: "none", sm: "block"}}}>Eventure</Typography>
            <EventRoundedIcon sx={{ display: {xs: "block", sm: "none"}}}/>
            <div>
          {Auth.loggedIn() ? (
            <>
              <button className="btn btn-md btn-light m-2" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
                <Button variant="text" component={Link} to="/login" 
                sx={{color: "white", '&:hover': {color: 'white'}}}>
                    Login 
                </Button>
                <Button variant="text" component={Link} to="/signup" 
                sx={{color: "white", '&:hover': {color: 'white'}}}>
                    Register
                </Button>
            </>
          )}
        </div> 
            </StyledToolbar>   
        </AppBar>
    );
}

export default Header;