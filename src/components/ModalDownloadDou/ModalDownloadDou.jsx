import React from 'react';

import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from '@mui/material';

export const ModalDownloadDou = ({ link }) => {

  return (
    <>
      <DialogTitle
        sx={{ fontFamily: 'Montserrat' }}
      >
        ДОУ показа
      </DialogTitle>
      <DialogContent>
          <Link
            href={link}
            download
            underline='hover'
            sx={{ fontFamily: 'Montserrat' }}
          >
            Скачать
          </Link>
      </DialogContent>
    </>
  )
}
