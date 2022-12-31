import React, { useEffect, useState } from "react";

import { Text, View } from "react-native";
import { FooterTabs } from "../components/nav";
import { WebView } from "react-native-webview";

import styled from "styled-components/native";

const Container = styled.View`
	display: flex;
	flex: 1;
`;

const LinkView = ({ route }) => {
	const [weblink, setWeblink] = useState("");

	useEffect(() => {
		if (route.params?.link.link.includes("http" || "https")) {
			setWeblink(route.params.link.link);
		} else {
			setWeblink(`http://${route.params.link.link}`);
		}
	}, [route.params?.link]);

	return (
		<View style={{ flex: 1, alignItems: "flex-end" }}>
			<WebView
				source={{ uri: weblink }}
				startInLoadingState={true}
				scalesPageToFit={true}
				style={{
					width: 320,
					height: 300
				}}
			/>
		</View>
	);
};

export default LinkView;
