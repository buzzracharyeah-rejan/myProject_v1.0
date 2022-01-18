import React, { useEffect } from 'react';
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
  Button,
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { styled } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';

import { listProperties } from '../../redux/slice/property';
import { handleOpen } from '../../redux/slice/modal';
import axiosInstance from '../../configs/axios';

import Navbar from '../Navbar';
import EditProperty from '../modal/EditProperty';

const Property = () => {
  const { properties } = useSelector((state) => state.property);
  const { open } = useSelector((state) => state.editModal);
  const dispatch = useDispatch();
  useEffect(() => {
    async function fetchData() {
      const {
        data: { data },
      } = await axiosInstance.get('/api/property');
      dispatch(listProperties(data));
    }
    fetchData();
  }, []);

  console.log(properties);
  return (
    <div>
      <Navbar />
      <Wrapper>
        <Container sx={{ py: 8 }} maxWidth='md'>
          {open ? <EditProperty /> : null}
          <Grid container spacing={4}>
            {properties.map(
              ({ _id, propertyName, description, valuation, propertyType, location }) => {
                return (
                  <Grid item key={_id} xs={12} sm={6} md={4}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
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
                            className={`badge ${
                              propertyType === 'sale' ? 'bg-success' : 'bg-warning text-dark'
                            }`}
                          >
                            {propertyType}
                          </Typography>
                          <Typography component='h6' variant='h7'>
                            <LocationOnIcon size='sm' />
                            {location.address}
                          </Typography>
                        </Meta>
                        <Typography component='h6' variant='h7'>
                          $ {valuation}
                        </Typography>
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

                        <Button variant='text' onClick={() => dispatch(handleOpen())}>
                          Edit
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              }
            )}
          </Grid>
        </Container>
      </Wrapper>
    </div>
  );
};

export default Property;

const Wrapper = styled('main')`
  padding: 3rem;
  // background-color: lime;
`;

const Meta = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-transform: capitalize;
  padding: 1rem 0;
`;
