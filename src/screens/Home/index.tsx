import React from "react";
import { Header } from "../../components/Header";
import { Search } from "../../components/Search";
import { DetailNotFound } from "../../components/DetailNotFound";

import * as S from "./styles";

export function Home() {
  return (
    <S.Container>
      <Header />

      <S.WrapperScreen>
        <Search />

        <DetailNotFound />
      </S.WrapperScreen>
    </S.Container>
  );
}
