import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';

export default function Hero() {
  return (
    <Wrapper>
      <Box component='div' maxWidth='sm' sx={{ margin: '0 auto' }}>
        <Typography component='h1' variant='h3' align='center' color='text.secondary' gutterBottom>
          Greetings user
        </Typography>
        <Typography component='p' variant='body' align='center'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit illo tempora et
          doloremque. Blanditiis eos at odio sapiente sed. Cum sint consequatur culpa quam eligendi
          aliquam inventore ut esse exercitationem.
        </Typography>
      </Box>
    </Wrapper>
  );
}

const Wrapper = styled('section')`
  height: 60vh;
  width: 100vw;
  background: #f3f3f3;
  text-align: center;
  padding: 8rem 3rem;
`;
