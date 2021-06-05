import styled, { css } from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";

export const Container = styled.View`
  ${({ theme }) => css`
    width: 100%;
    height: 30%;
    align-items: flex-end;
    background-color: ${theme.colors.header};
  `}
`;

export const Icon = styled(FontAwesome)`
  ${({ theme }) => css`
    font-size: 150px;
    color: ${theme.colors.shape};
    margin-right: 20px;
  `}
`;
