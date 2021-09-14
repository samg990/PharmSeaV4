import React from "react";
import {
	View,
	Text,
	FlatList,
	StyleSheet,
	RefreshControl,
	Image,
} from "react-native";
import { VStack, HStack, Stack } from "native-base";
import { AppleStyle } from "react-native-scrollable-navigation-bar";
import MedsCard from "./MedsCard";

const MedsList = ({ medsList, refreshing, onRefresh }) => {
	return (
		<View>
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
								medOwner={item.owner}
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
		fontSize: 10,
	},
	productText: {
		fontSize: 20,
		fontWeight: "bold",
		alignSelf: "center",
	},
	medsView: {
		padding: 10,
		margin: 10,
		display: "flex",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	medsList: {
		padding: 10,
		marginBottom: 10,
		marginTop: 10,
	},
});
export default MedsList;
