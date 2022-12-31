import React from 'react';
import { Divider } from 'react-native-elements';
import styled from 'styled-components/native';

const SearchContainer = styled.View`
  height: 80px;
  width: 100%;
  border-color: ${(props) => props.theme.colors.orange};
  padding-bottom: 20px;
  padding-top: 20px;
  background-color: ${(props) => props.theme.colors.white};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Input = styled.TextInput`
  border-width: 0.5px;
  width: 90%;
  height: 100%;
  border-color: ${(props) => props.theme.colors.orange};
  margin-bottom: 10px;
  margin-top: 15px;
  margin-horizontal: 15px;
  border-radius: 15px;
  min-height: 40px;
`;

const Search = ({ value, setValue }) => {
  return (
    <>
      <SearchContainer>
        <Input placeholder="Search here" onChangeText={(text) => setValue(text)} value={value} autoCapitalize="none" />
      </SearchContainer>
      <Divider width={4} />
    </>
  );
};

export default Search;
