import React, { useContext } from "react";
import { View, TouchableOpacity, SafeAreaView } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import { AuthContext } from "../../context/auth";
import { Flex } from "../../components";

const HeaderTabs = () => {
	const [state, setState] = useContext(AuthContext);

	const navigation = useNavigation();
	return (
		<SafeAreaView>
			<TouchableOpacity onPress={() => navigation.navigate("TrendingLinks")}>
				<FontAwesome5 name="bell" size={25} color="grey" />
			</TouchableOpacity>
		</SafeAreaView>
	);
};

export default HeaderTabs;
