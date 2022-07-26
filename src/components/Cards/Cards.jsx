import React from "react";
import { AnimatePresence, motion } from 'framer-motion';

import { Card } from "components/Card";

import './Cards.scss';

export function Cards({ cards, status }) {
  return (
    <motion.div layout className="cards" >
      <AnimatePresence initial={false} >
        {
          cards.map(card =>
            <Card
              key={card.reqNumber}
              card={card}
              status={status}
            />
          )
        }
      </AnimatePresence>
    </motion.div>
  )
}