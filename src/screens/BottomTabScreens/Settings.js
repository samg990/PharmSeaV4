import React, { useState, useEffect } from "react";
import { View } from "react-native";
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
	AlertDialog,
	Center,
} from "native-base";

import { Auth } from "aws-amplify";

export default function Settings({ updateAuthState }) {
	const [isOpen, setIsOpen] = React.useState(false);
	const onClose = () => setIsOpen(false);
	const cancelRef = React.useRef();

	async function signOut() {
		try {
			await Auth.signOut();
			updateAuthState("loggedOut");
			console.log("Signed Out");
			Toast.show({
				type: "success",
				position: "bottom",
				text1: "Signed Out",
				text2: "This is some something 👋",
				visibilityTime: 3000,
				autoHide: true,
				topOffset: 30,
				bottomOffset: 40,
			});
		} catch (error) {
			console.log("Error signing out: ", error);
		}
	}

	return (
		<NativeBaseProvider>
			<Box flex={1} p={2} w="90%" marginTop={20} mx="auto">
				<Center>
					<AlertDialog
						leastDestructiveRef={cancelRef}
						isOpen={isOpen}
						onClose={onClose}
						motionPreset={"fade"}
						signOut={signOut}
					>
						<AlertDialog.Content>
							<AlertDialog.Header fontSize="lg" fontWeight="bold">
								Sign Out
							</AlertDialog.Header>
							<AlertDialog.Body>
								Are you sure you want to sign out?
							</AlertDialog.Body>
							<AlertDialog.Footer>
								<Button ref={cancelRef} onPress={onClose}>
									Cancel
								</Button>
								<Button
									onPress={() => {
										onClose().then(signOut());
									}}
									colorScheme="red"
									ml={3}
								>
									Yes
								</Button>
							</AlertDialog.Footer>
						</AlertDialog.Content>
					</AlertDialog>
					<Button colorScheme="danger" onPress={() => setIsOpen(!isOpen)}>
						Sign Out
					</Button>
				</Center>
				<Button onPress={signOut} colorScheme="red" ml={3}>
					Yes
				</Button>
			</Box>
		</NativeBaseProvider>
	);
}
