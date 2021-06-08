import React from 'react';
import { useNavigation } from '@react-navigation/native';

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

export function CardUserGithub({ data }: Props) {
  const navigation = useNavigation();

  return (
    <S.Container onPress={() => navigation.navigate('Repositories')}>
      <S.WrapperInfo>
        <S.Image source={{uri: data.avatar_url}} />
        
        <S.Nome>{data.login}</S.Nome>
      </S.WrapperInfo>

      <S.Icon name="chevron-right"/>
    </S.Container>
  );
}