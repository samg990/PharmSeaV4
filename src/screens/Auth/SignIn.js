import React, { useState } from "react";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { Animated, View, Image, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";
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
	IconButton,
	HStack,
	Divider,
} from "native-base";

import { Auth } from "aws-amplify";

export default function SignIn({ navigation, updateAuthState }) {
	const [username, setUsername] = useState("");

	const [password, setPassword] = useState("");

	async function signIn() {
		try {
			await Auth.signIn(username, password);

			console.log("Success");

			updateAuthState("loggedIn");

			Toast.show({
				type: "success",
				position: "bottom",
				text1: "Signed In!",
				text2: "This is some something 👋",
				visibilityTime: 3000,
				autoHide: true,
				topOffset: 30,
				bottomOffset: 40,
			});
		} catch (error) {
			console.log(" Error signing in...", error);
			Toast.show({
				type: "error",
				position: "bottom",
				text1: "Incorrect username or password",
				text2: "This is some something 👋",
				visibilityTime: 3000,
				autoHide: true,
				topOffset: 30,
				bottomOffset: 40,
			});
		}
	}

	return (
		<NativeBaseProvider>
			<Box
				flex={1}
				p={2}
				w="90%"
				marginTop={20}
				mx="auto"
				alignItem="center"
				justifyContent="center"
			>
				<Image
					style={styles.tinyLogo}
					source={require("../../../assets/logo.png")}
					alignSelf="center"
				/>

				<Heading size="lg" color="primary.500" alignSelf="center">
					PharmSea
				</Heading>
				<Heading color="muted.400" size="xs" alignSelf="center">
					Sign in to continue!
				</Heading>

				<VStack space={2} mt={5}>
					<FormControl>
						<FormControl.Label
							_text={{ color: "muted.700", fontSize: "sm", fontWeight: 600 }}
						>
							Username
						</FormControl.Label>
						<Input
							value={username}
							onChangeText={(text) => setUsername(text)}
						/>
					</FormControl>
					<FormControl mb={5}>
						<FormControl.Label
							_text={{ color: "muted.700", fontSize: "sm", fontWeight: 600 }}
						>
							Password
						</FormControl.Label>
						<Input
							type="password"
							value={password}
							onChangeText={(text) => setPassword(text)}
						/>
						<Link
							_text={{ fontSize: "xs", fontWeight: "700", color: "cyan.500" }}
							alignSelf="flex-end"
							mt={1}
						>
							Forget Password?
						</Link>
					</FormControl>
					<VStack space={2}>
						<Button
							onPress={signIn}
							colorScheme="cyan"
							_text={{ color: "white" }}
						>
							Login
						</Button>

						<HStack justifyContent="center" alignItem="center">
							<IconButton
								variant="unstyled"
								startIcon={
									<Icon
										as={<MaterialCommunityIcons name="facebook" />}
										color="muted.700"
										size="sm"
									/>
								}
							/>
							<IconButton
								variant="unstyled"
								startIcon={
									<Icon
										as={<MaterialCommunityIcons name="google" />}
										color="muted.700"
										size="sm"
									/>
								}
							/>
							<IconButton
								variant="unstyled"
								startIcon={
									<Icon
										as={<MaterialCommunityIcons name="github" />}
										color="muted.700"
										size="sm"
									/>
								}
							/>
						</HStack>
					</VStack>
					<HStack justifyContent="center">
						<Text fontSize="sm" color="muted.700" fontWeight={400}>
							I'm a new user.{" "}
						</Text>
						<Link
							_text={{ color: "cyan.500", bold: true, fontSize: "sm" }}
							onPress={() => navigation.navigate("SignUp")}
						>
							Sign Up
						</Link>
					</HStack>
				</VStack>
			</Box>
		</NativeBaseProvider>
	);
}

const styles = StyleSheet.create({
	tinyLogo: {
		width: 150,
		height: 150,
		paddingVertical: 20,
	},
});
