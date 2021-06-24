import React from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import { MainContainer, RecipeCard, AppBar } from '../../components';
import { connect } from 'react-redux';
import firebase from 'firebase';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { IconButton } from 'react-native-paper';
import { addToCustomList } from '../../functions';
import { SafeAreaView } from 'react-native';
import { theme } from '../../core/theme';

const Dashboard = ({ currentUser, navigation }) => {
	const [ GetData, setGetData ]: any = React.useState(null);
	const query = firebase
		.firestore()
		.collection('Allrecipes')
		.where('Owner', '==', firebase.auth().currentUser.uid)
		.limit(3);
	const [ Food ]: any = useCollectionData(query);
	React.useEffect(
		() => {
			setGetData(Food);
		},
		[ Food ]
	);
	return (
		<SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
			<View style={styles.TopDashboard}>
				<AppBar mainColor="white" />
				<Text
					style={{
						fontSize: 30,
						fontFamily: 'Lato_900Black',
						color: 'white',
						padding: 30
					}}
				>
					Velkommen {currentUser && currentUser.name}
				</Text>
			</View>
			<ScrollView
				style={{
					borderTopLeftRadius: 30,
					borderTopRightRadius: 30,
					top: -100,
					backgroundColor: 'white',
					padding: 20
				}}
			>
				<Text
					style={{
						marginBottom: 10,
						fontSize: 20,
						fontFamily: 'Lato_400Regular'
					}}
				>
					Nye Opskrifter
				</Text>
				{GetData &&
					GetData.map((data, index) => (
						<RecipeCard key={index} navigation={navigation} data={data}>
							<IconButton
								color={'#000000'}
								size={25}
								icon="folder"
								onPress={() => addToCustomList(data)}
							/>
						</RecipeCard>
					))}
			</ScrollView>
		</SafeAreaView>
	);
};

const mapStateToProps = (store) => ({
	currentUser: store.userState.currentUser
});
export default connect(mapStateToProps, null)(Dashboard);

const styles = StyleSheet.create({
	TopDashboard: {
		top: -50,
		backgroundColor: theme.colors.primary,
		height: 300,
		paddingTop: 50
	},
	container: {
		flex: 1,
		padding: 20,
		width: '100%',
		// maxWidth: 340,
		alignSelf: 'center'
	},
	NonScroll: {
		alignItems: 'center',
		justifyContent: 'center'
	}
});