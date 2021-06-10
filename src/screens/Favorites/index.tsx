import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { Header } from "../../components/Header";
import { Body } from "../../components/Body";
import { CardUserGithub, UserGithubProps } from '../../components/CardUserGithub';

import * as S from './styles';

export function Favorites() {
  const keyFavoriteStorage = '@Github:favoriteUsers';
  const [favoriteUsers, setFavoriteUsers] = useState<UserGithubProps[]>([]);

  useEffect(() => {
    async function getFavoriteUsers() {
      const dataStorage = await AsyncStorage.getItem(keyFavoriteStorage);

      const favoriteUsersStorage = dataStorage ? JSON.parse(dataStorage) : [];

      if(!favoriteUsersStorage.lenght) setFavoriteUsers(favoriteUsersStorage);
    }

    getFavoriteUsers();
  }, [AsyncStorage,favoriteUsers]);

  return(
    <S.Container>
      <Header />

      <Body>
        <S.Title> Meus Favoritos</S.Title>
        
        { 
          favoriteUsers.length
          ? <S.ListFavoriteUsers 
              data={favoriteUsers}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({item: user}) => (
                <CardUserGithub type="delete" data={user} />
              )}
            />
          : <S.EmptyFavoriteUsers>
              <S.EmptyFavoriteUsersText>Você ainda não possui favoritos</S.EmptyFavoriteUsersText>
            </S.EmptyFavoriteUsers>
        }
        
      </Body>
    </S.Container>
  );
}