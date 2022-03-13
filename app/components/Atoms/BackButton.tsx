import React, { memo, FC } from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

interface BackButtonInterface {
	goBack: () => void
}

const BackButton: FC<BackButtonInterface> = ({ goBack }) => (
	<TouchableOpacity onPress={goBack} style={styles.container}>
		<Image style={styles.image} source={require('images/arrow_back.png')} />
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 10 + getStatusBarHeight(),
		left: 10
	},
	image: {
		width: 24,
		height: 24
	}
});

export default memo(BackButton);
