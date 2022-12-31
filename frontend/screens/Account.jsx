import React, { useState, useContext, useEffect } from "react";
import {
	View,
	TextInput,
	Button,
	TouchableOpacity,
	ScrollView,
	Text
} from "react-native";
import styled from "styled-components/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { UserInput, SubmitButton, CircleLogo } from "../components/auth";
import { Flex } from "../components";
import { AuthContext } from "../context/auth";
// import Text from "@kaloraat/react-native-text";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import * as ImagePicker from "expo-image-picker";



const Container = styled.View`
	display: flex;
	flex: 1;
	justify-content: center;
	margin-horizontal: 20px;
`;
const Title = styled.Text`
	border-bottom-color: ${(props) => props.theme.colors.ui.primary};
	padding: 5px;
	font-size: 22px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const CustomImage = styled.Image`
	width: 190px;
	height: 190px;
	border-radius: 100px;
`;

const Account = ({ navigation }) => {
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [image, setImage] = useState({
		url: "",
		public_id: ""
	});

	const [uploadImage, setUploadImage] = useState("");

	const [role, setRole] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [state, setState] = useContext(AuthContext);

	useEffect(() => {
		if (state) {
			const { name, email, role, image } = state.user;
			setName(name);
			setEmail(email);
			setRole(role);
			setImage(image);
		}
	}, [state]);

	const handleSubmit = async () => {
		if (!password) {
			alert("Field is required");
			setLoading(false);
			return;
		}
		try {
			setLoading(true);
			const { data } = await axios.post(
				"http://localhost:8000/api/update-password",
				{
					password
				}
			);
			if (data.error) {
				alert(data.error);
				setLoading(false);
			} else {
				console.log("Password changed successfully", password);
				setLoading(false);
				alert("Password changed successfully");
				setPassword("");
			}
		} catch (err) {
			console.log(err);
		}
	};

	const loadFromAsyncStorage = async () => {
		let data = await AsyncStorage.getItem("@auth");
		console.log("From ASync Storage", data);
	};
	loadFromAsyncStorage();

	const handleUpload = async () => {
		let permissionResult =
			await ImagePicker.requestMediaLibraryPermissionsAsync();
		console.log(
			"🚀 ~ file: Account.jsx ~ line 105 ~ handleUpload ~ permissionResult",
			permissionResult
		);

		if (permissionResult.granted === false) {
			alert("Camera access is required");
			return;
		}
		// No permissions request is necessary for launching the image library
		let result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1
		});
		console.log(
			"🚀 ~ file: Account.jsx ~ line 122 ~ handleUpload ~ result",
			result
		);

		let base64Image = `data:image/jpg;base64,${result.base64}`;

		if (!result.cancelled) {
			setUploadImage(result.uri);
			console.log("UPLOADED IMAGE", result.uri);
			// now send i to backend
		}

		const { data } = await axios.post(
			"http://localhost:8000/api/upload-image",
			{ image: result.uri }
		);
		console.log(
			"🚀 ~ file: Account.jsx ~ line 136 ~ handleUpload ~ data",
			data
		);

		const as = JSON.parse(await AsyncStorage.getItem("@auth"));
		as.user = data;
		await AsyncStorage.setItem("@auth", JSON.stringify(as));

		// update context with
		setState({ ...state, user: data });
		await setImage(data.image);
		alert("Profile image saved 👍 ");
		console.log(image);
	};

	console.log("STATE IN CONTEXT =====>", state);

		const signOut = async () => {
			setState({ token: "", user: null });
			await AsyncStorage.removeItem("@auth");
		};

	return (
		<>
			<Container>
				<Flex column align>
					<CircleLogo>
						{image && image.url ? (
							<CustomImage source={{ uri: image.url }} />
						) : uploadImage ? (
							<CustomImage source={{ uri: uploadImage }} />
						) : (
							<TouchableOpacity onPress={() => handleUpload()}>
								<FontAwesome5 name="camera" size={25} color="orange" />
							</TouchableOpacity>
						)}
					</CircleLogo>

					{image && image.url ? (
						<TouchableOpacity onPress={() => handleUpload()}>
							<FontAwesome5 name="camera" size={25} color="orange" />
						</TouchableOpacity>
					) : (
						<></>
					)}
					<Text>{name}</Text>
					<Text>{email}</Text>
					<Text>{role}</Text>
				</Flex>

				<UserInput
					name="Password"
					value={password}
					setValue={setPassword}
					secureTextEntry={true}
					autoComplete="password"
				/>

				<SubmitButton
					title="Update Password"
					handleSubmit={handleSubmit}
					loading={loading}
				/>

				<Flex center>
					<TouchableOpacity onPress={signOut}>
						<FontAwesome5 name="sign-out-alt" size={35} color="orange" />
					</TouchableOpacity>
				</Flex>
			</Container>
		</>
	);
};

export default Account;
