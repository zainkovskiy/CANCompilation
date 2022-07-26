import React, { useContext, useState, useEffect, useRef } from 'react';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import IconButton from '@mui/material/IconButton';
import ShareIcon from '@mui/icons-material/Share';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { Context } from 'components/CardContext';

const statusBar = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '0.5rem',
}

export function ContollerBar() {
  const { cards, countVeiwes, countLiked, applyFilter, cardsAct } = useContext(Context);
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
            <MenuItem onClick={handleClose}>
              Сформировать акт
            </MenuItem>
          }
          <MenuItem onClick={handleClose}>
            Скопировать ссылку
          </MenuItem>
          <MenuItem onClick={handleClose}>
            Отправить СМС
          </MenuItem>
        </Menu>
      </div>
    </div>
  )
}