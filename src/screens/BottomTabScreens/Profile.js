import React, { useEffect, useState } from "react";
import {
	FlatList,
	Text,
	View,
	StyleSheet,
	StatusBar,
	TouchableOpacity,
	Image,
} from "react-native";
import {
	Searchbar,
	TextInput,
	Button,
	Modal,
	Portal,
	Provider,
	Divider,
	IconButton,
	Colors,
} from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import { Auth, API, graphqlOperation} from 'aws-amplify';

const Item = ({ item, onPress, backgroundColor, textColor }) => (
	<TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
		<View>
			<Text style={[styles.title, textColor]}>
				Generic Name: {item.active_ingredients[0].name}
			</Text>

			<Text style={[styles.title, textColor]}>
				Brand Name: {item.brand_name}
			</Text>
			<Text style={[styles.title, textColor]}>
				Dose: {item.active_ingredients[0].strength}
			</Text>
			<Text style={[styles.title, textColor]}>
				Dosage Form: {item.dosage_form}
			</Text>
		</View>
		<Button
			color={"white"}
			style={styles.addbutton}
			onPress={() => handleSubmit()}
		>
			Add To MyMeds
		</Button>
	</TouchableOpacity>
);

const Item3 = ({ item, onPress, backgroundColor, textColor }) => (
	<TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
		<View>
			<Text style={[styles.title, textColor]}>
				Generic Name: {item.active_ingredients[0].name} +{" "}
				{item.active_ingredients[1].name}
			</Text>

			<Text style={[styles.title, textColor]}>
				Brand Name: {item.brand_name}
			</Text>
			<Text style={[styles.title, textColor]}>
				Dose: {item.active_ingredients[0].strength}{" "}
				{item.active_ingredients[1].strength}
			</Text>
			<Text style={[styles.title, textColor]}>
				Dosage Form: {item.dosage_form}
			</Text>
		</View>
		<Button
			color={"white"}
			style={styles.addbutton}
			onPress={() => handleSubmit()}
		>
			Add To MyMeds
		</Button>
	</TouchableOpacity>
);

const Item4 = ({ item, onPress, backgroundColor, textColor }) => (
	<TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
		<View>
			<Text style={[styles.title, textColor]}>
				Generic Name: {item.active_ingredients[0].name} +{" "}
				{item.active_ingredients[1].name} + {item.active_ingredients[2].name}
			</Text>

			<Text style={[styles.title, textColor]}>
				Brand Name: {item.brand_name}
			</Text>
			<Text style={[styles.title, textColor]}>
				Dose: {item.active_ingredients[0].strength}{" "}
				{item.active_ingredients[1].strength}{" "}
				{item.active_ingredients[2].strength}
			</Text>
			<Text style={[styles.title, textColor]}>
				Dosage Form: {item.dosage_form}
			</Text>
		</View>
		<Button
			color={"white"}
			style={styles.addbutton}
			onPress={() => handleSubmit()}
		>
			Add To MyMeds
		</Button>
	</TouchableOpacity>
);

const Item2 = ({ item }) => (
	<View style={[styles.item2]}>
		<Text style={[styles.title2]}> {item.indications_and_usage}</Text>
		<Divider />
		<Text style={[styles.title2]}>{item.dosage_and_administration}</Text>
	</View>
);

