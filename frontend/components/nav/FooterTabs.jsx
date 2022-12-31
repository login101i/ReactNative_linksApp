import React, { useContext } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import { View, Text, TouchableOpacity } from "react-native";
import { AuthContext } from "../../context/auth";
import { Flex } from "../../components";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Divider } from "react-native-elements";

const Tab = ({ name, icon, handlePress, screenName, routeName }) => {
    const activeScreenColor=screenName===routeName && "orange"
	return (
		<TouchableOpacity>
			<>
				<FontAwesome5
					name={icon}
					size={25}
					style={{ marginBottom: "10px", alignSelf: "center" }}
					onPress={handlePress}
					color={activeScreenColor}
				/>
				<Text>{name}</Text>
			</>
		</TouchableOpacity>
	);
};

const FooterTabs = () => {
	const navigation = useNavigation();
	const route = useRoute();


	const handlePress = () => {
		console.log("pressed");
	};
	return (
		<>
			<Divider />

			<Flex around>
				<Tab
					name="Home"
					icon="home"
					handlePress={() => navigation.navigate("Home")}
					routeName={route.name}
					screenName="Home"
				/>
				<Tab
					name="Post"
					icon="plus-square"
					handlePress={() => navigation.navigate("PostLink")}
					routeName={route.name}
					screenName="Posts"
				/>

				<Tab
					name="Links"
					icon="list-ol"
					handlePress={() => navigation.navigate("Profile")}
					routeName={route.name}
					screenName="Links"
				/>

				<Tab
					name="Account"
					icon="user"
					handlePress={() => navigation.navigate("Account")}
					routeName={route.name}
					screenName="Account"
				/>
			</Flex>
		</>
	);
};

export default FooterTabs;
