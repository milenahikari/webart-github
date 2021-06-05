import React from "react";

import * as S from "./styles";

export function Search() {
  return (
    <S.Container>
      <S.Input placeholder="Buscar usuário" />

      <S.Button>
        <S.Icon name="search"></S.Icon>
      </S.Button>
    </S.Container>
  );
}
