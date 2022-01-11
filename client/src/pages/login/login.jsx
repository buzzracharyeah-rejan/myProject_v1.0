import React, { useState } from 'react';
import { Box, Stack, Alert, Typography, TextField, Avatar, MenuItem, Button } from '@mui/material';
import validator from 'validator';
import axios from 'axios';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import styled from 'styled-components';
import { loginInit, endpoint } from '../../constants/initVariables';

const Login = () => {
  const { usr, err, status: stats } = loginInit;
  const [user, setUser] = useState(usr);
  const [error, setError] = useState(err);
  const [status, setStatus] = useState(stats);

  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log({ name, value });
    setUser((prevUser) => {
      return { ...prevUser, [name]: value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log('handle submit');
    const { email, password } = user;
    const err = {
      email: !validator.isEmail(email),
      password: !validator.isStrongPassword(password, {
        minLength: 8,
        minUppercase: 0,
        minSymbols: 0,
        minNumbers: 0,
        returnScore: false,
      }),
    };
    // console.log(err);

    setError((prevErr) => {
      return { ...prevErr, err };
    });

    const isHit = Object.values(error).every((err) => err === false);

    console.log(isHit);

    if (isHit) {
      try {
        const { data, status } = await axios.post(endpoint, user);
        if (status === 200) {
          setStatus({
            status: { state: true, title: 'success', message: 'user login successful' },
          });
        } else {
          setStatus({
            status: { state: true, title: 'error', message: 'user login failed' },
          });
        }
      } catch (error) {
        console.log('catch block' + error);
      }
    }

    // console.log({ user, error, status });
  };

  return (
    <Wrapper>
      {status.state && (
        <Alert
          iconMapping={{
            success: <CheckCircleOutlineIcon fontSize='inherit' />,
          }}
          severity={status.title}
        >
          {status.message}
        </Alert>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOpenIcon />
        </Avatar>
        <Typography component='h1' variant='h5'>
          User Login
        </Typography>
      </Box>

      <Box
        component='form'
        sx={{
          m: 1,
          width: '50ch',
          display: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <TextField
          margin='normal'
          required
          fullWidth
          name='email'
          label='Email'
          id='email'
          value={user.email}
          onChange={handleChange}
          error={error.email}
          helperText={error.email ? 'invalid email' : null}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          name='password'
          label='Password'
          id='password'
          type='password'
          value={user.password}
          onChange={handleChange}
          error={error.password}
          helperText={error.password ? 'invalid password' : null}
        />
      </Box>
      <Button variant='contained' size='large' onClick={(event) => handleSubmit(event)}>
        Login
      </Button>
    </Wrapper>
  );
};

export default Login;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 60%;
  margin: 50px auto;
  padding: 1.2rem 1.4rem;
  // box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  border-radius: 8px;
  height: 80vh;
`;
