import React, { useCallback } from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as S from './styles';

export type UserGithubProps = {
  id: number;
  login: string;
  avatar_url: string;
}

export type CardUserGithubProps = {
  type?: 'default' | 'delete';
  data: UserGithubProps;
}

export function CardUserGithub({ type= 'default', data }: CardUserGithubProps) {
  const navigation = useNavigation();

  const keyFavoriteStorage = '@Github:favoriteUsers';

  const handleSelectedUser = useCallback(async () => {
    try {
      navigation.navigate('Repositories', {id: data.id, login: data.login, avatar_url: data.avatar_url})
    } catch(err) {
      console.log(err);
    }
  }, []);

  const handleRemoveFavoriteUser = useCallback(async (id: number) => {
    try {
      const dataStorage = await AsyncStorage.getItem(keyFavoriteStorage);

      const favoriteUsersStorage = dataStorage ? JSON.parse(dataStorage) : [];

      const filteredFavoriteUsers = favoriteUsersStorage.filter((user: UserGithubProps) => user.id !== id);

      await AsyncStorage.setItem(keyFavoriteStorage, JSON.stringify(filteredFavoriteUsers));
    } catch(err) {
      console.log(err);
    }
  }, []);

  return (
    <S.Container onPress={() => type == 'default' ? handleSelectedUser() : handleRemoveFavoriteUser(data.id)}>
      <S.WrapperInfo>
        <S.Image source={{uri: data.avatar_url}} />
        
        <S.Nome>{data.login}</S.Nome>
      </S.WrapperInfo>

      <S.Icon type={type}/>
    </S.Container>
  );
}