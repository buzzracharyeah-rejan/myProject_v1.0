import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { listProperties } from '../redux/slice/property';
import utils from '../utils/fetch';
const useFetch = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    utils.fetchData().then((response) => {
      dispatch(listProperties(response));
    });
  }, []);

  return;
};

export default useFetch;
