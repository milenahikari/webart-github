import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';

import api from '../../services/api';

import { Header } from "../../components/Header";
import { Body } from "../../components/Body";
import { UserGithubProps } from "../../components/CardUserGithub";
import { RepositoryProps, CardRepository } from '../../components/CardRepository';

import * as S from './styles';

export function Repositories() {
  const { params } = useRoute();
  const routeParams = params as UserGithubProps;

  const keyFavoriteStorage = '@Github:favoriteUsers';

  const [isUserFavorite, setIsUserFavorite] = useState(false);
  const [userRepositories, setUserRepositories] = useState<RepositoryProps[]>([]);

  useEffect(() => {
    async function getRepositories() {
      const response = await api.get(`users/${routeParams.login}/repos`);
      
      setUserRepositories(response.data);
    }

    async function validateUserFavorite() {
      const dataStorage = await AsyncStorage.getItem(keyFavoriteStorage);

      const favoriteUsersStorage:UserGithubProps[] = dataStorage ? JSON.parse(dataStorage) : [];

      if(!favoriteUsersStorage.length) return;

      const foundUser = favoriteUsersStorage.find((user: UserGithubProps) => user.id === routeParams.id);

      if(foundUser) {
        setIsUserFavorite(true);
        return;
      }

      setIsUserFavorite(false);
    }

    getRepositories();
    validateUserFavorite();
  }, [routeParams]);

  const handleToggleFavoriteUser = useCallback(async () => {
    const dataStorage = await AsyncStorage.getItem(keyFavoriteStorage);

    const favoriteUsersStorage = dataStorage ? JSON.parse(dataStorage) : [];

    if(isUserFavorite) {
      const filteredUsersFavorites = favoriteUsersStorage.filter((user: UserGithubProps) => user.id !== routeParams.id);

      await AsyncStorage.setItem(keyFavoriteStorage, JSON.stringify(filteredUsersFavorites));

      setIsUserFavorite(false);
      return;
    }

    const favoriteUsersFormatted = [
      ...favoriteUsersStorage,
      routeParams
    ];

    await AsyncStorage.setItem(keyFavoriteStorage, JSON.stringify(favoriteUsersFormatted));

    setIsUserFavorite(true);
  }, [routeParams, isUserFavorite]);

  return(
    <S.Container>
      <Header />

      <Body>
        <S.WrapperFavorite>
          <S.Title>Favoritar {routeParams.login} ?</S.Title>

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