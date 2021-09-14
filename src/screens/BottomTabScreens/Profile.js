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
	Modal,
	Portal,
	Provider,
	Divider,
	IconButton,
	Colors,
} from "react-native-paper";
import { Button, Popover, Center, NativeBaseProvider } from "native-base";
import Icon from "react-native-vector-icons/FontAwesome";
import Toast from "react-native-toast-message";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { createMedication } from "../../graphql/mutations";

import BannerH from "../../components/Banner";
import AppBarBase from "../../components/AppBar";
import * as Animatable from "react-native-animatable";
import PopMenu from "../../components/MenuPop";

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
		<Popover
			trigger={(triggerProps) => {
				return (
					<Button style={styles.AddMeds} size="xs" {...triggerProps}>
						Add To My Meds
					</Button>
				);
			}}
		>
			<Popover.Content accessibilityLabel="add to my meds" borderRadius={"xl"}>
				<Popover.Arrow />
				<Popover.CloseButton />
				<Popover.Header>Add to My Medications</Popover.Header>
				<Popover.Body>
					Are you sure you want to add this to 'My Medications'
				</Popover.Body>
				<Popover.Footer justifyContent="flex-end">
					<Button.Group>
						<Button size="sm" variant="ghost">
							Cancel
						</Button>
						<Button size="sm" onPress={onPress}>
							Yes
						</Button>
					</Button.Group>
				</Popover.Footer>
			</Popover.Content>
		</Popover>
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
		<Popover
			trigger={(triggerProps) => {
				return (
					<Button style={styles.AddMeds} size="xs" {...triggerProps}>
						Add To My Meds
					</Button>
				);
			}}
		>
			<Popover.Content accessibilityLabel="add to my meds" borderRadius={"xl"}>
				<Popover.Arrow />
				<Popover.CloseButton />
				<Popover.Header>Add to My Medications</Popover.Header>
				<Popover.Body>
					Are you sure you want to add this to 'My Medications'
				</Popover.Body>
				<Popover.Footer justifyContent="flex-end">
					<Button.Group>
						<Button size="sm" variant="ghost">
							Cancel
						</Button>
						<Button size="sm" onPress={onPress}>
							Yes
						</Button>
					</Button.Group>
				</Popover.Footer>
			</Popover.Content>
		</Popover>
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
		<Popover
			trigger={(triggerProps) => {
				return (
					<Button style={styles.AddMeds} size="xs" {...triggerProps}>
						Add To My Meds
					</Button>
				);
			}}
		>
			<Popover.Content accessibilityLabel="add to my meds" borderRadius={"xl"}>
				<Popover.Arrow />
				<Popover.CloseButton />
				<Popover.Header>Add to My Medications</Popover.Header>
				<Popover.Body>
					Are you sure you want to add this to 'My Medications'
				</Popover.Body>
				<Popover.Footer justifyContent="flex-end">
					<Button.Group>
						<Button size="sm" variant="ghost">
							Cancel
						</Button>
						<Button size="sm" onPress={onPress}>
							Yes
						</Button>
					</Button.Group>
				</Popover.Footer>
			</Popover.Content>
		</Popover>
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
	const [medsingle, setMedsingle] = useState([]);

	const renderItem = ({ item }) => {
		const checkGeneric = () => {
			if (item.active_ingredients[1] == null) {
				return item.active_ingredients[0].name;
			} else if (item.active_ingredients[2] == null) {
				return (
					item.active_ingredients[0].name +
					" / " +
					item.active_ingredients[1].name
				);
			} else {
				return (
					item.active_ingredients[0].name +
					" / " +
					item.active_ingredients[1].name +
					" / " +
					item.active_ingredients[2].name
				);
			}
		};

		const checkDose = () => {
			if (item.active_ingredients[1] == null) {
				return item.active_ingredients[0].strength;
			} else if (item.active_ingredients[2] == null) {
				return (
					item.active_ingredients[0].strength +
					"  " +
					item.active_ingredients[1].strength
				);
			} else {
				return (
					item.active_ingredients[0].strength +
					"  " +
					item.active_ingredients[1].strength +
					"  " +
					item.active_ingredients[2].strength
				);
			}
		};

		const newMedication = async () => {
			// Saving medication details
			try {
				const user = await Auth.currentAuthenticatedUser();
				const response = await API.graphql(
					graphqlOperation(createMedication, {
						input: {
							name: user.attributes.name,
							brandName: item.brand_name,
							genericName: checkGeneric(),
							dose: checkDose(),
							userId: user.attributes.sub,
						},
					}),
				);
				console.log("submitted");
				console.log(response);
			} catch (e) {
				console.log(e.message);
			}
		};

		const backgroundColor =
			item.product_id === selectedId ? "#43aa8b" : "#c6def1";
		const color = item.product_id === selectedId ? "black" : "black";

		if (item.active_ingredients[1] == null) {
			return (
				<Item
					item={item}
					onPress={() => {
						setMedsingle(item);
						newMedication();

						Toast.show({
							type: "success3",
							position: "bottom",
							text1: "Successfully Added Medication",
							visibilityTime: 3000,
							autoHide: true,
							topOffset: 30,
							bottomOffset: 40,
						});
					}}
					backgroundColor={{ backgroundColor }}
					textColor={{ color }}
				/>
			);
		} else if (item.active_ingredients[2] == null) {
			return (
				<Item3
					item={item}
					onPress={() => {
						setMedsingle(item);
						newMedication();

						Toast.show({
							type: "success3",
							position: "bottom",
							text1: "Successfully Added Medication",
							visibilityTime: 3000,
							autoHide: true,
							topOffset: 30,
							bottomOffset: 40,
						});
					}}
					backgroundColor={{ backgroundColor }}
					textColor={{ color }}
				/>
			);
		} else {
			return (
				<Item4
					item={item}
					onPress={() => {
						setMedsingle(item);
						newMedication();

						Toast.show({
							type: "success3",
							position: "bottom",
							text1: "Successfully Added Medication",
							visibilityTime: 3000,
							autoHide: true,
							topOffset: 30,
							bottomOffset: 40,
						});
					}}
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
		<View style={{ flex: 1 }}>
			<AppBarBase Title={"Medication Search"} />
			<BannerH
				BannerMessage={
					"-Please Search Medications by BRAND Names\n-Click on Specific Dose to add to My Medications\n-To Read More on the Medication Click More Info"
				}
			/>

			<TextInput
				ref={(input) => {
					textInput = input;
				}}
				style={styles.mText}
				theme={{ colors: { primary: "black", underlineColor: "transparent" } }}
				label="Brand Name"
				value={input}
				onChangeText={(text) => {
					if (text === "Tylenol") {
						setInput("Acetaminophen");
					} else {
						setInput(text);
					}
				}}
				returnKeyType="search"
				onSubmitEditing={() => {
					fetchData(input);
				}}
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
						marginTop: 300,
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
						source={require("../../../assets/Carbamazepine.svg.png")}
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
					{isMoreInfo ? (
						<Animatable.View animation="fadeIn" style={styles.container}>
							<FlatList
								data={datausage.results}
								keyExtractor={({ set_id }, index) => set_id}
								renderItem={renderItem2}
								extraData={selectedId}
							/>
							<Button onPress={LoadLess} color={"black"} colorScheme="teal">
								Done
							</Button>
						</Animatable.View>
					) : (
						<Animatable.View animation="pulse" style={styles.container}>
							<Button
								style={styles.MoreInfo}
								onPress={loadMore}
								size="md"
								colorScheme="teal"
							>
								More Info
							</Button>
							<FlatList
								data={data.results}
								keyExtractor={({ product_id }, index) => product_id}
								renderItem={renderItem}
								extraData={selectedId}
							/>
						</Animatable.View>
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
	AppHeader: {
		backgroundColor: "#669bbc",
	},
	MoreInfo: {
		marginTop: 0,
		marginBottom: 1,
		width: "50%",
		alignContent: "center",
		justifyContent: "center",
		alignSelf: "center",
	},
	AddMeds: {
		marginTop: 0,
		marginBottom: 1,
		width: "50%",
		alignContent: "center",
		justifyContent: "center",
		alignSelf: "center",
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
		marginTop: 0,
		marginBottom: 0,
		backgroundColor: "#fff",

		borderWidth: 1,
	},
	dopeimage: {
		width: 400,
		height: 300,
		resizeMode: "contain",
	},
});
