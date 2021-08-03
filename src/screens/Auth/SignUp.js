import React, { useState } from "react";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { View, Image, StyleSheet } from "react-native";
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

export default function SignUp({ navigation }) {
	const [username, setUsername] = useState("");

	const [password, setPassword] = useState("");

	const [email, setEmail] = useState("");

	async function signUp() {
		try {
			await Auth.signUp({ username, password, attributes: { email } });

			console.log(" Sign-up Confirmed");

			navigation.navigate("ConfirmSignUp");
		} catch (error) {
			console.log(" Error signing up...", error);
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
				justifyContent="center"
			>
				<Image
					style={styles.tinyLogo}
					source={require("../../../assets/logo.png")}
					alignSelf="center"
				/>

				<Heading size="lg" color="primary.500" alignSelf="center">
					Sign Up
				</Heading>
				<Heading color="muted.400" size="xs" alignSelf="center">
					Sign up to continue!
				</Heading>

				<VStack space={2} mt={5}>
					<FormControl>
						<FormControl.Label
							_text={{ color: "muted.700", fontSize: "sm", fontWeight: 600 }}
						>
							Email
						</FormControl.Label>
						<Input
							type="username"
							value={username}
							onChangeText={(text) => setUsername(text)}
						/>
					</FormControl>
					<FormControl>
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
					</FormControl>
					<FormControl>
						<FormControl.Label
							_text={{ color: "muted.700", fontSize: "sm", fontWeight: 600 }}
						>
							Confirm Password
						</FormControl.Label>
						<Input type="password" />
					</FormControl>
					<VStack space={2} mt={5}>
						<Button
							onPress={signUp}
							colorScheme="cyan"
							_text={{ color: "white" }}
						>
							Sign Up
						</Button>

						<HStack justifyContent="center">
							<Text fontSize="sm" color="muted.700" fontWeight={400}>
								Already have an account?{" "}
							</Text>
							<Link
								_text={{ color: "cyan.500", bold: true, fontSize: "sm" }}
								onPress={() => navigation.navigate("SignIn2")}
							>
								Sign In
							</Link>
						</HStack>

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
