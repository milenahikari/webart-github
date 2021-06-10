import React from 'react';
import { Alert, Linking } from 'react-native';

import * as S from './styles';

export type RepositoryProps = {
  id: number;
  name: string;
  description?: string;
  html_url?: string;
  full_name?: string;
};

type Props = {
  data: RepositoryProps;
}

export function CardRepository({data}: Props) {
  return (
    <S.Container
      onPress={() => 
        Linking.openURL(`${data.html_url}`).catch(err => {
          Linking.openURL(`http://github.com/${data.full_name}`).catch(err => {
            Alert.alert('Não foi possível carregar a página do repositório. Tente novamente!')
        })
      })}
    >
      <S.Icon name="folder"/>

      <S.WrapperInfo>
        <S.Name>{data.name}</S.Name>

        <S.Description>{data.description}</S.Description>
      </S.WrapperInfo>
    </S.Container>
  );
}