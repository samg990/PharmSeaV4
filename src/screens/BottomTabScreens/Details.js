import React, { Component } from "react";
import { View, StyleSheet } from "react-native";

import {
	VStack,
	Input,
	Button,
	IconButton,
	Icon,
	Text,
	NativeBaseProvider,
	Center,
	Box,
	FlatList,
} from "native-base";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";

const apiKey = "YGnrElT0aruhl4Qbc57LH05cJaQHsNm8lDgzITVz";

const apiUrl =
	"https://api.fda.gov/drug/event.json?api_key=" + { apiKey } + "&search=";

	const apiurl= `https://api.fda.gov/drug/label.json?api_key=YGnrElT0aruhl4Qbc57LH05cJaQHsNm8lDgzITVz&search=${text}`




	fetchData(text) {
		this.setState({ text });
		const apikey = '&apikey=thewdb';
		const url = 'http://www.omdbapi.com/?s=';
		fetch(url + text + url)
		  .then(response => response.json())
		  .then((responseJson) => {
			this.setState({
			  dataSource: responseJson.Search,
			});
		  })
		  .catch((error) => {
			console.log(error);
		  });
	  }	

function SearchBar() {
	return (
		<VStack space={8} width="100%">
			<VStack width="100%" space={2}>
				<Box>Search Medication</Box>
				<Input
					placeholder="Search Medication"
					bg="#fff"
					width="100%"
					borderRadius={4}
					py={3}
					px={1}
					fontSize={14}
					_web={{
						_focus: { borderColor: "muted.300", style: { boxShadow: "none" } },
					}}
					InputLeftElement={
						<Icon
							size="sm"
							m={2}
							size={6}
							color="gray.400"
							as={<MaterialIcons name="search" />}
						/>
					}
				/>
			</VStack>
		</VStack>
	);
}

const Details = () => {
	return (
		<NativeBaseProvider>
			<Box flex={1} px={2} paddingTop={70}>
				<SearchBar />
			</Box>
		</NativeBaseProvider>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "white",
	},
	contentContainer: {
		marginTop: 50,
		alignItems: "center",
		paddingHorizontal: 20,
	},
	title: {
		fontSize: 20,
		color: "black",
	},
});

export default Details;
