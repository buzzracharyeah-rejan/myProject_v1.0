import React from 'react';
import { Box, Modal } from '@mui/material';
import PropertyForm from '../form/propertyForm';

import { useSelector, useDispatch } from 'react-redux';
import { handleOpen, handleClose } from '../../redux/slice/modal';

const EditModal = () => {
  const { open } = useSelector((state) => state.editModal);
  const dispatch = useDispatch();
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => dispatch(handleClose())}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <PropertyForm />
        </Box>
      </Modal>
    </div>
  );
};

export default EditModal;
