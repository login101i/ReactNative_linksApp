import React, { useState, useContext } from "react";

import { SafeAreView, ScrollView, TextInput, Text, View } from "react-native";
import styled from "styled-components/native";
import { FooterTabs } from "../components/nav";
import { SubmitButton } from "../components/auth";
import { Flex } from "../components";
import ogs from "open-graph-scraper-lite";
import urlRegex from "url-regex";
import { PreviewCard } from "../components/links";
import axios from "axios";
import { LinkContext } from "../context/link";

const Container = styled.View`
	display: flex;
	flex: 1;
	justify-content: center;
	margin-horizontal: 20px;
	margin-top: 20px;
`;

const CustomTextInput = styled.TextInput`
	height: 40px;
	border: 1px solid orange;
	margin-vertical: 10px;
	border-radius: 20px;
	padding: 5px 10px;
`;

const PostLink = ({ navigation }) => {
	const [link, setLink] = useState("");
	const [title, setTitle] = useState("");
	const [loading, setLoading] = useState(false);
	const [previewURL, setPreviewURL] = useState({});

	const [links, setLinks] = useContext(LinkContext);

	const handleChange = async (text) => {
		setLink(text);

		try {
			if (urlRegex({ strict: false }).test(text)) {
				setLoading(true);
				console.log("idę dalej");

				const ogp_object = {
					ogTitle: "Udemy",
					ogType: "website",
					ogUrl: "http://ogp.me/",
					ogDescription:
						"The Open Graph protocol enables any web page to become a rich object in a social graph.",
					ogImage: {
						url: "http://ogp.me/logo.png",
						width: "300",
						height: "300",
						type: "image/png"
					},
					requestUrl: "http://ogp.me/",
					success: true
				};

				// ogs({ url: text }, (error, results, response) => {});

				setPreviewURL(ogp_object);

				setLoading(false);
			} else {
				setLoading(false);
			}
		} catch (err) {
			console.log(err);
			setLoading(false);
		}
	};

	const handleSubmit = async () => {
		if (!link || !title) {
			alert("paste url");
			return;
		}

		try {
			const { data } = await axios.post("http://localhost:8000/api/post-link", {
				link,
				title,
				previewURL
			});
			console.log(data);

			setLinks([data, ...links]);

			setTimeout(() => {
				alert("Link posted");
				navigation.navigate("Home");
			}, 500);
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<>
			<Container>
				<Flex center>PostLink</Flex>
				<CustomTextInput
					value={link}
					onChangeText={(text) => handleChange(text)}
					placeholder="Paste the url"
					autoCapitalize="none"
					autoCorrect={false}
				/>
				<CustomTextInput
					value={title}
					onChangeText={(text) => setTitle(text)}
					placeholder="Give me a title"
					autoCapitalize="sentences"
				/>

				{previewURL.success && (
					<View>
						<PreviewCard {...previewURL} />
					</View>
				)}

				<SubmitButton
					title="submit"
					loading={loading}
					handleSubmit={handleSubmit}
				/>
			</Container>

			<FooterTabs />
		</>
	);
};

export default PostLink;
