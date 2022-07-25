import React, { useContext } from 'react';

import { Context } from 'components/CardContext';

const statusBar = {
  display: 'flex',
  gap: '0.5rem',
  padding: '0.3rem 1rem',
  backgroundColor: '#dfdfdf',
  borderRadius: 5,
  fontSize: 12,
}

export function StatusBar(){
  const { cards, countVeiwes, countLiked } = useContext(Context);
  return(
    <div style={statusBar}>
      <span className='text'>Всего: { cards.length }</span>
      <span className='text'>Посмотренно: { countVeiwes }</span>
      <span className='text'>Понравилось: { countLiked }</span>
    </div>
  )
}