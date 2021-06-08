import React from 'react';

import * as S from './styles';

export type RepositoryProps = {
  id: number;
  name: string;
  description?: string;
};

type Props = {
  data: RepositoryProps;
}

export function CardRepository({data}: Props) {
  // console.log(data);
  return (
    <S.Container>
      <S.Icon name="folder"/>

      <S.WrapperInfo>
        <S.Name>{data.name}</S.Name>
        <S.Description>{data.description}</S.Description>
      </S.WrapperInfo>
    </S.Container>
  );
}