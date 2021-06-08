import React from 'react';

import { Header } from "../../components/Header";
import { Body } from "../../components/Body";

import * as S from './styles';

export function Repositories() {
  return(
    <S.Container>
      <Header />

      <Body>
        <S.Title>Favoritar</S.Title>
      </Body>
    </S.Container>
  );
}