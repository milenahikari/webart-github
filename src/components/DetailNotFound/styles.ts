import styled, { css } from "styled-components/native";

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const ImageOctocat = styled.Image`
  width: 180px;
  height: 180px;
  margin-bottom: 10px;
`;

export const Message = styled.Text`
  ${({ theme }) => css`
    font-family: ${theme.fonts.regular};
    color: ${theme.colors.text};
  `}
`;
