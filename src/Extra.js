const AppStack = createStackNavigator();

const AppNavigator = (props) => {
	return (
		<AppStack.Navigator initialRouteName="Home">
			<AppStack.Screen name="Home">
				{(screenProps) => (
					<Home {...screenProps} updateAuthState={props.updateAuthState} />
				)}
			</AppStack.Screen>

			<AppStack.Screen name="Settings">
				{(screenProps) => <Settings {...screenProps} />}
			</AppStack.Screen>
		</AppStack.Navigator>
	);
};
