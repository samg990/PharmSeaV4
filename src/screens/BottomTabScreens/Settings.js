import React, { useState, useEffect } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { Popover, Button, Center, Box, NativeBaseProvider } from "native-base";

import { Auth } from "aws-amplify";

export default function Settings({ updateAuthState }) {
	async function signOut() {
		try {
			await Auth.signOut();
			console.log("Signed Out Pressed");
			updateAuthState("loggedOut");
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
				<Popover
					trigger={(triggerProps) => {
						return (
							<Button
								{...triggerProps}
								colorScheme="danger"
								_text={{
									color: "white",
								}}
							>
								Sign Out
							</Button>
						);
					}}
				>
					<Popover.Content accessibilityLabel="hello world" borderRadius={"xl"}>
						<Popover.Arrow />
						<Popover.CloseButton />
						<Popover.Header>Confirmation</Popover.Header>
						<Popover.Body>Are you sure you want to Sign Out?</Popover.Body>
						<Popover.Footer justifyContent="flex-end">
							<Button.Group>
								<Button size="sm" variant="ghost" colorScheme="teal">
									Cancel
								</Button>
								<Button
									size="sm"
									onPress={signOut}
									colorScheme="danger"
									_text={{
										color: "white",
									}}
								>
									Yes
								</Button>
							</Button.Group>
						</Popover.Footer>
					</Popover.Content>
				</Popover>
			</Box>
		</NativeBaseProvider>
	);
}
