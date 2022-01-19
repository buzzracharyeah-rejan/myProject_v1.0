import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box, Container, Typography, Grid } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { listProperties } from '../redux/slice/property';

import PropertyCard from './property/PropertyCard';
import Loading from './Loading';
import { utils } from '../utils/fetch';
import EditPropertyModal from '../components/modal/EditPropertyModal';
export default function Hero() {
  const dispatch = useDispatch();
  const { firstName, lastName } = useSelector((state) => state.user);
  const { properties } = useSelector((state) => state.property);
  const { open } = useSelector((state) => state.modal);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    utils
      .fetchData(`/api/trending`)
      .then((response) => dispatch(listProperties(response.splice(0, 3))));
    console.log(properties);
    setLoading(false);
  }, []);

  return (
    <Wrapper>
      {open ? <EditPropertyModal /> : null}
      <Box component='div' maxWidth='sm' sx={{ margin: '0 auto' }}>
        <Typography component='h1' variant='h3' align='center' color='text.secondary' gutterBottom>
          Greetings {`${firstName} ${lastName}`}
        </Typography>
        <Typography component='p' variant='body' align='center' gutterBottom>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. At esse numquam autem sunt hic
          alias nihil distinctio culpa nobis. Doloremque.
        </Typography>
      </Box>
      <Container sx={{ p: 6, mt: 4 }} maxWidth='md'>
        <Typography component='h4' variant='h6' align='left'>
          Trending Properties
        </Typography>
        {loading ? (
          <Loading />
        ) : (
          <Grid container spacing={6} size='sm'>
            {properties.map(({ _id, ...others }) => {
              return (
                <Grid item key={_id} xs={12} sm={6} md={4}>
                  <PropertyCard id={_id} {...others} />
                </Grid>
              );
            })}
          </Grid>
        )}
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
