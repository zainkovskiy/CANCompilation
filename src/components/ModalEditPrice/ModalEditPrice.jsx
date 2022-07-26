import React, { useState, useContext } from 'react';

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { Context } from 'components/CardContext';

export function ModalEditPrice({ onClose, currentPrice, uid }) {
  const { handlerEdit } = useContext(Context);

  const [priceNew, setPriceNew] = useState(currentPrice);

  const handlerClick = () => {
    handlerEdit('price', priceNew, uid);
    onClose();
  }

  return (
    <>
      <DialogTitle
        sx={{ fontFamily: 'Montserrat' }}
      >
        Редактирование цены
      </DialogTitle>
      <DialogContent>
        <TextField
          id="standard-basic"
          label="Цена"
          variant="standard"
          value={priceNew}
          onChange={(event) => setPriceNew(event.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button
          variant="text"
          size='small'
          onClick={handlerClick}
        >
          Сохранить
        </Button>
        <Button
          variant="outlined"
          color='error'
          size='small'
          onClick={onClose}
        >
          Отменить
        </Button>
      </DialogActions>
    </>
  )
}