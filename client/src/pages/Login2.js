import React from 'react';
import { Grid, Paper, TextField, Button, Avatar, Typography } from '@mui/material';
import { FormControl, InputLabel, Input, InputAdornment, IconButton } from '@mui/material';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { useState } from 'react';


const Login = () => {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [showPassword, setShowPassword] = React.useState(false);
    const [login, { error, data }] = useMutation(LOGIN_USER);

    // update state based on form input changes
    const handleChange = (event) => {
      const { name, value } = event.target;

      setFormState({
        ...formState,
        [name]: value,
      });
    };

    // submit form
    const handleFormSubmit = async (event) => {
      event.preventDefault();
      console.log(formState);
      try {
        const { data } = await login({
          variables: { ...formState },
        });

        Auth.login(data.login.token);
      } catch (e) {
        console.error(e);
      }

      // clear form values
      setFormState({
        email: '',
        password: '',
      });
    };
    
    return (
      <Grid>
        <Paper elevation={10} sx={{height: '70vh', width: 300, margin: "20px auto", padding:"20px"}}>
          <Grid align="center" sx={{margin: "10px auto"}}>
            {/* <Avatar sx={{bgcolor: "primary.main"}}>
              <LockOutlinedIcon />
            </Avatar> */}
            <Typography variant="h4">Login</Typography>
          </Grid>
          <form onSubmit={handleFormSubmit}>
            <TextField label="Email" variant="standard" 
            placeholder="Enter Email" sx={{margin: "10px 0 20px 0"}} 
            fullWidth required
            name="email"
            type="email"
            value={formState.email}
            onChange={handleChange} 
            />
            <TextField label="Password" variant="standard" 
            placeholder="*********" sx={{margin: "10px 0 20px 0"}} 
            fullWidth required
            name="password"
            type="password"
            value={formState.password}
            onChange={handleChange} 
            />
            <Button type="submit" color="primary" variant="contained" fullWidth sx={{margin: "30px auto"}}>Login</Button>
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

export default Login;