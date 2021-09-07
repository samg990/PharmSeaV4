import React, { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { SafeAreaView, StatusBar, TouchableOpacity } from "react-native";

import { listProducts } from "../../graphql/queries";
import MedsList from "../../components/MedsList";
const HomeScreen = (props) => {
	const [medsList, setMeds] = useState([]);
	const [refreshing, setRefreshing] = useState(false);

	const fetchMedications = async () => {
		try {
			const meds = await API.graphql({ query: listMedications });
			if (Medications.data.listMedications) {
				console.log("Medication: \n");
				console.log(MedicationLists);
				setProducts(medications.data.listMedications.items);
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
			<StatusBar barStyle="dark-content" />
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
};

export default HomeScreen;
