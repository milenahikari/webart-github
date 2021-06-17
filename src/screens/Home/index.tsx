import React, { useState, useCallback } from "react";
import { Alert, ActivityIndicator } from 'react-native';
import { useTheme } from "styled-components";

import api from '../../services/api';

import { Header } from "../../components/Header";
import { Body } from "../../components/Body";
import { DetailNotFound } from "../../components/DetailNotFound";
import { CardUserGithub, UserGithubProps } from "../../components/CardUserGithub";

import * as S from "./styles";

export function Home() {
  const theme = useTheme();

  const [loading, setLoading] = useState(false);
  const [searchedUser, setSearchedUser] = useState('');
  const [usersGithub, setUsersGithub] = useState<UserGithubProps[]>([]);

  const handleSearchUser = useCallback(async() => {
    try {

      if(!searchedUser) {
        setUsersGithub([]);
        Alert.alert('Digite um usuário para pesquisar!');
        return;
      }

      setLoading(true);

      const response = await api.get(`/search/users?q=${searchedUser}`);

      const { items } = response.data;

      const users = items.map((item: UserGithubProps) => ({
        id: item.id,
        login: item.login,
        avatar_url: item.avatar_url
      }));

      setUsersGithub(users);
      setSearchedUser('');
      setLoading(false);

    } catch(err) {
      console.log(err);
    }
  }, [searchedUser, setUsersGithub]);

  return (
    <S.Container>
      <Header />

      <Body>
        <S.WrapperSearch>
          <S.Input
            placeholder= "Buscar usuário"
            returnKeyType="search"
            onSubmitEditing={() => handleSearchUser()}
            onChangeText={setSearchedUser}
            value={searchedUser}
          />

          <S.Button onPress={handleSearchUser}>
            { 
              loading 
              ? <ActivityIndicator size="small" color={theme.colors.background} />
              : <S.Icon name="search"></S.Icon>
            }
            
          </S.Button>
        </S.WrapperSearch>

        
        { !! usersGithub.length &&  <S.ListUsersTitle>Usuários encontrados</S.ListUsersTitle>}

        <S.ListUsers
          data={usersGithub}
          keyExtractor={user => user.id.toString()}
          renderItem={({item: user}) => (
            <CardUserGithub data={user}/>
          )}
          ListEmptyComponent={<DetailNotFound />}
        />    
        
      </Body>
    </S.Container>
  );
}
