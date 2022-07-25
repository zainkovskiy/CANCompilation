import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';

import IconButton from '@mui/material/IconButton';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import DoDisturbIcon from '@mui/icons-material/DoDisturb';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import Link from '@mui/material/Link';

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
  const { comeBack, cancelCard } = useContext(Context);

  const [readMore, setReadMore] = useState(false);

  const openCard = (event) => {
    const tagName = event.target.tagName
    console.log(tagName);
    if (tagName === 'BUTTON' || tagName === 'svg' || tagName === 'path') {
      return
    }
    BX.SidePanel.Instance.open(`https://crm.centralnoe.ru/cardObject/?login=yes&source=${source}&reqNumber=${card.reqNumber}`, { animationDuration: 300, width: document.getElementById('root').clientWidth })
  }

  const handlerClick = () => {
    status === 'cancel' ? comeBack(card) : cancelCard(card)
  }

  return (
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
        src={card.reqPhoto || placeholderImg}
      />
      <div className='card__info'>
        <div className='card__info__type'>
          <span className='text card__text'>{card?.reqCity && card.reqCity}</span>
          {
            (card?.reqRoomCount || card?.reqTypeofRealty) &&
            <span className='text card__text'>
              {card?.reqRoomCount ? `${card?.reqRoomCount}к. ` : ''}
              {card?.reqTypeofRealty ? `${card?.reqTypeofRealty}` : ''}
            </span>
          }
        </div>
        {
          (card?.reqStreet || card?.reqHouseNumber) &&
          <span className='text'>
            {card?.reqStreet ? `ул.${card?.reqStreet} ` : ''}
            {card?.reqHouseNumber ? `д.${card?.reqHouseNumber}` : ''}
          </span>
        }
        <div className='card__info__wrap'>
          <div className='card__text_wrap'>
            {card?.reqFlatTotalArea && <span className='text card__text'>Общая площадь</span>}
            {card?.reqFlatTotalArea && <span className='text'>{card.reqFlatTotalArea}м<sup>2</sup></span>}
          </div>
          <div className='card__text_wrap'>
            {card?.reqPrice &&
              <div className='card__text-button'>
                <span className='text' style={{ marginRight: 30 }}>
                  {card.reqPrice} тыс. ₽
                </span>
                <IconButton
                  size='small'
                  sx={editButton}
                >
                  <BorderColorIcon
                    color='info'
                    fontSize='10'
                  />
                </IconButton>
              </div>}

            {(card?.reqPrice && card?.reqFlatTotalArea && card?.reqFlatTotalArea !== 'Земельный участок') && <span className='text card__text'>{((+card.reqPrice / +card.reqFlatTotalArea) * 1000).toFixed(0)} ₽/кв.м</span>}
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
            >
              <BorderColorIcon
                color='info'
                fontSize='10'
              />
            </IconButton>
          </div>
          <motion.span
            className={`card__comment text card__text ${card?.reqComment?.length > 90 ? readMore ? '' : 'card__comment_hidden' : ''}`}
            variants={commetnVariants}
            animate={readMore ? 'full' : 'start'}
            initial='start'
          >
            {card?.reqComment ? card.reqComment : 'Коментарий отсутствует'}
          </motion.span>
          {
            (card?.reqComment && card.reqComment.length > 90) ?
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
            {
              card?.view ?
                <VisibilityIcon color='primary' /> :
                <VisibilityOutlinedIcon color='action' />
            }
            {
              card?.like ?
                <ThumbUpIcon color='primary' /> :
                <ThumbUpOffAltIcon color='action' />
            }
          </div>
          <IconButton
            size='small'
            color={status === 'cancel' ? 'success' : 'error'}
          >
            {
              status === 'cancel' ?
                <ArrowCircleUpIcon
                  color='success'
                  onClick={handlerClick}
                /> :
                <DoDisturbIcon
                  color='error'
                  onClick={handlerClick}
                />
            }
          </IconButton>
        </div>
      </div>
    </motion.div>
  )
}