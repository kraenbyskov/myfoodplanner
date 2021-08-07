import React, { FC } from "react";
import {
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  Text,
} from "react-native";
import { theme } from "../../core/theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect, bindActionCreators } from "../../redux/actions";
import CustomImage from "./CustomImage";

interface RecipeCardInterface {
  navigation: any;
  data: { downloadUrl?: string; Name?: string; empty?: boolean; day: string };
  children?: any;
  setVisible?: (boolean: boolean) => void;
  setToDay?: any;
}

const FeedCard: FC<RecipeCardInterface> = ({
  navigation,
  data,
  children,
  setVisible,
  setToDay,
}) => {
  const getAllRecipesPopUp = () => {
    setVisible(true);
    setToDay(data.day);
  };

  return (
    <View style={styles.Container}>
      <TouchableHighlight
        style={styles.Card}
        underlayColor={theme.colors.primary}
        onPress={() => navigation.navigate("RecipeDetails", data)}
      >
        <View style={styles.Content}>
          <CustomImage style={styles.RecipeImage} url={data.downloadUrl} />
        </View>
      </TouchableHighlight>
    </View>
  );
};

const mapStateToProps = (store) => ({
  AllRecipes: store.recepiesState.AllRecipes,
});

export default connect(mapStateToProps, null)(FeedCard);

const styles = StyleSheet.create({
  Container: {
    width: "33%",
    height: 128,
    padding: 4,
  },
  Card: {
    height: 120,
    backgroundColor: "white",
    borderRadius: 5,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.06,
    shadowRadius: 3.68,
  },

  RecipeImage: {
    width: "100%",
    height: 120,
    borderRadius: 5,
  },
  Content: {},

  Title: {
    top: 5,
    marginLeft: 5,
    fontSize: 12,
  },
  Icons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    // backgroundColor: 'orange'
  },
});