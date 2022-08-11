import React, { useContext, useState, useEffect, useRef } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { getAct } from '../Api';
import { Context } from 'components/CardContext';
import { ModalWindow } from 'components/ModalWindow';
import { ModalSelectPhone } from 'components/ModalSelectPhone';

const statusBar = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '0.5rem',
}


export function ContollerBar() {
  const { cards, countVeiwes, countLiked, applyFilter, cardsAct, phoneList } = useContext(Context);
  const [openModal, setOpenModal] = useState(false);
  const [snackOpen, setSnackOpen] = useState(false);
  const [filter, setFilter] = useState('all')
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return
    }
    applyFilter(filter);
  }, [filter])

  const handleChange = (event, newAlignment) => {
    setFilter(newAlignment);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOpenModal = () => {
    handleClose();
    setOpenModal(!openModal);
  }
  const handleDownloadAct = () => {
    handleClose();
    getAct(cardsAct);
  }
  const handleCopyLink = () => {
    handleClose();
    setSnackOpen(!snackOpen);
  }

  return (
    <div style={statusBar}>
      <ToggleButtonGroup
        color="primary"
        value={filter}
        exclusive
        onChange={handleChange}
        size='small'
      >
        <ToggleButton value="all">Все {cards.length}</ToggleButton>
        <ToggleButton value="viewes">Просмотренные {countVeiwes} </ToggleButton>
        <ToggleButton value="likes">Понравившиеся {countLiked}</ToggleButton>
      </ToggleButtonGroup>
      <div>
        <IconButton
          onClick={handleOpen}
        >
          <ShareIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          {
            cardsAct.length > 0 &&
            <MenuItem onClick={handleDownloadAct}>
              Сформировать акт
            </MenuItem>
          }
          <CopyToClipboard
            text={`https://crm.centralnoe.ru/account/client/?dealId=${dealId}`}
            onCopy={handleCopyLink}
          >
            <MenuItem>
              Скопировать ссылку
            </MenuItem>
          </CopyToClipboard>
          {
            phoneList &&
            <MenuItem onClick={handleOpenModal}>
              Отправить СМС
            </MenuItem>
          }
        </Menu>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={snackOpen}
        autoHideDuration={1500}
        onClose={() => setSnackOpen(!snackOpen)}
      >
        <Alert severity="success">
          Ссылка успешно скопирована
        </Alert>
      </Snackbar>
      <ModalWindow
        open={openModal}
        onClose={handleOpenModal}
      >
        <ModalSelectPhone
          phoneList={phoneList}
          onClose={handleOpenModal}
        />
      </ModalWindow>
    </div>
  )
}

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});