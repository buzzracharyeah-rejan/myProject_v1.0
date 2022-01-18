import React from 'react';
import {
  Container,
  Box,
  Grid,
  Typography,
  Card,
  CardActions,
  CardContent,
  Button,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Navbar from '../Navbar';

const PropertyDetail = () => {
  const property = {
    location: {
      location_geoJSON: {
        type: 'Point',
        coordinates: [87.91667, 26.58333],
      },
      address: 'jhapa',
    },
    _id: '61c9470982ade074f4f297f6',
    propertyType: 'sale',
    propertyName: 'a really beautiful home',
    description: 'a home that really feels like home',
    valuation: 20000,
    isSold: false,
    owner: '61c946bb82ade074f4f297eb',
    booked_users: [],
    created_at: '2021-12-27T04:54:33.396Z',
    __v: 0,
  };
  return (
    <>
      <Navbar />
      <Wrapper>
        <Container maxWidth='lg'>
          <Typography
            component='h1'
            variant='h4'
            align='left'
            color='text.secondary'
            sx={{ textTransform: 'capitalize', padding: '1rem' }}
          >
            {property.propertyName}
          </Typography>
          <Typography
            variant='h7'
            align='left'
            gutterBottom
            sx={{ textTransform: 'capitalize', padding: '1rem' }}
          >
            <LocationOnIcon />
            {property.location.address}
          </Typography>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
                Word of the Day
              </Typography>
              <Typography variant='h5' component='div'></Typography>
              <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                adjective
              </Typography>
              <Typography variant='body2'>
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </CardContent>
            <CardActions>
              <Button variant='contained'>Contact Seller</Button>
            </CardActions>
          </Card>
        </Container>
      </Wrapper>
    </>
  );
};

export default PropertyDetail;

const Wrapper = styled('main')`
  margin-top: 4rem;
  //   background-color: lime;
  height: 90vh;
`;
