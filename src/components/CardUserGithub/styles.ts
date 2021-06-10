import styled, { css, DefaultTheme  } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons';
import { CardUserGithubProps } from ".";

type TypeProps = Pick<CardUserGithubProps, "type">;

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;

export const WrapperInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Image = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  margin-right: 20px;
`;

export const Nome = styled.Text`
  ${({theme}) => css`
    font-family: ${theme.fonts.regular};
    color: ${theme.colors.text};
  `}
`;

const iconModifier = {
  default: (theme: DefaultTheme) => css`
    color: ${theme.colors.text};
  `,

  delete: (theme: DefaultTheme) => css`
    color: ${theme.colors.trash};
  `,
};

export const Icon = styled(FontAwesome).attrs(({ type }) => ({
  name: type == 'default' ? 'chevron-right' : 'trash'
}))<TypeProps>`
  ${({theme, type}) => css`
    font-family: ${theme.fonts.regular};
    font-size: 20px;
    ${iconModifier[type!](theme)}
  `}
`;
