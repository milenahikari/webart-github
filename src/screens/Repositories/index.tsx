import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../services/api';

import { Header } from "../../components/Header";
import { Body } from "../../components/Body";
import { UserGithubProps } from "../../components/CardUserGithub";
import { RepositoryProps, CardRepository } from '../../components/CardRepository';

import * as S from './styles';

export function Repositories() {
  const [userSelected, setUserSelected] = useState<UserGithubProps>({} as UserGithubProps);
  const [userRepositories, setUserRepositories] = useState<RepositoryProps[]>([]);

  useEffect(() => {
    async function getRepositories() {
      const user = await AsyncStorage.getItem('@Github:userSelected');

      setUserSelected(JSON.parse(user!));

      if(userSelected.hasOwnProperty('login')) {
        const response = await api.get(`users/${userSelected.login}/repos`);
        
        setUserRepositories(response.data);
      }
    }

    getRepositories();
  }, [userSelected]);

  const handleToggleFavoriteUser = useCallback(async () => {
    const favoriteUsersStorage = await AsyncStorage.getItem('@Github:favoriteUsers');
    const favoriteUsers = favoriteUsersStorage ? JSON.parse(favoriteUsersStorage) : [];

    if(!favoriteUsers.lenght) {
      const newUsersFavorites: UserGithubProps[] = [{
        id: userSelected.id,
        login: userSelected.login,
        avatar_url: userSelected.avatar_url
      }];
      
      await AsyncStorage.setItem('@Github:favoriteUsers', JSON.stringify(newUsersFavorites));
      return;
    }


    const foundUser =     const favoriteUsers: UserGithubProps[] = JSON.parse(favoriteUsersStorage);
    .findOne((user) => user.id === userSelected.id);
    console.log(foundUser);
  }, []);

  return(
    <S.Container>
      <Header />

      <Body>
        <S.WrapperFavorite>
          <S.Title>Favoritar {userSelected.login} ?</S.Title>

          <S.ButtonFavorite onPress={handleToggleFavoriteUser}>
            <S.Icon name="heart"/>
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