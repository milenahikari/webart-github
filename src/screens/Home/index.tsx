import React from "react";
import { Header } from "../../components/Header";
import { Search } from "../../components/Search";

import * as S from "./styles";

export function Home() {
  return (
    <S.Container>
      <Header />

      <Search />
    </S.Container>
  );
}
