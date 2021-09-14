import * as React from "react";
import { Image, StyleSheet } from "react-native";
import { Banner } from "react-native-paper";
import { fontSize } from "styled-system";

const BannerH = ({ BannerMessage }) => {
	const [visible, setVisible] = React.useState(true);

	return (
		<Banner
			visible={visible}
			actions={[
				{
					label: "Got It",
					onPress: () => setVisible(false),
				},
			]}
			style={{
				backgroundColor: "#9dcee2",
			}}
		>
			{BannerMessage}
		</Banner>
	);
};

const styles = StyleSheet.create({});

export default BannerH;
