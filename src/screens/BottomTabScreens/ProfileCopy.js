import React, { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { Searchbar, TextInput, Button } from "react-native-paper";

return (
	<>
		<SafeAreaView>
			{medsList && (
				<MedsList
					medsList={medsList}
					refreshing={refreshing}
					onRefresh={onRefresh}
				/>
			)}
		</SafeAreaView>
	</>
);

return (
	<Card containerStyle={styles.cardContainer}>
		<Card.Title style={styles.cardTitle}>{medBrand}</Card.Title>
		<Card.Divider />

		<Text style={styles.medDose}>Generic Name:</Text>
		<Text style={styles.medDoseinner}>{medGeneric}</Text>

		<Text style={styles.medDose}>Dose:</Text>
		<Text style={styles.medDoseinner}>{medDose}</Text>
		<View style={styles.ownerTitle}>
			<Icon name="person-pin" />
		</View>
	</Card>
	
);

const Profile = () => {
	const [isLoading, setLoading] = useState(true);
	const [data, setData] = useState([]);
	const [input, setInput] = useState("");
	const [searchTimer, setSearchTimer] = useState(null);
	console.log(data);


	input: {
		name: user.name,
		brandName: medsingle.brand_name,
		genericName: medsingle.generic_name,
		dose: medsingle.active_ingredients[0].strength,
		userId: user.attributes.sub,
	},

	async function fetchData(text) {
		await fetch(
			`https://api.fda.gov/drug/label.json?api_key=YGnrElT0aruhl4Qbc57LH05cJaQHsNm8lDgzITVz&search=${text}`,
		)
			.then((response) => response.json())
			.then((json) => setData(json))
			.catch((error) => console.error(error))
			.finally(() => setLoading(false));
	}

	return (
		<View style={{ flex: 1, padding: 20, marginTop: 30 }}>
			<TextInput
				label="Search"
				value={input}
				onChangeText={(text) => setInput(text)}
				right={
					<TextInput.Icon
						name="magnify"
						onPress={() => {
							fetchData(input);
						}}
					/>
				}
			/>

			{isLoading ? (
				<Text>Loading...</Text>
			) : (
				<View
					style={{
						flex: 1,
						flexDirection: "column",
						justifyContent: "space-between",
					}}
				>
					<Text style={{ fontSize: 18, color: "teal", textAlign: "center" }}>
						{input}
					</Text>

					<FlatList
						data={data.results}
						keyExtractor={({ id }, index) => id}
						renderItem={({ item }) => (
							<View>
								<Text>
									{item.indications_and_usage +
										"                 " +
										item.dosage_and_administration}
								</Text>
							</View>
						)}
					/>
				</View>
			)}
		</View>
	);
};

export default Profile;
