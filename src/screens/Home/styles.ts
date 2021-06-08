import styled, { css } from "styled-components/native";
import { FlatList } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";

import { UserGithubProps } from '../../components/UserGithub';

export const Container = styled.View`
  ${({ theme }) => css`
    flex: 1;
    background-color: ${theme.colors.primary};
  `}
`;

export const WrapperSearch = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 50px;
`;

export const Input = styled.TextInput`
  ${({ theme }) => css`
    width: 75%;
    height: 50px;
    border: 1px solid ${theme.colors.text};
    border-radius: 10px;
    padding: 0 10px;
    color: ${theme.colors.text};
  `}
`;

export const Button = styled.TouchableOpacity`
  ${({ theme }) => css`
    width: 22%;
    height: 50px;
    background-color: ${theme.colors.secondary};
    border-radius: 10px;
    justify-content: center;
    align-items: center;
  `}
`;

export const Icon = styled(FontAwesome)`
  ${({ theme }) => css`
    font-size: 25px;
    color: ${theme.colors.background};
  `}
`;

export const ListUsersTitle = styled.Text`
  ${({ theme }) => css`
    font-size: 16px;
    color: ${theme.colors.text};
  `}
`;

export const ListUsers = styled(FlatList as new () => FlatList<UserGithubProps>).attrs({
  showsVerticalScrollIndicator: false
})`
  flex: 1;
`;
