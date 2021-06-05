import styled, { css } from "styled-components/native";
import { Feather } from "@expo/vector-icons";

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
`;

export const Input = styled.TextInput`
  ${({ theme }) => css`
    width: 75%;
    height: 50px;
    border: 1px solid ${theme.colors.text};
    border-radius: 10px;
    padding-left: 10px;
  `}
`;

export const Button = styled.TouchableOpacity`
  ${({ theme }) => css`
    width: 23%;
    background-color: ${theme.colors.secondary};
    border-radius: 10px;
    justify-content: center;
    align-items: center;
  `}
`;

export const Icon = styled(Feather)`
  ${({ theme }) => css`
    font-size: 30px;
    color: ${theme.colors.background};
  `}
`;
