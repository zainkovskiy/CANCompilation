import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';

export const Context = createContext();
import { Linear } from "components/Linear";

export const CardContext = (props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [cards, setCards] = useState(null);
  const [cardsCanceled, setCardsCanceled] = useState(null);

  useEffect(() => {
    getCards();
  }, [])

  const getCards = async () => {
    try {
      const res = await axios.post('https://hs-01.centralnoe.ru/Project-Selket-Main/testMap.php',
        {
          "filter": {
            "reqTypeofRealty": "Квартиры"
          },
          "metro": {},
          "extra": {},
          "map": {
            "source": "circle",
            "geometry": [
              [
                55.03766767022481,
                82.9348066403198
              ],
              327.4086442946993
            ]
          },
          "source": "1c"
        })
      if (res?.data) {
        sortCards(res.data);
      } else {
        setCards([])
        setCardsCanceled([])
      }
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  const sortCards = (cards) => {
    const cardsCompilationBySort = [];
    const cardsCanceledBySort = [];

    cards.forEach(card => {
      if (!card?.cancel){
        cardsCompilationBySort.push(card);
      } else {
        cardsCanceledBySort.push(card);
      }
      setCards(cardsCompilationBySort);
      setCardsCanceled(cardsCanceledBySort);
    })
  }

  const comeBack = (card) => {
    setCardsCanceled(cardsCanceled.filter(item => item.reqNumber !== card.reqNumber));
    setCards((prevState) => {
      return [...prevState, card]
    });
  }
  const cancelCard = (card) => {
    setCards(cards.filter(item => item.reqNumber !== card.reqNumber));
    setCardsCanceled((prevState) => {
      return [...prevState, card]
    });
  }

  const value = {
    cards,
    cardsCanceled,
    comeBack,
    cancelCard,
  }
  return (
    <Context.Provider value={value}>
      {
        loading ?
          <Linear /> :
          <>
            {
              error ?
                <p className="tezt">error</p> :
                <>
                  {props.children}
                </>
            }
          </>
      }
    </Context.Provider>
  )
}