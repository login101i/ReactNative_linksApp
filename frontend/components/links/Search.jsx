import React from "react";

import { TextInput, View } from "react-native";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import styled from "styled-components/native";

const Input = styled.TextInput`
	border-width: 0.5px;
	height: 33px;
	width: 90%;
	border-color: ${(props) => props.theme.colors.orange};
	margin-bottom: 10px;
	margin-top: 15px;
	margin-horizontal: 15px;
	border-radius: 15px;
	padding: 2px 10px;
`;

const Search = ({ value, setValue }) => {
	return (
		<View>
			<Input
				placeholder="search"
				onChangeText={(text) => setValue(text)}
				value={value}
				autoCapitalize="none"
			></Input>
		</View>
	);
};

export default Search;
