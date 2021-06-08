import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Header } from "../../components/Header";
import { Body } from "../../components/Body";
import { UserGithubProps } from "../../components/CardUserGithub";

import * as S from './styles';

export function Repositories() {
  const [userSelected, setUserSelected] = useState<UserGithubProps>({} as UserGithubProps);

  useEffect(() => {
    async function loadData() {
      const user = await AsyncStorage.getItem('@Github:userSelected');
      setUserSelected(JSON.parse(user!));
    }

    loadData();
  }, []);

  return(
    <S.Container>
      <Header />

      <Body>
        <S.WrapperFavorite>
          <S.Title>Favoritar {userSelected.login} ?</S.Title>

          <S.ButtonFavorite>
            <S.Icon name="heart"/>
          </S.ButtonFavorite>
        </S.WrapperFavorite>
      </Body>
    </S.Container>
  );
}