import React from 'react';

import { Header } from 'components/Header';
import { Title } from 'components/Title';
import { Cards } from 'components/Cards';
import { CardContext } from 'components/CardContext';

import './App.scss';

export function App() {
  return (
    <>
      <Header />
      <Title title='Подборки' />
      <CardContext>
        <Cards />
      </CardContext>
    </>
  )
}