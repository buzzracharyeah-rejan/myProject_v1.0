import React, { useState, useEffect } from 'react';
import { Container, Grid, Alert, AlertTitle } from '@mui/material';
import { styled } from '@mui/material/styles';

import { useSelector, useDispatch } from 'react-redux';
import { listProperties } from '../../redux/slice/property';

import axiosInstance from '../../configs/axios';

import Loading from '../Loading';
import Navbar from '../Navbar';
import EditProperty from '../modal/EditProperty';
import PropertyCard from './PropertyCard';
import CustomAlert from '../alert/Alert';

const PropertyList = () => {
  const { properties } = useSelector((state) => state.property);
  // const { success, error, message } = useSelector((state) => state.modal);
  const [loading, setLoading] = useState(true);
  const { open } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      const {
        data: { data },
      } = await axiosInstance.get('/api/property');
      dispatch(listProperties(data));
      setLoading(false);
    }
    fetchData();
  }, [loading]);

  useEffect(() => {
    console.log('use effect hook 2');
  }, [properties]);
  console.log(properties);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div>
        <Navbar />
        <Wrapper>
          <Container sx={{ py: 8 }} maxWidth='md'>
            {open ? <EditProperty /> : null}
            <Grid container spacing={4}>
              {properties.map(({ _id, ...others }) => {
                return (
                  <Grid item key={_id} xs={12} sm={6} md={4}>
                    <PropertyCard id={_id} {...others} />
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </Wrapper>
      </div>
    );
  }
};

export default PropertyList;

const Wrapper = styled('main')`
  padding: 3.5rem;
  margin: 1rem 0;
  // background-color: lime;
`;
