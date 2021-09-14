import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import {
	SafeAreaView,
	View,
	TouchableOpacity,
	Image,
	StatusBar,
	StyleSheet,
	RefreshControl,
} from "react-native";
import { IconButton, Icon, Center, NativeBaseProvider } from "native-base";
import { AntDesign } from "@expo/vector-icons";

import { listMedications } from "../../graphql/queries";
import MedsList from "../../components/MedsList";
import { Appbar } from "react-native-paper";
import AppBarBase from "../../components/AppBar";

const wait = (timeout) => {
	return new Promise((resolve) => setTimeout(resolve, timeout));
};

const HomeScreen = (props) => {
	const [medsList, setMeds] = useState([]);
	const [refreshing, setRefreshing] = useState(false);

	const fetchMedications = async () => {
		try {
			const meds = await API.graphql({ query: listMedications });
			if (meds.data.listMedications) {
				console.log("Medication: \n");
				console.log(meds);
				setMeds(meds.data.listMedications.items);
			}
		} catch (e) {
			console.log(e.message);
		}
	};
	useEffect(() => {
		fetchMedications();
	}, []);

	const onRefresh = async () => {
		setRefreshing(true);
		await fetchMedications();
		setRefreshing(false);
	};

	return (
		<>
			<SafeAreaView>
				<AppBarBase Title={"My Medications"} />

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
};

const styles = StyleSheet.create({
	AppHeader: {
		backgroundColor: "#669bbc",
	},
});

export default HomeScreen;
