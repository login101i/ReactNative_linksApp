import React from "react";
import { View, Image } from "react-native";

import styled from "styled-components/native";

const Container = styled.View`
	display: flex;
	align-items: center;
	padding: 16px;
	margin-top: 50px;
`;
const CustomImage = styled.Image`
	width: 190px;
	height: 190px;
	border-radius: 50%;
`;

const Border = styled.View`
	width: 190px;
	height: 190px;
	border-radius: 100px;
	display: flex;
	align-items: center;
	justify-content: center;
	background: white;
	z-index: 111;
`;

const CircleLogo = ({ children, image }) => {
	return (
		<Container>
			<Border>
				{children ? (
					children
				) : image ? (
					<Border>
						<CustomImage source={{ uri: image }} />
					</Border>
				) : (
					<CustomImage source={require("../../assets/logo.png")} />
				)}
			</Border>
		</Container>
	);
};

export default CircleLogo;
