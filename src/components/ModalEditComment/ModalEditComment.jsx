import React, { useState, useContext } from 'react';

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

import { Context } from 'components/CardContext';

export function ModalEditComment({ onClose, currentComment, uid }) {
  const { handlerEdit } = useContext(Context);
  const [commentNew, setCommentNew] = useState(currentComment);

  const handlerClick = () => {
    handlerEdit('comment', commentNew, uid);
    onClose();
  }

  return (
    <>
      <DialogTitle
        sx={{ fontFamily: 'Montserrat' }}
      >
        Редактирование комментария
      </DialogTitle>
      <DialogContent>
        <textarea
          onChange={(event) => setCommentNew(event.target.value)}
          value={commentNew}
          className='textarea'
          rows={10}
        >
          {commentNew}
        </textarea>
      </DialogContent>
      <DialogActions>
        <Button
          variant="text"
          size='small'
          onClick={ handlerClick }
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