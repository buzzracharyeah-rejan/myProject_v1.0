import React from 'react';
import { Box, Stack, Alert, Typography, TextField, Avatar, MenuItem, Button } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import styled from 'styled-components';
import useForm from '../../hooks/useForm';
import { signupInit, user as usr, endpoint } from '../../constants/initVariables';

const Signup = () => {
  const { user, error, status, handleChange, handleSubmit } = useForm(signupInit);

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
          User Signup
        </Typography>
      </Box>

      <Box
        component='form'
        onSubmit={handleSubmit}
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
          label='First Name'
          name='firstname'
          id='firstname'
          autoFocus
          value={user.firstname}
          onChange={handleChange}
          error={error.firstname}
          helperText={error.firstname ? 'invalid firstname' : null}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          name='lastname'
          label='Last Name'
          id='lastname'
          value={user.lastname}
          onChange={handleChange}
          error={error.lastname}
          helperText={error.lastname ? 'invalid lastname' : null}
        />
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
        <TextField
          margin='normal'
          required
          fullWidth
          name='contactNumber'
          label='Contact Number'
          id='contactNumber'
          value={user.contactNumber}
          onChange={handleChange}
          error={error.contactNumber}
          helperText={error.contactNumber ? 'invalid contactNumber' : null}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          name='displayAddress'
          label='Display Address'
          id='displayAddress'
          value={user.displayAddress}
          onChange={handleChange}
          error={error.displayAddress}
          helperText={error.displayAddress ? 'invalid displayAddress' : null}
        />
        <TextField
          margin='normal'
          required
          fullWidth
          id='userType'
          select
          label='User Type'
          name='userType'
          value={user.userType}
          onChange={handleChange}
          error={error.userType}
          helperText={error.userType ? 'Please select your role' : null}
        >
          {usr.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
      <Button variant='contained' size='large' onClick={(event) => handleSubmit(event, endpoint)}>
        Sign up
      </Button>
    </Wrapper>
  );
};

export default Signup;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60%;
  margin: 50px auto;
  padding: 1.2rem 1.4rem;
  // box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;
  border-radius: 8px;
  height: 80vh;
`;
