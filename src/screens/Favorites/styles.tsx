import styled, { css } from 'styled-components/native';
import { FlatList } from 'react-native';
import { UserGithubProps } from '../../components/CardUserGithub';

export const Container = styled.View`
  ${({ theme }) => css`
    flex: 1;
    background-color: ${theme.colors.primary};
  `}
`;

export const Title = styled.Text`
  ${({ theme }) => css`
    font-size: 16px;
    color: ${theme.colors.text};
  `}
`;

export const ListFavoriteUsers = styled(FlatList as new () => FlatList<UserGithubProps>)``;

export const EmptyFavoriteUsers = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const EmptyFavoriteUsersText = styled.Text`
  ${({ theme }) => css`
    font-size: 14px;
    color: ${theme.colors.text};
  `}
`;