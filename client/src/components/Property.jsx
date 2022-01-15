import React from 'react';
import Navbar from './Navbar';
import { styled } from '@mui/material/styles';
import {
  Container,
  Grid,
  Box,
  Card,
  CardMedia,
  CardActions,
  CardContent,
  Typography,
  Link,
} from '@mui/material';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const property = [
  {
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
  },
  {
    location: {
      location_geoJSON: {
        type: 'Point',
        coordinates: [87.91667, 26.58333],
      },
      address: 'jhapa',
    },
    _id: '61c9470982ade074f4f2976',
    propertyType: 'sold',
    propertyName: 'a really beautiful home',
    description: 'a home that really feels like home',
    valuation: 20000,
    isSold: false,
    owner: '61c946bb82ade074f4f297eb',
    booked_users: [],
    created_at: '2021-12-27T04:54:33.396Z',
    __v: 0,
  },
];
const Property = () => {
  return (
    <div>
      <Navbar />
      <Wrapper>
        <Container sx={{ py: 8 }} maxWidth='md'>
          {/* End hero unit */}
          <Grid container spacing={4}>
            {property.map(({ _id, propertyName, description, valuation, propertyType }) => {
              const color = propertyType === 'sale' ? 'blue' : 'red';
              return (
                <Grid item key={_id} xs={12} sm={6} md={4}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {/* <CardMedia
                    component='img'
                    sx={{
                      // 16:9
                      pt: '56.25%',
                    }}
                    image='https://source.unsplash.com/random'
                    alt='random'
                  /> */}
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography
                        gutterBottom
                        variant='h5'
                        component='h2'
                        sx={{
                          textTransform: 'capitalize',
                        }}
                      >
                        {propertyName}
                      </Typography>
                      <Typography>{description}</Typography>
                      <Meta>
                        <Typography
                          component='h6'
                          variant='h7'
                          sx={{ color: { color }, textTransform: 'capitalize' }}
                        >
                          {propertyType}
                        </Typography>
                        <Typography component='h6' variant='h7'>
                          $ {valuation}
                        </Typography>
                      </Meta>
                    </CardContent>
                    <CardActions>
                      <Link
                        component='a'
                        variant='body2'
                        underline='none'
                        sx={{
                          fontSize: '1rem',
                          mr: '1.8rem',
                          p: '1rem 1.25rem',
                        }}
                        href={'/property/view/' + _id}
                      >
                        View
                      </Link>
                      <Link
                        component='a'
                        variant='body2'
                        underline='none'
                        sx={{
                          fontSize: '1rem',
                          mr: '1.8rem',
                          p: '1rem 1.25rem',
                        }}
                        href={'/property/edit/' + _id}
                      >
                        Edit
                      </Link>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Wrapper>
    </div>
  );
};

export default Property;

const Wrapper = styled('main')`
  padding: 3rem;
  background-color: lime;
`;

const Meta = styled('div')`
  display: flex;
  flex-direction: column;
  justify-content: center;
  // align-items: center;
`;
