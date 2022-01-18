import React from 'react';
import { styled } from '@mui/material/styles';
import { AppBar, Toolbar, Typography, Link } from '@mui/material';
import HomeIcon from '@mui/icons-material/House';

// import { lodash as _ } from 'lodash';
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
            {links.map((link) => {
              if (link.toLowerCase().trim().includes('add property')) {
                return (
                  <Link
                    key={link}
                    href={`/property/${link.split(' ').join('')}`}
                    color='#fff'
                    underline='none'
                    sx={{ textTransform: 'capitalize' }}
                  >
                    {link}
                  </Link>
                );
              }

              return (
                <Link
                  key={link}
                  href={link}
                  color='#fff'
                  underline='none'
                  sx={{ textTransform: 'capitalize' }}
                >
                  {link}
                </Link>
              );
            })}
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
