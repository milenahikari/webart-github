import styled, { css } from "styled-components/native";

export const Container = styled.View`
  ${({ theme }) => css`
    flex: 1;
    padding: 60px 30px;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    background-color: ${theme.colors.background};
  `}
`;