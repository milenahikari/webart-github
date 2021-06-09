import styled, { css } from 'styled-components/native';

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

export const ListFavoriteUsers = styled.FlatList``;

export const EmptyUsersFavorites = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const EmptyUsersFavoritesText = styled.Text`
  ${({ theme }) => css`
    font-size: 14px;
    color: ${theme.colors.text};
  `}
`;