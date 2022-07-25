import React from 'react';

import { Header } from 'components/Header';
import { Title } from 'components/Title';
import { CardsLayout } from 'components/CardsLayout';
import { CardContext } from 'components/CardContext';
import { StatusBar } from 'components/StatusBar';

import './App.scss';

export function App() {
  return (
    <>
      <Header />
      <Title title='Подборки' />
      <CardContext>
        <StatusBar />
        <CardsLayout />
      </CardContext>
    </>
  )
}