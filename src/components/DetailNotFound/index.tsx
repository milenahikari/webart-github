import React from "react";

import octocat from "../../assets/images/octocat.png";

import * as S from "./styles";

export function DetailNotFound() {
  return (
    <S.Container>
      <S.ImageOctocat source={octocat} />

      <S.Message>
        Está meio vazio por aqui! {"\n"}
        Busque por um usuário
      </S.Message>
    </S.Container>
  );
}
