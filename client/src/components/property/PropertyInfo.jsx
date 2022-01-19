import * as React from 'react';
import { CssBaseline, Box, Container, Typography } from '@mui/material';
import {
  LocationOn as LocationOnIcon,
  AttachMoney as AttachMoneyIcon,
  Home as HomeIcon,
} from '@mui/icons-material';

// import { styled } from '@mui/material/styles';
import styled from 'styled-components';

export default function PropertyInfo({
  propertyName,
  propertyType,
  valuation,
  location,
  description,
}) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}
    >
      <CssBaseline />
      <Container component='main' sx={{ mt: 8, mb: 2 }} maxWidth='sm'>
        <Box component='div' sx={{ p: '1rem', mb: '1.5rem' }}>
          <img
            src='https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940'
            alt='home'
            className='img-fluid'
          />
        </Box>
        <Typography variant='h5' component='h1' gutterBottom sx={{ textTransform: 'capitalize' }}>
          {propertyName}
        </Typography>
        <Typography variant='body1' component='h2' gutterBottom>
          Description
          <br />
          {description}
        </Typography>
        <Meta>
          <Typography variant='body1' sx={{ textTransform: 'capitalize' }}>
            <LocationOnIcon />
            {location.address}
          </Typography>
          <Typography variant='body1'>
            <AttachMoneyIcon />
            {valuation}
          </Typography>
          <Typography
            variant='body1'
            className={`badge ${propertyType === 'sale' ? 'bg-success' : 'bg-warning text-dark'}`}
            sx={{ textTransform: 'capitalize' }}
          >
            <HomeIcon sx={{ p: '1px', mr: '3px' }} />
            {propertyType}
          </Typography>
        </Meta>
      </Container>
    </Box>
  );
}

const Meta = styled('div')`
  display: flex;
  flex-direction: flex-start;
  align-items: center;
  gap: 1rem;
`;
