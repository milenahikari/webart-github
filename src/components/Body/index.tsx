import React, { ReactNode } from "react";

import * as S from "./styles";

type BodyProps = {
  children: ReactNode;
}
export function Body({ children }: BodyProps) {
  return (
    <S.Container>
      {children}
    </S.Container>
  );
}
