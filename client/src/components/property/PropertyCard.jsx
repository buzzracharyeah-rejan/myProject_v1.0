import React from 'react';
import { styled } from '@mui/material/styles';
import { Card, CardContent, CardActions, Typography, Button, Link } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

import { useDispatch } from 'react-redux';
import { handleOpen } from '../../redux/slice/modal';

const PropertyCard = ({ id, propertyName, description, propertyType, location, valuation }) => {
  const dispatch = useDispatch();
  return (
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
            className={`badge ${propertyType === 'sale' ? 'bg-success' : 'bg-warning text-dark'}`}
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
          href={'/property/' + id}
        >
          View
        </Link>

        <Button variant='text' onClick={() => dispatch(handleOpen({ id }))}>
          Edit
        </Button>
      </CardActions>
    </Card>
  );
};

export default PropertyCard;

const Meta = styled('div')`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-transform: capitalize;
  padding: 1rem 0;
`;
