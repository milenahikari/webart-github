import React from 'react';

import { Header } from "../../components/Header";
import { Body } from "../../components/Body";

import * as S from './styles';

export function Favorites() {
  return(
    <S.Container>
      <Header />

      <Body>
        <S.Title> Meus Favoritos</S.Title>
      </Body>
    </S.Container>
  );
}