import { StatusBar } from "expo-status-bar";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Navigation } from "./Navigation";

export default function App() {
	const Stack = createNativeStackNavigator();

	return <Navigation />;
}
