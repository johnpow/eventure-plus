import React from 'react';
import { Grid, Paper, TextField, Button, Avatar, Typography } from '@mui/material';
import { FormControl, InputLabel, Input, InputAdornment, IconButton } from '@mui/material';
// import { Visibility, VisibilityOff } from '@mui/icons-material';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { useState } from 'react';
import EventureBG from '../images/cards/eventureBG.png';



const Register = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [formState, setFormState] = useState({
        username: '',
        email: '',
        password: '',
      });
    const [addUser, { error, data }] = useMutation(ADD_USER);

    const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
        ...formState,
        [name]: value,
    });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log(formState);
    
        try {
          const { data } = await addUser({
            variables: { ...formState },
          });
          Auth.login(data.addUser.token, data.addUser.user._id, data.addUser.user.username);
        } catch (e) {
          console.error(e);
        }
    };
    
    return (
      <Grid
      container
      justifyContent="center"  
      style={{
        minHeight: 'calc(100vh - 64px)',
        backgroundImage: `url(${EventureBG})`, // Set the background image here
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'fixed',
      }}>
        <Paper elevation={10} sx={{height: '70vh', width: 300, margin: "20px auto", padding:"20px"}}>
          <Grid align="center" sx={{margin: "10px auto 40px"}}>
            {/* <Avatar sx={{bgcolor: "primary.main"}}>
              <LockOutlinedIcon />
            </Avatar> */}
            <Typography variant="h4">Register</Typography>
          </Grid>
          <form onSubmit={handleFormSubmit}>
          <Typography sx={{ paddingLeft: '0'}}> Username: </Typography>
            <TextField 
            variant="standard" 
            placeholder="Enter username" 
            sx={{margin: "10px auto 20px"}} fullWidth required 
            name="username"
            type="text"
            value={formState.name}
            onChange={handleChange}
            />
            <Typography sx={{ paddingLeft: '0'}}> Email:</Typography>
            <TextField 
            variant="standard" 
            placeholder="Enter Email" 
            type="email" sx={{margin: "10px auto 20px"}} 
            fullWidth required 
            name="email"
            value={formState.email}
            onChange={handleChange}
            />
            <Typography sx={{ paddingLeft: '0'}}> Password:</Typography>
            <TextField 
            variant="standard" 
            placeholder="*********" sx={{margin: "10px 0 20px 0"}} 
            fullWidth required
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange} 
            />
            <Button type="submit" color="primary" variant="contained" fullWidth sx={{margin: "30px auto"}}>Register</Button>  
          </form>
          {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
          )}
        </Paper>
      </Grid>
   
    );
  };

export default Register;