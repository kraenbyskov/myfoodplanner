import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import firebase from "firebase";

import { Provider } from "react-redux";
import LandingScreen from "./components/auth/Landing";
import RegisterScreen from "./components/auth/Register";
import LoginScreen from "./components/auth/Login";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/reducers";
import thunk from "redux-thunk";
import MainScreen from "./components/Main";

import AddScreen from "./components/AddImage";
import AddToListScreen from "./components/main/AddToList";

const Stack = createStackNavigator();
const store = createStore(rootReducer, applyMiddleware(thunk));

const firebaseConfig = {
  apiKey: "AIzaSyD3LazlxdCrVt3qIuc7qxa7j0MTFvo-mjM",
  authDomain: "myfoodplanner-7f63b.firebaseapp.com",
  projectId: "myfoodplanner-7f63b",
  storageBucket: "myfoodplanner-7f63b.appspot.com",
  messagingSenderId: "986565033593",
  appId: "1:986565033593:web:215e0d9c0cae0a5e0d5ea8",
};

if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

export default function App() {
  const [LoggedIn, setLoggedIn] = React.useState(false);
  const [Loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        setLoaded(true);
        setLoggedIn(false);
      } else {
        setLoaded(true);
        setLoggedIn(true);
      }
    });
  }, []);

  if (!Loaded) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Text>Loading</Text>
      </View>
    );
  }

  if (!LoggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Lading">
          <Stack.Screen
            name="Landing"
            component={LandingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Main">
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Add"
            component={AddScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="AddToList"
            component={AddToListScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
