import React, { useState } from "react";
import api from '../../services/api';

import * as S from "./styles";

export function Search() {
  const [searchUser, setSearchUser] = useState('');

  return (
    <S.Container>
      <S.Input placeholder="Buscar usuário" />

      <S.Button>
        <S.Icon name="search"></S.Icon>
      </S.Button>
    </S.Container>
  );
}
