import styled, { css } from "styled-components/native";

export const Container = styled.View`
  ${({ theme }) => css`
    flex: 1;
    background-color: ${theme.colors.primary};
  `}
`;

export const WrapperScreen = styled.View`
  ${({ theme }) => css`
    flex: 1;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background-color: ${theme.colors.background};
  `}
`;
