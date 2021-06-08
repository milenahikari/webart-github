import React, { useState, useCallback } from "react";
import { Alert } from 'react-native';

import api from '../../services/api';

import { Header } from "../../components/Header";
import { Body } from "../../components/Body";
import { DetailNotFound } from "../../components/DetailNotFound";
import { CardUserGithub, UserGithubProps } from "../../components/CardUserGithub";

import * as S from "./styles";

export function Home() {
  const [searchedUser, setSearchedUser] = useState('');
  const [usersGithub, setUsersGithub] = useState<UserGithubProps[]>([]);

  const handleSearchUser = useCallback(async() => {
    try {

      if(!searchedUser) {
        setUsersGithub([]);
        Alert.alert('Digite um usuário para pesquisar!');
        return;
      }

      const response = await api.get(`/search/users?q=${searchedUser}`);
      const { items } = response.data;

      setUsersGithub(items);
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
            returnKeyType= "search"
            onChangeText={setSearchedUser}
            value={searchedUser}
          />

          <S.Button onPress={handleSearchUser}>
            <S.Icon name="search"></S.Icon>
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
