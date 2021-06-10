import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';

import * as S from './styles';

export type UserGithubProps = {
  id: number;
  login: string;
  avatar_url: string;
}

export type CardUserGithubProps = {
  type: 'default' | 'delete';
  data: UserGithubProps;
}

export function CardUserGithub({ type= 'default', data }: CardUserGithubProps) {
  const navigation = useNavigation();

  const handleSelectedUser = useCallback(async () => {
    try {
      navigation.navigate('Repositories', {id: data.id, login: data.login, avatar_url: data.avatar_url})
    } catch(err) {
      console.log(err);
    }
  }, []);

  return (
    <S.Container onPress={handleSelectedUser}>
      <S.WrapperInfo>
        <S.Image source={{uri: data.avatar_url}} />
        
        <S.Nome>{data.login}</S.Nome>
      </S.WrapperInfo>

      <S.Icon name={type == 'default' ? 'chevron-right' : 'trash'}/>
    </S.Container>
  );
}