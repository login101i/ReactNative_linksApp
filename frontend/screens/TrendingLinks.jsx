import React, { useContext, useEffect } from "react";
import {
	Text,
	View,
	SafeAreaView,
	ScrollView,
	TouchableOpacity,
	ImageBackground
} from "react-native";
import { AuthContext } from "../context/auth";
import { LinkContext } from "../context/link";
import { FooterTabs } from "../components/nav";
import { Flex } from "../components";
import axios from "axios";
import { PreviewCard } from "../components/links";

import styled from "styled-components/native";

const Container = styled.View`
	display: flex;
	flex: 1;
`;

const CustomBackground = styled.ImageBackground`
	flex: 1;
	height: 100%;
	object-fit: contain;
	filter: blur(0.5px);
	filter: opacity(0.5);
	margin-top: 60px;
`;

const CustomView = styled.View`
	min-width: 380px;
	height: 300px;
`;

const TrendingLinks = ({ navigation }) => {
	const [links, setLinks] = useContext(LinkContext);

	useEffect(() => {
		fetchLinks();
	}, []);

	const fetchLinks = async () => {
		const { data } = await axios.get("http://localhost:8800/api/links");

		setLinks(data);
	};

	const handlePress = async (link) => {
		await axios.put(`http://localhost:8800/api/view-count/${link._id}`);
		navigation.navigate("LinkView", { link });

		setLinks(() => {
			const index = links.findIndex((l) => l._id === link._id);
			links[index] = { ...link, views: link.views + 1 };
			return [...links];
		});
	};

	const RenderLinks = ({ links, handlePress }) => (
		<ScrollView showsVerticalScrollIndicator={false} horizontal>
			{links.map((link) => (
				<CustomView key={link._id}>
					<PreviewCard
						{...link.urlPreview}
						handlePress={handlePress}
						link={link}
						showIcons={true}
					/>
				</CustomView>
			))}
			<RenderLinks />
		</ScrollView>
	);

	return (
		<>
			<Container>
				<CustomBackground source={require("../assets/candleBackground.jpg")}>
					<Flex center>Trending Links</Flex>

					<RenderLinks links={links} handlePress={handlePress} />

					<Flex center>Latest Links</Flex>
					<RenderLinks links={links} handlePress={handlePress} />
				</CustomBackground>
			</Container>
			<FooterTabs />
		</>
	);
};

export default TrendingLinks;
