import React from "react";
import { Header } from "../../components/Header";

import * as S from "./styles";

export function Home() {
  return (
    <S.Container>
      <Header />
      <S.Texto>Teste fonte</S.Texto>
    </S.Container>
  );
}