const Profile = () => {
	const [isLoading, setLoading] = useState(true);
	const [isMoreInfo, setMoreInfo] = useState(false);
	const [data, setData] = useState([]);
	const [datausage, setDatausage] = useState([]);
	const [input, setInput] = useState("");
	const [selectedId, setSelectedId] = useState(null);

	const handleSubmit = async () => {
		// Saving medication details
		try {
			const user = await Auth.currentAuthenticatedUser();
			const response = await API.graphql(
				graphqlOperation(createProduct, {
					input: {
						name: user.name,
						brandName: data.brand_name,
						genericName: data.active_ingredients[0].name,
						dose: active_ingredients[0].strength,
						userId: user.attributes.sub,
						userName: user.username,
					},
				}),
			);
			console.log("Response :\n");
			console.log(response);
		} catch (e) {
			console.log(e.message);
		}
	};

	const renderItem = ({ item }) => {
		const backgroundColor =
			item.product_id === selectedId ? "#E5E5E5" : "#FCA311";
		const color = item.product_id === selectedId ? "black" : "black";

		if (item.active_ingredients[1] == null) {
			return (
				<Item
					item={item}
					onPress={() => {
						setSelectedId(item.product_id);
					}}
					onLongPress={() => console.log("pressed")}
					backgroundColor={{ backgroundColor }}
					textColor={{ color }}
				/>
			);
		} else if (item.active_ingredients[2] == null) {
			return (
				<Item3
					item={item}
					onPress={() => {
						setSelectedId(item.product_id);
					}}
					onLongPress={() => console.log("pressed")}
					backgroundColor={{ backgroundColor }}
					textColor={{ color }}
				/>
			);
		} else {
			return (
				<Item4
					item={item}
					onPress={() => {
						setSelectedId(item.product_id);
					}}
					onLongPress={() => console.log("pressed")}
					backgroundColor={{ backgroundColor }}
					textColor={{ color }}
				/>
			);
		}
	};

	const renderItem2 = ({ item }) => {
		return <Item2 item={item} />;
	};

	async function loadMore() {
		if (input !== "") {
			await fetch(
				`https://api.fda.gov/drug/label.json?api_key=YGnrElT0aruhl4Qbc57LH05cJaQHsNm8lDgzITVz&search=indications_and_usage:${input}`,
			)
				.then((response) => response.json())
				.then((json) => setDatausage(json))
				.catch((error) => console.error(error))
				.finally(() => setMoreInfo(true));
		}
	}
	function LoadLess() {
		setMoreInfo(false);
	}

	console.log(data);
	console.log(datausage);

	async function fetchData(text) {
		await fetch(
			`https://api.fda.gov/drug/ndc.json?api_key=YGnrElT0aruhl4Qbc57LH05cJaQHsNm8lDgzITVz&search=brand_name:${text}&limit=30`,
		)
			.then((response) => response.json())
			.then((json) => setData(json))
			.catch((error) => console.error(error))

			.finally(() => setLoading(false));
	}

	return (
		<View style={{ flex: 1, padding: 20, marginTop: 30 }}>
			<Text
				style={{
					fontSize: 30,
					color: "black",
					textAlign: "center",
					marginBottom: 5,
				}}
			>
				Search Medications
			</Text>
			<TextInput
				ref={(input) => {
					textInput = input;
				}}
				style={styles.mText}
				theme={{ colors: { primary: "black", underlineColor: "transparent" } }}
				label="Brand Name Search"
				value={input}
				onChangeText={(text) => setInput(text)}
				returnKeyType="search"
				onSubmitEditing={() => fetchData(input)}
				right={
					<TextInput.Icon
						name="close-thick"
						onPress={() => {
							setInput("");
							setLoading(true);
							setMoreInfo(false);
						}}
					/>
				}
			/>

			{isLoading ? (
				<View
					style={{
						flex: 1,
						padding: 20,
						alignContent: "center",
						alignItems: "center",
						justifyContent: "center",
					}}
				>
					<Text style={{ fontSize: 20, fontStyle: "italic" }}>
						Start Your Search
					</Text>
					<Image
						style={styles.dopeimage}
						source={require("../../../assets/dopamine_load.png")}
					/>
				</View>
			) : (
				<View
					style={{
						flex: 1,
						flexDirection: "column",
						justifyContent: "space-between",
					}}
				>
					<Text
						style={{
							fontSize: 18,
							color: "teal",
							textAlign: "center",
							marginBottom: 0,
						}}
					>
						{input}
					</Text>

					{isMoreInfo ? (
						<View style={styles.container}>
							<FlatList
								data={datausage.results}
								keyExtractor={({ set_id }, index) => set_id}
								renderItem={renderItem2}
								extraData={selectedId}
							/>
							<Button onPress={LoadLess}>Done</Button>
						</View>
					) : (
						<View style={styles.container}>
							<Button onPress={loadMore}>More Info</Button>
							<FlatList
								data={data.results}
								keyExtractor={({ product_id }, index) => product_id}
								renderItem={renderItem}
								extraData={selectedId}
							/>
						</View>
					)}
				</View>
			)}
		</View>
	);
};

export default Profile;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginTop: StatusBar.currentHeight || 0,
	},
	item: {
		padding: 15,
		marginVertical: 5,
		marginHorizontal: 16,
		borderRadius: 20,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 15,
		},
		shadowOpacity: 0.9,
		shadowRadius: 20.0,

		elevation: 10,
	},
	item2: {
		padding: 10,
		marginVertical: 1,
		marginHorizontal: 1,
		borderRadius: 5,
	},
	title: {
		fontSize: 14,
	},
	title2: {
		fontSize: 15,
		marginBottom: 10,
	},
	mText: {
		backgroundColor: "#fff",
		borderColor: "#000",
		borderStyle: "solid",
		borderWidth: 1,
	},
	dopeimage: {
		width: 350,
		height: 200,
		resizeMode: "contain",
	},
});
