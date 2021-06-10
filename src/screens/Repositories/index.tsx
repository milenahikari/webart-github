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

  const [isFavoriteUser, setIsFavoriteUser] = useState(false);
  const [userRepositories, setUserRepositories] = useState<RepositoryProps[]>([]);

  useEffect(() => {
    async function getRepositories() {
      const response = await api.get(`users/${routeParams.login}/repos`);
      
      setUserRepositories(response.data);
    }

    async function validateFavoriteUser() {
      const dataStorage = await AsyncStorage.getItem(keyFavoriteStorage);

      const favoriteUsersStorage:UserGithubProps[] = dataStorage ? JSON.parse(dataStorage) : [];

      if(!favoriteUsersStorage.length) return;

      const foundUser = favoriteUsersStorage.find((user: UserGithubProps) => user.id === routeParams.id);

      if(foundUser) {
        setIsFavoriteUser(true);
        return;
      }

      setIsFavoriteUser(false);
    }

    getRepositories();
    validateFavoriteUser();
  }, [routeParams]);

  const handleToggleFavoriteUser = useCallback(async () => {
    const dataStorage = await AsyncStorage.getItem(keyFavoriteStorage);

    const favoriteUsersStorage = dataStorage ? JSON.parse(dataStorage) : [];

    if(isFavoriteUser) {
      const filteredFavoriteUsers = favoriteUsersStorage.filter((user: UserGithubProps) => user.id !== routeParams.id);

      await AsyncStorage.setItem(keyFavoriteStorage, JSON.stringify(filteredFavoriteUsers));

      setIsFavoriteUser(false);
      return;
    }

    const favoriteUsersFormatted = [
      ...favoriteUsersStorage,
      routeParams
    ];

    await AsyncStorage.setItem(keyFavoriteStorage, JSON.stringify(favoriteUsersFormatted));

    setIsFavoriteUser(true);
  }, [routeParams, isFavoriteUser]);

  return(
    <S.Container>
      <Header />

      <Body>
        <S.WrapperFavorite>
          <S.Title>Favoritar {routeParams.login} ?</S.Title>

          <S.ButtonFavorite onPress={handleToggleFavoriteUser}>
            <S.Icon name="heart" favorite={isFavoriteUser}/>
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