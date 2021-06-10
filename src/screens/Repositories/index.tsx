import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { useTheme } from "styled-components";

import api from '../../services/api';

import { Header } from "../../components/Header";
import { Body } from "../../components/Body";
import { UserGithubProps } from "../../components/CardUserGithub";
import { RepositoryProps, CardRepository } from '../../components/CardRepository';

import * as S from './styles';

export function Repositories() {
  const theme = useTheme();
  const { params } = useRoute();
  const routeParams = params as UserGithubProps;

  const keyFavoriteStorage = '@Github:favoriteUsers';

  const [loading, setLoading] = useState(false);
  const [isFavoriteUser, setIsFavoriteUser] = useState(false);
  const [userRepositories, setUserRepositories] = useState<RepositoryProps[]>([]);

  useEffect(() => {
    async function getRepositories() {
      try {

        setLoading(true);

        const response = await api.get(`users/${routeParams.login}/repos`);
      
        const repositories = response.data;

        const repositoriesFormatted = repositories.map((item: RepositoryProps) => ({
          id: item.id,
          name: item.name,
          description: item.description,
          html_url: item.html_url,
          full_name: item.full_name
        }));

        setUserRepositories(repositoriesFormatted);
        setLoading(false);

      } catch(err) {
        console.log(err);
      }
    }

    async function validateFavoriteUser() {
      try {
        const dataStorage = await AsyncStorage.getItem(keyFavoriteStorage);

        const favoriteUsersStorage:UserGithubProps[] = dataStorage ? JSON.parse(dataStorage) : [];

        if(!favoriteUsersStorage.length) return;

        const foundUser = favoriteUsersStorage.find((user: UserGithubProps) => user.id === routeParams.id);

        if(foundUser) {
          setIsFavoriteUser(true);
          return;
        }

        setIsFavoriteUser(false);

      } catch(err) {
        console.log(err);
      }
    }

    getRepositories();
    validateFavoriteUser();
  }, [routeParams]);

  const handleToggleFavoriteUser = useCallback(async () => {
    try {
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

    } catch(err) {
      console.log(err);
    }
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

        { 
          loading 
          ? <S.WrapperLoading>
              <ActivityIndicator size="large" color={theme.colors.text}/>
            </S.WrapperLoading>

          : <S.ListRepositories 
              data={userRepositories}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item: repository}) => (
                <CardRepository data={repository}/>
              )}
            />
        }
        
      </Body>
    </S.Container>
  );
}