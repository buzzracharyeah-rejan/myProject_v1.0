import React from 'react';
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Link } from '@mui/material';
import HomeIcon from '@mui/icons-material/House';

import { links } from '../constants/links';

export default function Navbar() {
  return (
    <>
      <AppBar>
        <Toolbar>
          <HomeIcon />
          <Typography variant='h6' sx={{ mr: '1rem' }}>
            Real Estate App
          </Typography>
          <NavList>
            {links.map((link) => (
              <Link
                key={link}
                href={link}
                color='#fff'
                underline='none'
                sx={{ textTransform: 'capitalize' }}
              >
                {link}
              </Link>
            ))}
          </NavList>
        </Toolbar>
      </AppBar>
    </>
  );
}

const NavList = styled('ul')`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10rem;
  flex-grow: 1;
`;
