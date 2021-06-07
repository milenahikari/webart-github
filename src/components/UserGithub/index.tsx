import React from 'react';

import * as S from './styles';

export type UserGithubProps = {
  id: number;
  login: string;
  avatar_url: string;
  repos_url: string;
}

type Props = {
  data: UserGithubProps;
}

export function UserGithub({ data }: Props) {
  return (
    <S.Container>
      <S.WrapperInfo>
        <S.Image source={{uri: data.avatar_url}} />
        
        <S.Nome>{data.login}</S.Nome>
      </S.WrapperInfo>

      <S.Icon name="chevron-right"/>
    </S.Container>
  );
}