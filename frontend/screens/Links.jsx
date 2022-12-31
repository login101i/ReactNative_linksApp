import React from "react";

import { Text, View } from "react-native";
import { FooterTabs } from "../components/nav";

import styled from "styled-components/native";

const Container = styled.View`
	display: flex;
	flex: 1;
`;

const Links = () => {
	return (
		<>
			<Container>
				<Text>Links</Text>
			</Container>
			<FooterTabs />
		</>
	);
};

export default Links;
