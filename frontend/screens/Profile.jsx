import React, { useState, useEffect, useContext } from "react";
import {
	View,
	Text,
	TouchableOpacity,
	Image,
	ScrollView,
	SafeAreaView,
	ImageBackground
} from "react-native";
import { Divider } from "react-native-elements";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import styled from "styled-components/native";
import { useRoute } from "@react-navigation/native";
import { AuthContext } from "../context/auth";
import { LinkContext } from "../context/link";
import axios from "axios";
import { CircleLogo } from "../components/auth";

import { Flex, Textt } from "../components";

const CustomBackground = styled.ImageBackground`
	flex: 1;
	witd: 100%;
	object-fit: contain;
	filter: blur(0.5px);
`;

const CustomContainer = styled.View`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 100%;
	background-color: white;
`;

const CustomImage = styled.Image`
	width: 100%;
	height: 300px;
`;

const Profile = ({ navigation }) => {
	const [auth, setAuth] = useContext(AuthContext);
	const [links, setLinks] = useContext(LinkContext);


	const [userProfile, setUserProfile] = useState({});
	
	const [userLinks, setUserLinks] = useState([]);


	const [loading, setLoading] = useState(true);

	const route = useRoute();

	const routeParamsId = route?.params?._id;

	useEffect(() => {
		const fetchUserProfile = async (userId) => {
			try {
				const { data } = await axios.get(
					`http://localhost:8000/api/user-profile/${userId}`
				);
				// console.log(data);
				// console.log("------------------------------");
				setUserProfile(data.user);
				setUserLinks(data.links);
				setTimeout(() => {
					setLoading(false);
				}, 2000);
			} catch (err) {
				console.log(err);
			}
		};
		routeParamsId
			? fetchUserProfile(routeParamsId)
			: fetchUserProfile(auth.user._id);
	}, []);

	let date;
	const d = new Date(userProfile.createdAt);
	date = d.getDate() + "/" + d.getMonth() + 1 + "/" + d.getFullYear();

	const hendleDelete = async (linkId) => {
		try {
			setUserLinks((links) => {
				const index = userLinks.findIndex((l) => l._id === linkId);
				userLinks.splice(index, 1);
				return [...links];
			});

			setLinks((links) => {
				const index = links.findIndex((l) => l._id === linkId);
				userLinks.splice(index, 1);
				return [...links];
			});

			await axios.delete(`http://localhost:8000/api/removelink/${linkId}`);

			alert("Link deleted successfully");
		} catch (err) {
			console.log(err);
			alert("Delete failed");
		}
	};

	if (loading) {
		return (
			<CustomContainer>
				<CustomImage source={require("../assets/loadingGif.gif")}></CustomImage>
			</CustomContainer>
		);
	}

	return (
		<CustomBackground source={require("../assets/blurImage.png")}>
			<SafeAreaView>
				<Flex center>
					<Textt size={30}>User Profile</Textt>
				</Flex>
				<CircleLogo image={userProfile?.image?.url} />
				<ScrollView>
					<Flex align column>
						<Textt>{userProfile.name}</Textt>
						<Textt>{userProfile.role}</Textt>
						<Textt>Member from {date}</Textt>

						<Divider width={1} />
					</Flex>
					<ScrollView style={{ padding: "15px" }}>
						<Textt>{userLinks.length} Links</Textt>
						{userLinks.map((link) => (
							<Flex row space key={link._id}>
								<Textt marginTop={10}>{link.previewURL.ogTitle}</Textt>
								{auth?.user?._id === link?.postedBy._id && (
									<TouchableOpacity onPress={() => hendleDelete(link._id)}>
										<FontAwesome5 name="trash" size={20} color="orange" />
									</TouchableOpacity>
								)}
							</Flex>
						))}
					</ScrollView>

					{/* <Text>{JSON.stringify(userProfile, null, 4)}</Text>
					<Text>{JSON.stringify(userLinks, null, 4)}</Text> */}
				</ScrollView>
			</SafeAreaView>
		</CustomBackground>
	);
};

export default Profile;
