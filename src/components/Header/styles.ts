import styled, { css } from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";

export const Container = styled.View`
  ${({ theme }) => css`
    width: 100%;
    height: 25%;
    align-items: flex-end;
    background-color: ${theme.colors.primary};
  `}
`;

export const Icon = styled(FontAwesome)`
  ${({ theme }) => css`
    font-size: 150px;
    color: ${theme.colors.text};
    margin-right: 25px;
  `}
`;
