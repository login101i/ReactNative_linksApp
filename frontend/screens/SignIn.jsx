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

import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
	padding: 5px;
	font-size: 22px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const SignIn = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [state, setState] = useContext(AuthContext);

	const handleSubmit = async () => {
		if (!email || !password) {
			alert("All fields are required");
			setLoading(false);
			return;
		}
		try {
			setLoading(true);
			const { data } = await axios.post("http://localhost:8000/api/signin", {
				email,
				password
			});
			if (data.error) {
				alert(data.error);
				setLoading(false);
			} else {
				setState(data);
				await AsyncStorage.setItem("@auth", JSON.stringify(data));

				console.log("Sign in successfull", data);
				setLoading(false);
				alert("sign in successfull");

				// redirect
				navigation.navigate("Home");
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

	return (
		<>
			<CircleLogo />
			<Container>
				<Title>SignIn</Title>

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
				<Flex column align>
					<Text>
						Not yet registered?
						<TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
							{" "}
							<Text style={{ color: "blue" }}>Sign Up</Text>
						</TouchableOpacity>
					</Text>

					<Text style={{ color: "orange", marginTop: "10px" }}>
						Forgot your password?
						<TouchableOpacity
							onPress={() => navigation.navigate("ForgotPassword")}
						>
							<Text>Reset</Text>
						</TouchableOpacity>
					</Text>
				</Flex>
			</Container>
		</>
	);
};

export default SignIn;
