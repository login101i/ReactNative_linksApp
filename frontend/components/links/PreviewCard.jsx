import React, { useContext, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import axios from "axios";
import { LinkContext } from "../../context/link";
import { AuthContext } from "../../context/auth";
import { IconSet } from "../../components/links";

const Container = styled.View`
	display: flex;
	height: 260px;
	background-color: "darkGrey";
	width: 90%;
	border: 2px solid orange;
	margin: 0 auto;
	border-radius: 11px;
	-webkit-box-shadow: -2px 9px 19px -16px rgba(66, 68, 90, 1);
	-moz-box-shadow: -2px 9px 19px -16px rgba(66, 68, 90, 1);
	position: relative;
	background: white;
	margin-vertical: 5px;
`;

const CustomView = styled.View`
	padding: 5px 10px;
`;

const PreviewCard = ({
	ogTitle = "untitled",
	ogUrl,
	requestUrl,
	ogDescription = "No description found",
	ogImage = { url: "https://via.placeholder.com/500x500.png?Image" },
	handlePress = (f) => f,
	link = {},
	showIcons = false
}) => {
	const [links, setLinks] = useContext(LinkContext);
	const [auth, setAuth] = useContext(AuthContext);

	const handleLike = async (link) => {
		const { data } = await axios.put("http://localhost:8000/api/like", {
			linkId: link._id
		});

		setLinks((links) => {
			const index = links.findIndex((l) => l._id === link._id);
			data.postedBy = auth.user;
			links[index] = data;
			return [...links];
		});
	};
	const handleUnlike = async (link) => {
		const { data } = await axios.put("http://localhost:8000/api/unlike", {
			linkId: link._id
		});

		setLinks((links) => {
			const index = links.findIndex((l) => l._id === link._id);
			data.postedBy = auth.user;
			links[index] = data;
			return [...links];
		});
	};

	const ogImageUrl = (ogImage) => {
		if (ogImage?.url) {
			return ogImage.url;
		} else if (ogImage?.length > 0) {
			return ogImage[0].url;
		} else {
			return "ttps://via.placeholder.com/500x500.png?Image";
		}
	};

	return (
		<TouchableOpacity onPress={() => handlePress(link)}>
			<Container>
				<Image
					style={{ height: "80%", width: "100%" }}
					source={{ uri: "https://via.placeholder.com/500x500.png?Image" }}
				/>

				<CustomView>
					<Text>{ogTitle}</Text>
					<Text>{requestUrl}</Text>
					<Text>{requestUrl}</Text>
					<Text>{ogDescription}</Text>
				</CustomView>
				<IconSet
					handleLike={handleLike}
					handleUnlike={handleUnlike}
					link={link}
					showIcons={showIcons}
					auth={auth}
				/>
			</Container>
		</TouchableOpacity>
	);
};

export default PreviewCard;
