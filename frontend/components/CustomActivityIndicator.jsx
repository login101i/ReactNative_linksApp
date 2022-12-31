import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';

export const CustomActivityIndicator = styled.ActivityIndicator`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px;
  font-size: 22px;
  color: ${(props) => props.theme.colors.primary};
  height: 60px;
  width: 100%;
`;
