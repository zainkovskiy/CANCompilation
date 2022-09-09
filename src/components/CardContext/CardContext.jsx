import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

import { Link } from '@mui/material';

import { setEdit, hide, show } from '../Api';

export const Context = createContext();
import { Linear } from 'components/Linear';

export const CardContext = (props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  //Карточки с сервра
  const [cards, setCards] = useState(null);
  //Карточки для отрисовки с примененим фильтров "Compilation"
  const [filtredCards, setFiltredCards] = useState(null);
  //Карточки "отмененные"
  const [cardsCanceled, setCardsCanceled] = useState(null);
  //Карточки для акта
  const [cardsAct, setCardsAct] = useState([]);
  const [countVeiwes, setCountVeiwes] = useState(null);
  const [countLiked, setCountLiked] = useState(null);
  const [phoneList, setPhoneList] = useState(null);

  useEffect(() => {
    getCards();
  }, []);

  const getCards = async () => {
    try {
      const res = await axios.post(
        'https://hs-01.centralnoe.ru/Project-Selket-Main/Servers/Filter/Selection.php',
        {
          action: 'getDeal',
          entityId: dealId || 69352,
          // entityId:  69352
        }
      );
      console.log(res);
      res?.data?.data?.length > 0 && sortCards(res.data.data),
        setCountValue(res.data.data),
        setCards(res.data.data),
        setPhoneList(res.data.phones);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const sortCards = (cards) => {
    const cardsCompilationBySort = [];
    const cardsCanceledBySort = [];

    cards.forEach((card) => {
      if (+card?.deleted === 0) {
        cardsCompilationBySort.push(card);
      } else {
        cardsCanceledBySort.push(card);
      }
    });
    setFiltredCards(cardsCompilationBySort);
    setCardsCanceled(cardsCanceledBySort);
  };

  const setCountValue = (cards) => {
    let countVeiwes = 0;
    let countLiked = 0;

    cards.forEach((card) => {
      if (+card.viewes > 0) {
        countVeiwes++;
      }

      if (+card.likes === 1) {
        countLiked++;
      }
    });

    setCountVeiwes(countVeiwes);
    setCountLiked(countLiked);
  };

  const comeBack = (card) => {
    setCardsCanceled(
      cardsCanceled.filter((item) => item.reqNumber !== card.reqNumber)
    );
    setFiltredCards((prevState) => {
      return [...prevState, card];
    });
    const find = cards.find((item) => item.reqNumber === card.reqNumber);
    find.deleted = 0;
    show(find.UID);
  };

  const cancelCard = (card) => {
    setFiltredCards(
      filtredCards.filter((item) => item.reqNumber !== card.reqNumber)
    );
    setCardsCanceled((prevState) => {
      return [...prevState, card];
    });
    const find = cards.find((item) => item.reqNumber === card.reqNumber);
    find.deleted = 1;
    hide(find.UID);
  };

  const handlerArrAct = (card, action) => {
    action ? addToAct(card) : removeFromAct(card);
  };

  const addToAct = (card) => {
    setCardsAct((prevState) => {
      return [...prevState, card];
    });
  };

  const removeFromAct = (card) => {
    setCardsAct(cardsAct.filter((item) => item.reqNumber !== card.reqNumber));
  };

  const applyFilter = (key) => {
    if (key === 'all') {
      sortCards(cards);
      return;
    }
    sortCards(cards.filter((item) => item[key] > 0));
  };

  const handlerEdit = (key, value, uid) => {
    const res = {
      entityId: uid,
      action: key === 'price' ? 'setPrice' : 'setComment',
    };
    res[key] = value;
    setEdit(res);
    const find = cards.find((item) => item.UID === uid);
    find[key] = value;
  };

  const handleReload = () => {
    location.reload();
  };

  const value = {
    comeBack,
    cancelCard,
    handlerEdit,
    applyFilter,
    handlerArrAct,
    cards,
    cardsAct,
    countLiked,
    countVeiwes,
    filtredCards,
    cardsCanceled,
    phoneList,
  };
  return (
    <Context.Provider value={value}>
      {loading ? (
        <Linear />
      ) : (
        <>
          {error ? (
            <span className='text'>
              Если вы добавили объект в подборку, но не видите его. Нажмите{' '}
              <Link
                underline='hover'
                onClick={handleReload}
                sx={{ cursor: 'pointer' }}
              >
                сюда
              </Link>
            </span>
          ) : (
            <>{props.children}</>
          )}
        </>
      )}
    </Context.Provider>
  );
};
