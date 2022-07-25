import React, { useContext } from "react";

import { Context } from 'components/CardContext';

import { Subtitle } from "components/Subtitle";
import { Card } from "components/Card";

export function Cards() {
  const { cards, cardsCanceled } = useContext(Context);

  return (
    <>
      {
        cards.length > 0 &&
        <>
          <Subtitle subtitle='В подборке' />
          <div className="cards">
            {cards.map(card =>
              <Card
                key={card.reqNumber}
                card={card}
                status='compilation'
              />
            )}
          </div>
        </>
      }
      {
        cardsCanceled.length > 0 &&
        <>
          <Subtitle subtitle='Отмененые' />
          <div className="cards">
            {cardsCanceled.map(card =>
              <Card
                key={card.reqNumber}
                card={card}
                status='cancel'
              />
            )}
          </div>
        </>
      }
    </>
  )
}