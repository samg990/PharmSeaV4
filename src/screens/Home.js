import React, { useEffect, useState } from "react";

import { View, StyleSheet } from "react-native";
import Toast from "react-native-toast-message";

import { Auth } from "aws-amplify";

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
	Container,
} from "native-base";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

export default function Home() {
	const [Name, setName] = useState("");

	Auth.currentAuthenticatedUser({
		bypassCache: false, // Optional, By default is false. If set to true, this call will send a request to Cognito to get the latest user data
	})

		.then((user) => setName(user.attributes.name))

		.catch((err) => console.log(err));

	return (
		<NativeBaseProvider>
			<Box flex={1} p={2} w="90%" marginTop={10} mx="auto" alignItem="center">
				<Container>
					<Text italic>Welcome {Name}</Text>
				</Container>
				<VStack space={2} alignItems="center" width="100%">
					<Heading mt={3}>Truncated </Heading>
					<Text isTruncated w="80%">
						Lorem ipsum is placeholder text commonly used in the graphic, print,
						and publishing industries for previewing layouts and visual mockups.
					</Text>
					<Heading mt={3}>With Two lines </Heading>
					<Text noOfLines={2}>
						"The quick brown fox jumps over the lazy dog" is an English-language
						pangram—a sentence that contains all of the letters of the English
						alphabet. Owing to its existence, Chakra was created.
					</Text>
					<Button
						onPress={() =>
							Toast.show({
								type: "success2",
								position: "bottom",
								text1: "Success",
								text2: "This is some something 👋",
								visibilityTime: 3000,
								autoHide: true,
								topOffset: 30,
								bottomOffset: 40,
							})
						}
						backgroundColor="#219EBC"
					>
						Success
					</Button>
				</VStack>
			</Box>
		</NativeBaseProvider>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,

		alignItems: "center",

		marginTop: 20,
	},
});
