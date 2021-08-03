import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
	FlatList,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
} from "react-native";
import { Searchbar } from "react-native-paper";

const result = [
	{
		id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
		title: "First Item",
	},
	{
		id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
		title: "Second Item",
	},
	{
		id: "58694a0f-3da1-471f-bd96-145571e29d72",
		title: "Third Item",
	},
];

const Item = ({ item, onPress, backgroundColor, textColor }) => (
	<TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
		<Text style={[styles.title, textColor]}>{item.res.results[0].openfda.spl_id[0]}</Text>
		<Text style={[styles.title, textColor]}>{item.res}</Text>
		
		
	</TouchableOpacity>
);

export default function SearchMeds() {
	const [selectedId, setSelectedId] = useState(null);
	const [input, setInput] = useState("");
	const [results, setResults] = useState([]);
	const [searchTimer, setSearchTimer] = useState(null);

	
	
	async function fetchData(text) {
		const res = await fetch(
			`https://api.fda.gov/drug/label.json?api_key=YGnrElT0aruhl4Qbc57LH05cJaQHsNm8lDgzITVz&search=${text}`,
		);
		res
			.json()
			.then((res) => {
				
				console.log(res.results[0].openfda.spl_id[0]);
				setResults(res.results[0]);
				
			})
			.catch((err) => console.log(err));
	}

	const renderItem = ({ item }) => {
		const backgroundColor = item.results[0].openfda.spl_id[0] === selectedId ? "#6e3b6e" : "#f9c2ff";
		const color = item.results[0].openfda.spl_id[0] === selectedId ? "white" : "black";

		return (
			<Item
				item={item}
				onPress={() => setSelectedId(item.results[0].openfda.spl_id[0])}
				backgroundColor={{ backgroundColor }}
				textColor={{ color }}
			/>
		);
	};

	return (
		<SafeAreaView style={styles.container}>

		
			<Searchbar
				placeholder="Search"
				onChangeText={(text) => {
					if (searchTimer) {
						clearTimeout(searchTimer);
					}
					setInput(text);
					setSearchTimer(
						setTimeout(() => {
							fetchData(text);
							
						}, 1500),
					);
				}}
				value={input}
			/>

			<FlatList
				data={results}
				renderItem={renderItem}
				keyExtractor={(item) =>  item.results[0].openfda.spl_id[0].toString()}
				extraData={selectedId}
			/>

			<StatusBar style="auto" />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: StatusBar.currentHeight || 50,
	},
	item: {
		padding: 20,
		marginVertical: 8,
		marginHorizontal: 16,
	},
	title: {
		fontSize: 32,
	},
});
