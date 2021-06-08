import React, { useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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

  const handleSelectedUser = useCallback(async () => {
    try {
      await AsyncStorage.setItem('@Github:userSelected', JSON.stringify(data));
      navigation.navigate('Repositories')
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

      <S.Icon name="chevron-right"/>
    </S.Container>
  );
}