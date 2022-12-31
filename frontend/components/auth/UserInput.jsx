import React from "react";
import styled from "styled-components/native";
import { View, Text, TextInput } from "react-native";

const Input = styled.TextInput`
	border-bottom-width: 0.5px;
	height: 15px;
	border-bottom-color: ${(props) => props.theme.colors.ui.primary};
	margin-bottom: 10px;
`;

const CustomText = styled.Text`
	margin-top: 14px;
`;

const UserInput = ({
	placeholder,
	name,
	setValue,
	autoCapitalize = "none",
	keyboardType = "default",
	secureTextEntry = false
}) => {
	return (
		<View>
			<CustomText>{name}</CustomText>
			<Input
				placeholder={placeholder}
				onChangeText={(text) => setValue(text)}
				autoCorrect={false}
				autoCapitalize={autoCapitalize}
				keyboardType={keyboardType}
				secureTextEntry={secureTextEntry}
			></Input>
		</View>
	);
};

export default UserInput;
