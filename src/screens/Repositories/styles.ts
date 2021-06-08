import styled, { css } from 'styled-components/native';
import { FlatList } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';

import { RepositoryProps } from '../../components/CardRepository';

export const Container = styled.View`
  ${({theme}) => css`
    flex: 1;
    background-color: ${theme.colors.primary};
  `}
`;

export const Title = styled.Text`
  ${({theme}) => css`
    font-size: 16px;
    color: ${theme.colors.text};
  `}
`;

export const WrapperFavorite = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonFavorite = styled(BorderlessButton)`
  ${({theme}) => css`
    background-color: ${theme.colors.text_light};
    padding: 10px;
    border-radius: 20px;
  `}
`;

export const Icon = styled(FontAwesome)`
  ${({theme}) => css`
    font-size: 20px;
    color: ${theme.colors.shape};
  `}
`;

export const ListRepositories = styled(FlatList as new () => FlatList<RepositoryProps>).attrs({
  showsVerticalScrollIndicator: false
})`
  flex: 1;
`;
