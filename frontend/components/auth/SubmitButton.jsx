import React from 'react';

import styled from 'styled-components/native';
import { Text, TouchableOpacity } from 'react-native';
import { CustomActivityIndicator } from '../CustomActivityIndicator';

const CustomButton = styled.Text`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5px 10px;
  font-size: 22px;
  background-color: ${(props) => props.theme.colors.orange};
  color: ${(props) => props.theme.colors.black};
  border-radius: 16px;
  margin-vertical: 20px;
  min-width: 300px;
  max-width: 80vw;
  height: 40px;
  align-items: center;
  margin: 10px auto;
`;

const SubmitButton = ({ title, handleSubmit, loading }) => {
  return (
    <>
      {loading ? (
        <CustomActivityIndicator />
      ) : (
        <TouchableOpacity onPress={handleSubmit}>
          <CustomButton>{title}</CustomButton>
        </TouchableOpacity>
      )}
    </>
  );
};

export default SubmitButton;
