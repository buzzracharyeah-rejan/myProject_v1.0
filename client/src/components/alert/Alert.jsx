import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Alert, AlertTitle } from '@mui/material';

const CustomAlert = ({ severity, title, message }) => {
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    setTimeout(() => setVisible(false), 2000);
  }, []);

  return <Wrapper>{visible && <Alert severity={severity}>{message}</Alert>}</Wrapper>;
};

export default CustomAlert;

const Wrapper = styled.div`
  position: absolute;
  width: 100vw;
  top: 10rem;
  left: 0;
  // right: 12%;
  // transform: translate(-50%, 0);k
`;
