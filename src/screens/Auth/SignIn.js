import React, { useState } from "react";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import {
	Animated,
	View,
	Image,
	StyleSheet,
	ImageBackground,
	Dimensions,
} from "react-native";
import Toast from "react-native-toast-message";
import { TextInput, HelperText } from "react-native-paper";
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

	const onChangeText = (text) => setUsername(text);

	async function signIn() {
		try {
			await Auth.signIn(username, password);

			console.log("Success");
			console.log(username);

			updateAuthState("loggedIn");

			Toast.show({
				type: "success2",
				position: "top",
				text1: "Signed In as:",
				text2: username,
				visibilityTime: 3000,
				autoHide: true,
				topOffset: 30,
				bottomOffset: 40,
			});
		} catch (error) {
			console.log(" Error signing in...", error);
			Toast.show({
				type: "error",
				position: "top",
				text1: "Incorrect username or password",
				text2: "This is some something 👋",
				visibilityTime: 3000,
				autoHide: true,
				topOffset: 30,
				bottomOffset: 40,
			});
		}
	}

	const hasErrors = () => {
		return !username.includes("@");
	};

	return (
		<NativeBaseProvider>
			<ImageBackground
				source={require("../../../assets/yellowpill1.jpg")}
				style={styles.background}
			>
				<Box
					flex={1}
					p={3}
					w="90%"
					mx="auto"
					marginTop={"20%"}
					alignItem="center"
					justifyContent="flex-start"
				>
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
							></FormControl.Label>
							<View>
								<TextInput
									theme={{
										colors: {
											placeholder: "#6A6A6A",
											text: "black",
											primary: "black",
											underlineColor: "none",
										},
									}}
									style={styles.formInput}
									value={username}
									keyboardType="email-address"
									placeholder="Email"
									onChangeText={onChangeText}
								/>
							</View>
						</FormControl>
						<FormControl mb={5}>
							<FormControl.Label
								_text={{ color: "muted.700", fontSize: "sm", fontWeight: 600 }}
							></FormControl.Label>
							<TextInput
								theme={{
									colors: {
										placeholder: "#6A6A6A",
										text: "black",
										primary: "black",
										underlineColor: "none",
									},
								}}
								style={styles.formInput}
								type="password"
								placeholder="Password"
								secureTextEntry={true}
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
								styles={styles.loginbutton}
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
			</ImageBackground>
		</NativeBaseProvider>
	);
}

const styles = StyleSheet.create({
	tinyLogo: {
		width: 150,
		height: 150,
		paddingVertical: 20,
	},

	formBox: {
		backgroundColor: "#caf0f8",
		borderRadius: 30,
		alignItems: "center",
		alignContent: "center",
	},
	formInput: {
		backgroundColor: "white",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 12,
		},
		shadowOpacity: 0.58,
		shadowRadius: 16.0,

		elevation: 24,
	},
	background: {
		position: "absolute",
		left: 0,
		top: 0,
		width: Dimensions.get("window").width,
		height: Dimensions.get("window").height,
	},
	loginbutton: {
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 12,
		},
		shadowOpacity: 0.58,
		shadowRadius: 16.0,

		elevation: 24,
	},
});
