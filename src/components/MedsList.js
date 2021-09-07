import React from "react";
import { View, Text, FlatList, StyleSheet, RefreshControl } from "react-native";

import MedsCard from "./MedsCard";

const MedsList = ({ medsList, refreshing, onRefresh }) => {
	return (
		<View style={styles.medsView}>
			{medsList && (
				<FlatList
					style={styles.medsList}
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
					keyExtractor={(item) => item.id}
					data={medsList}
					renderItem={({ item }) => {
						return (
							<MedsCard
								medName={item.name}
								medBrand={item.brandName}
								medGeneric={item.genericName}
								medDose={item.dose}
								medOwner={item.userName}
							/>
						);
					}}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	itemText: {
		fontSize: 15,
	},
	productText: {
		fontSize: 20,
		fontWeight: "bold",
		alignSelf: "center",
	},
	medsView: {
		padding: 0,
		margin: 0,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	medsList: {
		padding: 5,
		marginBottom: 20,
	},
});
export default MedsList;
