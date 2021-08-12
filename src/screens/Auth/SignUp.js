import React, { useState } from "react";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import {
	View,
	Image,
	StyleSheet,
	ImageBackground,
	FlatList,
	Dimensions,
} from "react-native";
import { MaskedTextInput } from "react-native-mask-text";
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
import { height } from "styled-system";

export default function SignUp({ navigation }) {
	const [name, setName] = useState("");
	const [phone_number, setPhone_number] = useState("");
	const [birthdate, setBirthdate] = useState("");
	const [username, setUsername] = useState("");

	const [password, setPassword] = useState("");

	const [email, setEmail] = useState("");

	async function signUp() {
		try {
			await Auth.signUp({
				username,
				password,
				attributes: { email, name, birthdate, phone_number },
			});

			console.log(" Sign-up Confirmed");

			navigation.navigate("ConfirmSignUp");
		} catch (error) {
			console.log(" Error signing up...", error);
		}
	}

	return (
		<NativeBaseProvider>
			<ImageBackground
				source={require("../../../assets/yellowpill2.jpg")}
				style={styles.background}
			>
				<Box
					flex={1}
					p={2}
					w="90%"
					marginTop={"20%"}
					mx="auto"
					justifyContent="flex-start"
				>
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
								mode="flat"
								style={styles.formInput}
								type="name"
								placeholder="Name"
								value={name}
								onChangeText={(text) => setName(text)}
							/>
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
								type="number"
								keyboardType={"phone-pad"}
								value={phone_number}
								render={(props) => (
									<MaskedTextInput
										mask="+19999999999"
										onChangeText={(text) => {
											setPhone_number(text);
										}}
										style={styles.maskinput}
										keyboardType="numeric"
										placeholder="Phone Number"
										placeholderTextColor="black"
									/>
								)}
							/>
							<FormControl.Label
								_text={{ color: "muted.700", fontSize: "sm", fontWeight: 600 }}
							></FormControl.Label>
							<TextInput
								theme={{
									colors: {
										placeholder: "#C2C4C4",
										text: "black",
										primary: "black",
										underlineColor: "none",
									},
								}}
								style={styles.formInput}
								type="birthdate"
								variant="rounded"
								value={birthdate}
								render={(props) => (
									<MaskedTextInput
										mask="99/99/9999"
										onChangeText={(text) => {
											setBirthdate(text);
										}}
										style={styles.maskinput}
										keyboardType="numeric"
										placeholder="Birthday"
										placeholderTextColor="black"
									/>
								)}
							/>
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
								type="username"
								variant="rounded"
								placeholder="Username"
								value={username}
								onChangeText={(text) => setUsername(text)}
							/>
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
								type="email"
								placeholder="Email"
								keyboardType="email-address"
								variant="rounded"
								value={email}
								onChangeText={(text) => setEmail(text)}
							/>
						</FormControl>

						<FormControl>
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
								variant="rounded"
								secureTextEntry={true}
								value={password}
								onChangeText={(text) => setPassword(text)}
							/>
						</FormControl>

						<VStack space={2} mt={5}>
							<Button
								styles={styles.loginbutton}
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
									onPress={() => navigation.navigate("SignIn")}
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
	maskinput: {
		height: 40,
		margin: 12,
		borderWidth: 0,
		fontSize: 16,
		backgroundColor: "white",
		opacity: 0.6,
		height: 30,
	},
	formInput: {
		backgroundColor: "white",
		opacity: 0.9,
		height: 50,
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
