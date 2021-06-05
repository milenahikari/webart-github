import styled, { css } from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Texto = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.bold};
  `}
`;
