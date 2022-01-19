import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Container, Typography, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import PropertyCard from './property/PropertyCard';
import { utils } from '../utils/fetch';

export default function Hero() {
  const { firstName, lastName } = useSelector((state) => state.user);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    utils.fetchData(`/api/trending`).then((response) => setProperties(response.splice(2)));
  }, []);
  console.log(properties);
  return (
    <Wrapper>
      <Box component='div' maxWidth='sm' sx={{ margin: '0 auto' }}>
        <Typography component='h1' variant='h3' align='center' color='text.secondary' gutterBottom>
          Greetings {`${firstName} ${lastName}`}
        </Typography>
        <Typography component='p' variant='body' align='center' gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. At esse numquam autem sunt hic
          alias nihil distinctio culpa nobis. Doloremque.
        </Typography>
      </Box>
      <Container sx={{ p: 2 }} maxWidth='md'>
        <Typography component='h4' variant='h6' align='left'>
          Trending Properties
        </Typography>
        <Grid container spacing={6} size='sm'>
          {properties.length > 0 ? (
            properties.map(({ _id, ...others }) => {
              return (
                <Grid item key={_id} xs={12} sm={6} md={4}>
                  <PropertyCard id={_id} {...others} />
                </Grid>
              );
            })
          ) : (
            <Typography component='h1' variant='h4'>
              No property listings...
            </Typography>
          )}
        </Grid>
      </Container>
    </Wrapper>
  );
}

const Wrapper = styled('section')`
  height: 100vh;
  width: 100vw;
  text-align: center;
  padding: 8rem 3rem;
`;
