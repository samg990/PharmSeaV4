import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import {
	VStack,
	HStack,
	Avatar,
	Image,
	Text,
	NativeBaseProvider,
	AspectRatio,
	Center,
	Box,
	Stack,
	Heading,
	IconButton,
	Icon,
} from "native-base";
import { Storage } from "aws-amplify";

const MedsCard = ({ medName, medBrand, medGeneric, medDose, medOwner }) => {
	return (
		<Box bg="white" shadow={2} rounded="lg" maxWidth="100%">
			<Image
				source={{
					uri: "https://sample-example.nativebase.io/static/media/dawki-river.ebbf5434.png",
				}}
				alt="image base"
				resizeMode="cover"
				height={150}
				roundedTop="md"
			/>
			<Text bold position="absolute" color="white" top={0} m={[4, 4, 8]}></Text>
			<Stack space={2} p={[4, 4, 8]}>
				<Text color="gray.400">Medication</Text>
				<Heading size={["md", "lg", "md"]} noOfLines={2}>
					{medBrand}
				</Heading>
				<Text
					lineHeight={[5, 5, 7]}
					noOfLines={[4, 4, 2]}
					color="gray.700"
					fontStyle="italic"
					fontWeight="bold"
				>
					Generic Name:
				</Text>
				<Text lineHeight={[5, 5, 7]} noOfLines={[4, 4, 2]} color="gray.700">
					{medGeneric}
				</Text>
				<Text
					lineHeight={[5, 5, 7]}
					noOfLines={[4, 4, 2]}
					color="gray.700"
					fontStyle="italic"
					fontWeight="bold"
				>
					Dose:
				</Text>
				<Text lineHeight={[5, 5, 7]} noOfLines={[4, 4, 2]} color="gray.700">
					{medDose}
				</Text>
				<HStack>
					<IconButton
						variant="unstyled"
						startIcon={
							<Icon
								as={<MaterialCommunityIcons name="camera-plus" />}
								color="muted.700"
								size="sm"
							/>
						}
					/>
					<IconButton
						variant="unstyled"
						startIcon={
							<Icon
								as={<MaterialCommunityIcons name="camera-plus" />}
								color="muted.700"
								size="sm"
							/>
						}
					/>
				</HStack>
			</Stack>
		</Box>
	);
};
const styles = StyleSheet.create({
	cardContainer: {
		marginBottom: 8,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 6,
	},

	medDose: {
		marginTop: 5,
		marginBottom: 5,
		fontSize: 15,
		fontWeight: "bold",
	},
	medDoseinner: {
		fontSize: 14,
	},
	altView: {
		width: 200,
		height: 200,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
	},
	cardTitle: {
		fontSize: 20,
	},
	medOwner: {
		fontSize: 16,
		fontWeight: "bold",
		alignSelf: "center",
	},
});
export default MedsCard;
