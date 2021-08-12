import "react-native-gesture-handler";

import { StatusBar } from "expo-status-bar";

import React, { useState, useEffect } from "react";
import { NativeBaseProvider, Box } from "native-base";
import { View } from "react-native";
import Amplify, { Auth } from "aws-amplify";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ActivityIndicator, Colors } from "react-native-paper";

import SignIn from "./src/screens/Auth/SignIn";
import SignUp from "./src/screens/Auth/SignUp";
import SignIn2 from "./src/screens/Auth/SignIn2";

import ConfirmSignUp from "./src/screens/Auth/ConfirmSignUp";

import TabNavigator from "./src/navigation/TabNavigator/index";

import config from "./src/aws-exports.js";

import Toast, { BaseToast } from "react-native-toast-message";

Amplify.configure(config);

const AuthenticationStack = createStackNavigator();

const toastConfig = {
	success2: ({ text1, text2, ...rest }) => (
		<BaseToast
			{...rest}
			style={{
				borderLeftColor: "#15B097",
				backgroundColor: "#71F79F",
				borderLeftWidth: 5,
				margin: 50,
				height: 80,
			}}
			contentContainerStyle={{
				paddingHorizontal: 15,
				justifyContent: "center",
				alignItems: "center",
			}}
			text1Style={{
				color: "#000814",
				fontSize: 30,
				fontWeight: "normal",
			}}
			text2Style={{
				color: "#000814",
				fontSize: 20,
				fontWeight: "normal",
			}}
			text1={text1}
			text2={text2}
		/>
	),
	success: ({ text1, ...rest }) => (
		<BaseToast
			{...rest}
			style={{
				borderLeftColor: "#15B097",
				backgroundColor: "#71F79F",
				borderLeftWidth: 5,
				margin: 50,
				height: 80,
			}}
			contentContainerStyle={{
				paddingHorizontal: 15,
				justifyContent: "center",
				alignItems: "center",
			}}
			text1Style={{
				color: "#000814",
				fontSize: 30,
				fontWeight: "normal",
			}}
			text1={text1}
			text2={null}
		/>
	),
	error: ({ text1, ...rest }) => (
		<BaseToast
			{...rest}
			style={{
				borderLeftColor: "#F1FAEE",
				backgroundColor: "#E63946",
				borderLeftWidth: 5,
				margin: 50,
				height: 50,
			}}
			contentContainerStyle={{
				paddingHorizontal: 15,
				justifyContent: "center",
				alignItems: "center",
			}}
			text1Style={{
				color: "white",
				fontSize: 20,
				fontWeight: "normal",
			}}
			text1={text1}
			text2={null}
		/>
	),
};

const AuthenticationNavigator = (props) => {
	return (
		<AuthenticationStack.Navigator headerMode="none">
			<AuthenticationStack.Screen name="SignIn">
				{(screenProps) => (
					<SignIn {...screenProps} updateAuthState={props.updateAuthState} />
				)}
			</AuthenticationStack.Screen>

			<AuthenticationStack.Screen name="SignUp" component={SignUp} />

			<AuthenticationStack.Screen
				name="ConfirmSignUp"
				component={ConfirmSignUp}
			/>
		</AuthenticationStack.Navigator>
	);
};

const Initializing = () => {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<ActivityIndicator animating={true} color={Colors.red800} />
		</View>
	);
};

function App() {
	const [isUserLoggedIn, setUserLoggedIn] = useState("initializing");

	useEffect(() => {
		checkAuthState();
	}, []);

	async function checkAuthState() {
		try {
			await Auth.currentAuthenticatedUser();
			console.log(" User is signed in");
			setUserLoggedIn("loggedIn");
		} catch (err) {
			console.log(" User is not signed in");
			setUserLoggedIn("loggedOut");
		}
	}

	function updateAuthState(isUserLoggedIn) {
		setUserLoggedIn(isUserLoggedIn);
	}

	return (
		<>
			<NavigationContainer>
				{isUserLoggedIn === "initializing" && <Initializing />}
				{isUserLoggedIn === "loggedIn" && (
					<TabNavigator updateAuthState={updateAuthState} />
				)}
				{isUserLoggedIn === "loggedOut" && (
					<AuthenticationNavigator updateAuthState={updateAuthState} />
				)}
				<Toast config={toastConfig} ref={(ref) => Toast.setRef(ref)} />
			</NavigationContainer>
		</>
	);
}

export default App;
