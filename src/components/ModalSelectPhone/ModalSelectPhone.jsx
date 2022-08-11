import React, { useState } from 'react';

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import { sendSMS } from '../Api';

export const ModalSelectPhone = ({ onClose, phoneList }) => {
  const [selectPhone, setSelectPhone] = useState('')
  const [isSend, setIsSend] = useState(false)
  const [snackOpen, setSnackOpen] = useState(false)

  const handlerClick = () => {
    if (selectPhone) {
      sendSMS(selectPhone).then(answer => {
        setIsSend(answer);
        setSnackOpen(!snackOpen);
        answer && onClose();
      });
    }
  }
  const handleChange = (event) => {
    setSelectPhone(event.target.value);
  };

  return (
    <>
      <DialogTitle
        sx={{ fontFamily: 'Montserrat' }}
      >
        Выберете номер телефона
      </DialogTitle>
      <DialogContent>
        <Select
          value={selectPhone}
          onChange={handleChange}
          fullWidth
          size='small'
          displayEmpty
        >
          <MenuItem value=""><em>Номер не выбран</em></MenuItem>
          {
            phoneList.map((phone, idx) =>
              <MenuItem key={idx} value={phone}>{phone}</MenuItem>
            )
          }
        </Select>
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
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={snackOpen}
        autoHideDuration={1500}
        onClose={() => setSnackOpen(!snackOpen)}
      >
        {
          isSend ?
            <Alert severity="success">
              СМС отправлена на номер { selectPhone }
            </Alert> :
            <Alert severity="error">
              не удалось отправить СМС 
            </Alert>
        }
      </Snackbar>
    </>
  )
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});