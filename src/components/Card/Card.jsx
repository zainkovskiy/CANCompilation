import React, { useContext, useState, useEffect, useLayoutEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Link from '@mui/material/Link';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

import { ModalWindow } from 'components/ModalWindow';
import { ModalEditPrice } from 'components/ModalEditPrice';
import { ModalEditComment } from 'components/ModalEditComment';


const placeholderImg = 'https://crm.centralnoe.ru/dealincom/assets/empty_photo.jpg';

import { Context } from 'components/CardContext';

import './Card.scss';

const cardVarints = {
  visible: {
    opacity: 1,
    transition: { duration: 0.3 }
  },
  hidden: {
    opacity: 0,
    transition: { duration: 0.3 }
  }
}
const buttonVariants = {
  visible: {
    scale: 1,
    transition: { duration: 0.3 }
  },
  hidden: {
    scale: 0,
    transition: { duration: 0.3 }
  }
}

const commetnVariants = {
  full: {
    height: 'auto',
    transition: { duration: 0.5 }
  },
  start: {
    height: '45px',
    transition: { duration: 0.5 }
  }
}

const editButton = {
  position: 'absolute',
  right: 0,
  bottom: -2
}

export function Card({ card, status }) {
  const { comeBack, cancelCard, cardsAct, handlerArrAct } = useContext(Context);

  const [childrenComponent, setChildrenComponent] = useState(null);
  const [readMore, setReadMore] = useState(false);
  const [hasInAct, sethasInAct] = useState(cardsAct.includes(card));

  const open = Boolean(childrenComponent);

  const firstUpdate = useRef(true);

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return
    }
    handlerArrAct(card, hasInAct)
  }, [hasInAct])

  const openCard = (event) => {
    const tagName = event.target.tagName
    if (tagName === 'BUTTON' || tagName === 'svg' || tagName === 'path' || tagName === 'A') {
      return
    }
    BX.SidePanel.Instance.open(`https://crm.centralnoe.ru/cardObject/?login=yes&source=${source}&reqNumber=${card.reqNumber}`, { animationDuration: 300, width: document.getElementById('root').clientWidth })
  }

  const handlerClick = () => {
    status === 'cancel' ? comeBack(card) : cancelCard(card)
  }

  const handlerOpen = (component) => {
    if (component === 'price') {
      setChildrenComponent(<ModalEditPrice
        onClose={handlerClose}
        currentPrice={card.price}
        uid={card.UID}
      />)
      return
    }
    if (component === 'comment') {
      setChildrenComponent(<ModalEditComment
        onClose={handlerClose}
        currentComment={card.comment}
        uid={card.UID}
      />)
      return
    }
  }

  const handlerClose = () => {
    setChildrenComponent(null)
  }

  return (
    <>
      <motion.div
        className='card'
        onClick={(event) => openCard(event)}
        variants={cardVarints}
        initial='hidden'
        animate='visible'
        exit='hidden'
        layout
      >
        <img
          alt="photo"
          className='card__img'
          src={card.photo[0]}
        />
        <div className='card__info'>
          <span className='text' style={{ height: 38 }}>
            {card?.address}
          </span>
          <div className='card__info__wrap'>
            <div className='card__text_wrap'>
              {card?.area && <span className='text card__text'>Общая площадь</span>}
              {card?.area && <span className='text'>{card.area}м<sup>2</sup></span>}
            </div>
            <div className='card__text_wrap'>
              {card?.price &&
                <div className='card__text-button'>
                  <span className='text' style={{ marginRight: 30 }}>
                    {card.price} тыс. ₽
                  </span>
                  <IconButton
                    size='small'
                    sx={editButton}
                    onClick={() => handlerOpen('price')}
                  >
                    <BorderColorIcon
                      color='info'
                      fontSize='10'
                    />
                  </IconButton>
                </div>}

              {(card?.price && card?.area && card?.area !== 'Земельный участок') && <span className='text card__text'>{((+card.price / +card.area) * 1000).toFixed(0)} ₽/кв.м</span>}
            </div>
          </div>
          <div className='card__description'>
            <div className='card__text-button'>
              <span className='card__text text' style={{ fontWeight: 700, color: 'grey', marginRight: 30 }}>
                Комментарий
              </span>
              <IconButton
                size='small'
                sx={editButton}
                onClick={() => handlerOpen('comment')}
              >
                <BorderColorIcon
                  color='info'
                  fontSize='10'
                />
              </IconButton>
            </div>
            <motion.span
              className={`card__comment text card__text ${card?.comment?.length > 90 ? readMore ? '' : 'card__comment_hidden' : ''}`}
              variants={commetnVariants}
              animate={readMore ? 'full' : 'start'}
              initial='start'
            >
              {card.comment || 'Коментарий отсутствует'}
            </motion.span>
            {
              (card?.comment && card.comment.length > 90) ?
                <Link
                  onClick={() => setReadMore(!readMore)}
                  underline="none"
                  sx={{ fontSize: 12, fontFamily: 'Montserrat' }}
                >
                  {readMore ? 'Показать меньше' : 'Показать больше'}
                </Link> :
                <span style={{ height: 15 }}></span>
            }
          </div>
          <div className='card__bottom_wrap'>
            <div className='card__bottom_wrap'>
              <Tooltip
                title="Количество просмотров"
                placement="top"
                arrow
              >
                {
                  +card?.viewes > 0 ?
                    <VisibilityIcon color='primary' /> :
                    <VisibilityOutlinedIcon color='action' />
                }
              </Tooltip>
              <Tooltip
                title="Количество лайков"
                placement="top"
                arrow
              >
                {
                  +card?.likes === 1 ?
                    <ThumbUpIcon color='primary' /> :
                    <ThumbUpOffAltIcon color='action' />
                }
              </Tooltip>
            </div>
            <div className='card__bottom_wrap' style={{ gap: 0 }}>
              <AnimatePresence>
                <motion.div
                  variants={buttonVariants}
                  initial='hidden'
                  animate='visible'
                  exit='hidden'
                >
                  <IconButton
                    size='small'
                    onClick={() => sethasInAct(!hasInAct)}
                    color={status === 'cancel' ? 'success' : 'info'}
                  >
                    {
                      hasInAct ?
                        <Tooltip
                          title="Убрать из акта"
                          placement="top"
                          arrow
                        >
                          <CheckCircleOutlineIcon
                            color='success'
                          />
                        </Tooltip>
                        :
                        <Tooltip
                          title="Добавить в акт"
                          placement="top"
                          arrow
                        >
                          <AddCircleOutlineIcon
                            color='info'
                          />
                        </Tooltip>
                    }
                  </IconButton>
                </motion.div>
              </AnimatePresence>
              <AnimatePresence>
                <motion.div
                  variants={buttonVariants}
                  initial='hidden'
                  animate='visible'
                  exit='hidden'
                >
                  <IconButton
                    size='small'
                    color={status === 'cancel' ? 'success' : 'error'}
                    onClick={handlerClick}
                  >
                    {
                      status === 'cancel' ?
                        <Tooltip
                          title="Вернуть"
                          placement="top"
                          arrow
                        >
                          <ArrowCircleUpIcon
                            color='success'
                          />
                        </Tooltip> :
                        <Tooltip
                          title="Отменить"
                          placement="top"
                          arrow
                        >
                          <DoDisturbIcon
                            color='error'
                          />
                        </Tooltip>
                    }
                  </IconButton>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
      <ModalWindow
        onClose={handlerClose}
        open={open}
      >
        {childrenComponent}
      </ModalWindow>
    </>
  )
}