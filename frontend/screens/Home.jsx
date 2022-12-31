import React, { useContext, useEffect, useState } from "react";
import {
	Text,
	View,
	SafeAreaView,
	ScrollView,
	TouchableOpacity
} from "react-native";
import { AuthContext } from "../context/auth";
import { LinkContext } from "../context/link";
import { FooterTabs } from "../components/nav";
import { Flex } from "../components";
import axios from "axios";
import { PreviewCard, Search } from "../components/links";
import { SubmitButton } from "../components/auth";

import styled from "styled-components/native";

const Container = styled.View`
	display: flex;
	flex: 1;
`;

const Home = ({ navigation }) => {
	const [links, setLinks] = useContext(LinkContext);
	const [state, setState] = useContext(AuthContext);

	const [page, setPage] = useState(1);
	const [linksCount, setLinksCount] = useState(0);
	const [keyword, setKeyword] = useState("");

	useEffect(() => {
		fetchLinks();
	}, [page]);

	const fetchLinks = async () => {
		const { data } = await axios.get(`http://localhost:8000/api/links/${page}`);
		setLinks([...links, ...data]);
	};

	useEffect(() => {
		const linksCount = async () => {
			const { data } = await axios.get("http://localhost:8000/api/links-count");
			setLinksCount(data);
		};
		linksCount();
	}, []);

	const handlePress = async (link) => {
		await axios.put(`http://localhost:8000/api/view-count/${link._id}`);
		navigation.navigate("LinkView", { link });

		setLinks(() => {
			const index = links.findIndex((l) => l._id === link._id);
			links[index] = { ...link, views: link.views + 1 };
			return [...links];
		});
	};

	const searched = (keyword) => (item) => {
		return item.previewURL.ogTitle
			.toLowerCase()
			.includes(keyword.toLowerCase());
	};

	return (
		<>
			<Container>
				<Search value={keyword} setValue={setKeyword} />
				<ScrollView showsVerticalScrollIndicator={false}>
					<Flex center>Recent Links </Flex>
					{links &&
						links.filter(searched(keyword)).map((link) => (
							<View key={link._id}>
							
								<PreviewCard
									{...link.urlPreview}
									handlePress={handlePress}
									link={link}
									showIcons={true}
								/>
							</View>
						))}
					{linksCount > links?.length && (
						<SubmitButton
							title="Load more"
							handleSubmit={() => setPage(page + 1)}
						/>
					)}
				</ScrollView>
			</Container>
			<FooterTabs />
		</>
	);
};

export default Home;
