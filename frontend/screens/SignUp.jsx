import React, { useState, useContext } from "react";
import {
	Text,
	View,
	TextInput,
	Button,
	TouchableOpacity,
	ScrollView
} from "react-native";
import styled from "styled-components/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

import { UserInput, SubmitButton, CircleLogo } from "../components/auth";
import { Flex } from "../components";
import { AuthContext } from "../context/auth";

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

const SignUp = ({ navigation }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [state, setState] = useContext(AuthContext);

	const handleSubmit = async () => {
		setLoading(true);
		if (!name || !email || !password) {
			alert("All fields are required");
			setLoading(false);
			return;
		}
		try {
			const { data } = await axios.post("http://localhost:8000/api/signup", {
				name,
				email,
				password
			});
			if (data.error) {
				alert(data.error);
				setLoading(false);
			} else {
				setState(data);
				console.log("Sign in successfull", data);
				setLoading(false);
				alert("sing up successfull");

				// redirect

				navigation.navigate("Home");
				console.log("navigate");
			}
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<>
			<CircleLogo />
			<Container>
				<Title>SignUp</Title>
				<UserInput
					name="Name"
					value={name}
					setValue={setName}
					autoCapitalize="words"
					autoCorrect={false}
				/>

				<UserInput
					name="Email"
					value={email}
					setValue={setEmail}
					autoComplete="email"
					keyboardType="email-address"
				/>
				<UserInput
					name="Password"
					value={password}
					setValue={setPassword}
					secureTextEntry={true}
					autoComplete="password"
				/>

				<SubmitButton
					title="Submit"
					handleSubmit={handleSubmit}
					loading={loading}
				/>
				<Flex center>
					<Text>
						Already Joined?{" "}
						<Text
							style={{ color: "blue" }}
							onPress={() => navigation.navigate("SignIn")}
						>
							Sign In
						</Text>
					</Text>
				</Flex>
			</Container>
		</>
	);
};

export default SignUp;
