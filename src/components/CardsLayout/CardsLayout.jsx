import React, { useContext } from "react";
import { AnimateSharedLayout } from 'framer-motion';
import { Element } from 'react-scroll';

import { Cards } from 'components/Cards';
import { Subtitle } from "components/Subtitle";
import { Context } from 'components/CardContext';

export function CardsLayout() {
  const { filtredCards, cardsCanceled } = useContext(Context);

  return (
    <AnimateSharedLayout>
      {
        filtredCards.length > 0 &&
        <>
          <Subtitle
            subtitle='В подборке'
            path='cancel'
            link={ cardsCanceled.length > 0 ? 'К отмененым' : '' }
            name='compilation'
          />
          <Cards
            cards={filtredCards}
            status='compilation'
          />
        </>
      }
      {
        cardsCanceled.length > 0 &&
        <>
          <Element>
            <Subtitle 
            subtitle='Отмененые' 
            path='compilation'
            link='К подборке'
            name='cancel'
            />
          </Element>
          <Cards
            cards={cardsCanceled}
            status='cancel'
          />
        </>
      }
    </AnimateSharedLayout>
  )
}
