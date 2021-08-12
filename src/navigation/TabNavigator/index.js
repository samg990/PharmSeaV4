import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

import Home from "../../screens/Home";
import SearchMeds from "../../screens/BottomTabScreens/SearchMeds";
import Profile from "../../screens/BottomTabScreens/Profile";
import Settings from "../../screens/BottomTabScreens/Settings";
import CustomTabBar from "./CustomTabBar";

const Tab = createBottomTabNavigator();

const screenOptions = (route, color) => {
	let iconName;

	switch (route.name) {
		case "Home":
			iconName = "home";
			break;
		case "SearchMeds":
			iconName = "medkit";
			break;
		case "Profile":
			iconName = "search";
			break;
		case "Settings":
			iconName = "settings";
			break;
		default:
			break;
	}
	return <Icon name={iconName} color={color} size={24} />;
};

const TabNavigator = ({ updateAuthState }) => {
	return (
		<Tab.Navigator
			tabBar={(props) => <CustomTabBar {...props} />}
			screenOptions={({ route }) => ({
				tabBarIcon: ({ color }) => screenOptions(route, color),
			})}
			tabBarOptions={{
				activeTintColor: "black",
				inactiveTintColor: "#d9d9d9",
				style: {
					borderTopColor: "#FB8500",
					borderTopWidth: 2,
					backgroundColor: "white",
					elevation: 0,
				},
			}}
		>
			<Tab.Screen name="Home" component={Home} />
			<Tab.Screen name="SearchMeds" component={SearchMeds} />
			<Tab.Screen name="Profile" component={Profile} />
			<Tab.Screen name="Settings">
				{(screenProps) => (
					<Settings {...screenProps} updateAuthState={updateAuthState} />
				)}
			</Tab.Screen>
		</Tab.Navigator>
	);
};

export default TabNavigator;
