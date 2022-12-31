import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Flex } from "../../components";
import styled from "styled-components/native";
import { LinkContext } from "../../context/link";
import { AuthContext } from "../../context/auth";

import { useNavigation, useRoute } from "@react-navigation/native";

const IconContainer = styled.View`
	position: absolute;
	top: 15px;
	display: flex;
	flex-direction: row;
	width: 100%;
	align-items: center;
	justify-content: space-evenly;
`;

const CustomIcon = styled.TouchableOpacity`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const styles = StyleSheet.create({
	shadow: {
		shadowColor: "#333",
		shadowOffset: {
			width: 0,
			height: 0
		},
		shadowOpacity: 0.5,
		shadowRadius: 5
	}
});
const IconSet = ({
	handleLike,
	handleUnlike,
	link = {},
	showIcons = false,
	auth
}) => {
	let date;
	const d = new Date(link.createdAt);
	date = d.getDate() + "/" + d.getMonth() + 1 + "/" + d.getFullYear();

	const navigation = useNavigation();
	const route = useRoute();
	return (
		<>
			<IconContainer>
				{showIcons && (
					<>
						{link?.likes?.includes(auth?.user._id) ? (
							<CustomIcon onPress={() => handleUnlike(link)}>
								<FontAwesome5
									name="heart"
									size={25}
									color="orange"
									solid
									style={styles.shadow}
								/>
								<Text>{link?.likes?.length}</Text>
							</CustomIcon>
						) : (
							<CustomIcon onPress={() => handleLike(link)}>
								<FontAwesome5
									name="heart"
									size={25}
									color="orange"
									style={styles.shadow}
								/>
								<Text>{link?.likes?.length}</Text>
							</CustomIcon>
						)}

						<CustomIcon>
							<FontAwesome5
								name="eye"
								size={25}
								color="orange"
								style={styles.shadow}
							/>
							<Text>{link.views}</Text>
						</CustomIcon>
						<CustomIcon>
							<FontAwesome5
								name="clock"
								size={25}
								color="orange"
								style={styles.shadow}
							/>
							<Text>{date}</Text>
						</CustomIcon>
						<CustomIcon
							onPress={() =>
								navigation.navigate("Profile", {
									name: link.postedBy?.name,
									_id: link.postedBy?._id
								})
							}
						>
							<FontAwesome5
								name="user"
								size={25}
								color="orange"
								style={styles.shadow}
							/>
							<Text>{link.postedBy?.name}</Text>
						</CustomIcon>
					</>
				)}
			</IconContainer>
		</>
	);
};

export default IconSet;
