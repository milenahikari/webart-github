import styled, { css } from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import { Text } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export const Container = styled(RectButton)`
  flex-direction: row;
  margin-top: 20px;
  padding: 10px;
`;

export const Icon = styled(FontAwesome)`
  ${({theme}) => css`
    font-size: 45px;
    color: ${theme.colors.folder};
    margin-right: 25px;
  `}
`;

export const WrapperInfo = styled.View`
  width: 100%;
  justify-content: center;
`;

export const Name = styled.Text`
  ${({theme}) => css`
    font-size: 18px;
    color: ${theme.colors.primary};
  `}
`;

export const Description = styled(Text).attrs({
  numberOfLines: 1
})`
  ${({theme}) => css`
    font-size: 12px;
    color: ${theme.colors.text_light};
    width: 70%;
  `}
`;