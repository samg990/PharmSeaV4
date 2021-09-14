import React from "react";
import {
	VStack,
	HStack,
	Button,
	IconButton,
	Icon,
	Text,
	NativeBaseProvider,
	Center,
	Box,
	StatusBar,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";

function AppBarBase({ Title }) {
	const _goBack = () => console.log("Went back");

	const _handleSearch = () => console.log("Searching");

	const _handleMore = () => console.log("Shown more");
	return (
		<>
			<StatusBar backgroundColor="#1368aa" barStyle="light-content" />

			<Box safeAreaTop backgroundColor="#4091c9" />

			<HStack
				bg="#4091c9"
				px={1}
				py={3}
				justifyContent="space-between"
				alignItems="center"
			>
				<HStack space={4} alignItems="center">
					<IconButton
						icon={
							<Icon
								size="sm"
								as={<MaterialIcons name="arrow-back" />}
								color="white"
								onPress={_goBack}
							/>
						}
					/>
					<Text color="white" fontSize={20} fontWeight="bold">
						{Title}
					</Text>
				</HStack>
				<HStack space={2}>
					<IconButton
						icon={
							<Icon
								as={<MaterialIcons name="favorite" />}
								size="sm"
								color="white"
							/>
						}
					/>
					<IconButton
						icon={
							<Icon
								as={<MaterialIcons name="search" />}
								color="white"
								size="sm"
							/>
						}
					/>
					<IconButton
						icon={
							<Icon
								as={<MaterialIcons name="more-vert" />}
								size="sm"
								color="white"
							/>
						}
					/>
				</HStack>
			</HStack>
		</>
	);
}

export default AppBarBase;
