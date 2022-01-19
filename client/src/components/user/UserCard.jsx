import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Grid, Paper, ButtonBase, Typography, Button } from '@mui/material';
import { Call as CallIcon } from '@mui/icons-material';
const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

export default function ComplexGrid() {
  return (
    <Paper sx={{ p: 2, margin: 'auto', maxWidth: 500, flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt='complex' src='/static/images/grid/complex.jpg' />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction='column' spacing={2}>
            <Grid item xs>
              <Typography gutterBottom variant='subtitle1' component='div'>
                Property By
              </Typography>
              <Typography variant='body2' gutterBottom>
                rejan bajracharaya
              </Typography>
              <Typography variant='body2' color='text.secondary'>
                test@test.com
              </Typography>
            </Grid>
            <Grid item>
              <Button variant='outlined' size='medium' startIcon={<CallIcon />}>
                Contact Seller
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}
