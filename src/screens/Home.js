import React, { useEffect, useState } from "react";

import { View, StyleSheet, Image } from "react-native";
import Toast from "react-native-toast-message";

import { Auth } from "aws-amplify";
import {
	Container,
	NavigationBar,
	HeaderTitle,
	StatusBar,
	Border,
} from "react-native-scrollable-navigation-bar";

import {
	NativeBaseProvider,
	Box,
	Text,
	Heading,
	VStack,
	FormControl,
	Input,
	Link,
	Button,
	Icon,
	HStack,
	Center,
	Pressable,
} from "native-base";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export default function Home(props) {
	const [Name, setName] = useState("");

	Auth.currentAuthenticatedUser({
		bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
	})

		.then((user) => setName(user.attributes.name))

		.catch((err) => console.log(err));

	function Placeholder(props) {
		return (
			<View style={{ height: 200, margin: 50, backgroundColor: "grey" }} />
		);
	}

	function NavigationBarComponent(props) {
		return (
			<NavigationBar
				title={"Hello World"}
				titleStyle={{ color: "black" }}
				backgroundColor={"#f5f5f5"}
				{...props}
			/>
		);
	}

	function HeaderNavigationBarComponent(props) {
		return <NavigationBar backgroundColor={"#f5f5f5"} {...props} />;
	}

	function HeaderForegroundComponent(props) {
		return (
			<HeaderTitle
				title={"Hello " + Name}
				titleStyle={{ color: "black" }}
				{...props}
			/>
		);
	}

	function HeaderBackgroundComponent(props) {
		return <View style={{ height: 300, backgroundColor: "#f5f5f5" }} />;
	}

	function BorderComponent(props) {
		return <Border backgroundColor={"lightgrey"} height={1} />;
	}

	function HeaderBorderComponent(props) {
		return <Border backgroundColor={"lightgrey"} height={1} />;
	}

	return (
		<View style={{ height: "100%", width: "100%", margin: "auto" }}>
			<Container
				headerHeight={300}
				HeaderForegroundComponent={HeaderForegroundComponent}
				HeaderBackgroundComponent={HeaderBackgroundComponent}
				HeaderNavigationBarComponent={HeaderNavigationBarComponent}
				NavigationBarComponent={NavigationBarComponent}
				contentContainerStyle={{ backgroundColor: "white" }}
				borderHeight={1}
				BorderComponent={BorderComponent}
				HeaderBorderComponent={HeaderBorderComponent}
			>
				<Placeholder />
				<Placeholder />
				<Placeholder />
				<Placeholder />
			</Container>
		</View>
	);
}

const styles = StyleSheet.create({});
