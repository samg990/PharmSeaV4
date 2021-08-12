import React from "react";
import {
	Fab,
	Icon,
	Box,
	FlatList,
	Center,
	NativeBaseProvider,
	Heading,
	StatusBar,
} from "native-base";
import { AntDesign } from "@expo/vector-icons";

export const FloatButton = () => {
	return (
		<Box position="relative" h={100} w="100%">
			<Fab
				position="absolute"
				size="sm"
				icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
			/>
		</Box>
	);
};

export const Example = () => {
	const data = [
		{
			id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
			title: "tylenol",
		},
		{
			id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
			title: "Second Item",
		},
		{
			id: "58694a0f-3da1-471f-bd96-145571e29d72",
			title: "Third Item",
		},
		{
			id: "58694a0f-3da1-471f-bd96-145571e29d72",
			title: "Third Item",
		},
		{
			id: "58694a0f-3da1-471f-bd96-145571e29d72",
			title: "Third Item",
		},
		{
			id: "58694a0f-3da1-471f-bd96-145571e29d72",
			title: "Third Item",
		},
		{
			id: "58694a0f-3da1-471f-bd96-145571e29d72",
			title: "Third Item",
		},
		{
			id: "58694a0f-3da1-471f-bd96-145571e29d72",
			title: "Third Item",
		},
		{
			id: "58694a0f-3da1-471f-bd96-145571e29d72",
			title: "Third Item",
		},
		{
			id: "58694a0f-3da1-471f-bd96-145571e29d72",
			title: "Third Item",
		},
	];
	return (
		<FlatList
			data={data}
			renderItem={({ item }) => (
				<Box px={140} py={5} rounded="md" my={2} bg="rgb(108, 117, 125)">
					{item.title}
					<Fab
						position="absolute"
						size="sm"
						icon={
							<Icon color="white" as={<AntDesign name="plus" />} size="lg" />
						}
					/>
				</Box>
			)}
			keyExtractor={(item) => item.id}
		/>
	);
};

export default () => {
	return (
		<NativeBaseProvider>
			<Center flex={1} marginTop={20}>
				<Heading
					alignSelf={{
						base: "center",
						md: "flex-start",
					}}
					marginBottom={10}
				>
					My Medications
				</Heading>
				<Example />
			</Center>
		</NativeBaseProvider>
	);
};
