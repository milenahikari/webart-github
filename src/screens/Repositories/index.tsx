import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../services/api';

import { Header } from "../../components/Header";
import { Body } from "../../components/Body";
import { UserGithubProps } from "../../components/CardUserGithub";
import { RepositoryProps, CardRepository } from '../../components/CardRepository';

import * as S from './styles';

export function Repositories() {
  const keyFavoriteStorage = '@Github:favoriteUsers';
  const keyUserSelectedStorage = '@Github:userSelected';

  const [isUserFavorite, setIsUserFavorite] = useState(false);
  const [userSelected, setUserSelected] = useState<UserGithubProps>({} as UserGithubProps);
  const [userRepositories, setUserRepositories] = useState<RepositoryProps[]>([]);

  useEffect(() => {
    async function getRepositories() {
      const dataStorage = await AsyncStorage.getItem(keyUserSelectedStorage);

      const user = JSON.parse(dataStorage!);

      const response = await api.get(`users/${user.login}/repos`);
      
      setUserSelected(user);
      setUserRepositories(response.data);
    }

    getRepositories();
  }, []);

  useEffect(() => {
    async function validateUserFavorite() {
      const dataStorage = await AsyncStorage.getItem(keyFavoriteStorage);

      const favoriteUsersStorage = dataStorage ? JSON.parse(dataStorage) : [];

      if(!favoriteUsersStorage.lenght) return;

      const foundUser = favoriteUsersStorage.find((user: UserGithubProps) => user.id === userSelected.id);

      if(foundUser) {
        setIsUserFavorite(true);
        return;
      }

      setIsUserFavorite(false);
    }

    validateUserFavorite();
  }, []);

  const handleToggleFavoriteUser = useCallback(async () => {
    const dataStorage = await AsyncStorage.getItem(keyFavoriteStorage);

    const favoriteUsersStorage = dataStorage ? JSON.parse(dataStorage) : [];

    if(isUserFavorite) {
      const filteredUsersFavorites = favoriteUsersStorage.filter((user: UserGithubProps) => user.id !== userSelected.id);

      await AsyncStorage.setItem(keyFavoriteStorage, JSON.stringify(filteredUsersFavorites));

      setIsUserFavorite(false);
      return;
    }

    const favoriteUsersFormatted = [
      ...favoriteUsersStorage,
      userSelected
    ];

    await AsyncStorage.setItem(keyFavoriteStorage, JSON.stringify(favoriteUsersFormatted));

    setIsUserFavorite(true);
  }, []);

  return(
    <S.Container>
      <Header />

      <Body>
        <S.WrapperFavorite>
          <S.Title>Favoritar {userSelected.login} ?</S.Title>

          <S.ButtonFavorite onPress={handleToggleFavoriteUser}>
            <S.Icon name="heart" favorite={isUserFavorite}/>
          </S.ButtonFavorite>
        </S.WrapperFavorite>

        <S.ListRepositories 
          data={userRepositories}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({item: repository}) => (
            <CardRepository data={repository}/>
          )}
        />
      </Body>
    </S.Container>
  );
}