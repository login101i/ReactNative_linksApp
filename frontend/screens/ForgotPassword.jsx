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
	border-bottom-color: ${(props) => props.theme.colors.ui.primary};
	padding: 5px;
	font-size: 22px;
	display: flex;
	justify-content: center;
	align-items: center;
`;

const ForgotPassword = ({ navigation }) => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [state, setState] = useContext(AuthContext);
	const [visible, setVisible] = useState(false);
	const [resetCode, setResetCode] = useState("");

	const handleSubmit = async () => {
		setLoading(true);
		if (!email) {
			alert("Email is required");
			setLoading(false);
			return;
		}

		try {
			const { data } = await axios.post(
				"http://localhost:8800/api/forgot-password",
				{ email }
			);
			if (data.error) {
				alert(data.error);
				setLoading(false);
			} else {
				console.log("RESET DATA PASSWORD--->", data);
				alert("Input code which you received in your email");
				setVisible(true);
				setLoading(false);
			}
		} catch (err) {
			alert("Error sending email, please try again");
			console.log(err);
		}
	};

	const handlePasswordReset = async () => {
		console.log("HANDLE PASSWORD RESET ---->", password, email, resetCode);

		try {
			const { data } = await axios.post(
				"http://localhost:8800/api/reset-password",
				{ email, password, resetCode }
			);
			if (data.error) {
				alert(data.error);
				setLoading(false);
			} else {
				alert("Now you can login with new password");
				navigation.navigate("SignIn");
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
				<Title>Forgot Password</Title>

				<UserInput
					name="Email"
					value={email}
					setValue={setEmail}
					autoComplete="email"
					keyboardType="email-address"
				/>
				{visible && (
					<>
						{" "}
						<UserInput
							name="Your new password"
							value={password}
							setValue={setPassword}
							secureTextEntry={true}
							autoComplete="password"
						/>
						<UserInput
							name="Your reset code"
							value={resetCode}
							setValue={setResetCode}
							secureTextEntry={true}
							autoComplete="password"
						/>
					</>
				)}

				<SubmitButton
					title={visible ? "Reset Password" : "Request Reset Code"}
					handleSubmit={visible ? handlePasswordReset : handleSubmit}
					loading={loading}
				/>
				<Flex center>
					<Text
						style={{ color: "orange" }}
						onPress={() => navigation.navigate("SignIn")}
					>
						Back to SignIn
					</Text>
				</Flex>
			</Container>
		</>
	);
};

export default ForgotPassword;
