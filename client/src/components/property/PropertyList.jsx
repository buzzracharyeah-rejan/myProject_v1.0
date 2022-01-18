import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, Pagination, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { useSelector, useDispatch } from 'react-redux';
import { listProperties } from '../../redux/slice/property';

import Loading from '../Loading';
import Navbar from '../Navbar';
import EditProperty from '../modal/EditPropertyModal';
import PropertyCard from './PropertyCard';
import CustomAlert from '../alert/Alert';

import { utils } from '../../utils/fetch';
// console.log(fetchData);
const PropertyList = () => {
  const { properties } = useSelector((state) => state.property);
  const { success, error, message } = useSelector((state) => state.modal);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const { open } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    utils.fetchData(page).then((response) => {
      dispatch(listProperties(response));
      setLoading(false);
    });
  }, [loading, page]);

  // useEffect(() => {
  //   console.log('use effect hook 2');
  // }, [properties]);
  // console.log(properties);

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div>
        <Navbar />
        <Wrapper>
          {error && <CustomAlert severity='error' message={message} />}
          {success && <CustomAlert severity='success' message={message} />}
          <Container sx={{ py: 8 }} maxWidth='md'>
            {open ? <EditProperty /> : null}
            <Grid container spacing={4}>
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
            <PaginationWrapper>
              <Pagination
                count={10}
                color='primary'
                size='medium'
                onChange={(event) => setPage(event.target.innerText)}
              />
            </PaginationWrapper>
          </Container>
        </Wrapper>
      </div>
    );
  }
};

export default PropertyList;

const Wrapper = styled('main')`
  position: relative;
  padding: 3.5rem;
  margin: 1rem 0;
  height: 120vh;
  // overflow: hidden;
  // background-color: lime;
`;

const PaginationWrapper = styled('div')`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;
