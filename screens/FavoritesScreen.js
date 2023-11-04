import { useDispatch, useSelector } from "react-redux";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert, 
} from "react-native";
import { SwipeRow } from "react-native-swipe-list-view";
import { toggleFavorite } from "../features/favorites/favoritesSlice";
import Loading from "../components/LoadingComponent";
import { ListItem, Avatar } from "react-native-elements";

// Set up the FavoritesScreen function component with destructured navigation prop
const FavoritesScreen = ({ navigation }) => {
  // Create constants using destructuring to get campsites, isLoading, and errMess from state
  const { campsitesArray, isLoading, errMess } = useSelector(
    (state) => state.campsites
  );
  const favorites = useSelector((state) => state.favorites);

  const dispatch = useDispatch();

  // Conditional rendering based on isLoading and errMess
  if (isLoading) {
    return <Loading />;
  }

  if (errMess) {
    return (
      <View>
        <Text>{errMess}</Text>
      </View>
    );
  }

  // Constant for rendering each favorite item
  const renderFavoriteItem = ({ item: campsite }) => {
    return (
      <SwipeRow rightOpenValue={-100}>
        <View style={styles.deleteView}>
          <TouchableOpacity
            style={styles.deleteTouchable}
            onPress={() =>
              Alert.alert(
                "Delete Favorite?",
                "Are you sure you wish to delete the favorite campsite " +
                  campsite.name +
                  "?",
                [
                  {
                    text: "Cancel",
                    onPress: () => console.log(campsite.name + " Not Deleted"),
                    style: "cancel",
                  },
                  {
                    text: "OK",
                    onPress: () => dispatch(toggleFavorite(campsite.id)),
                  },
                ],
                { cancelable: false }
              )
            }
          >
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
      </SwipeRow>
    );
  };

  // Return a FlatList of favorite campsites
  return (
    <FlatList
      data={campsitesArray.filter((campsite) =>
        favorites.includes(campsite.id)
      )}
      renderItem={renderFavoriteItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

// StyleSheet
const styles = StyleSheet.create({
  deleteView: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
  },
  deleteTouchable: {
    backgroundColor: "red",
    height: "100%",
    justifyContent: "center",
  },
  deleteText: {
    color: "white",
    fontWeight: "700",
    textAlign: "center",
    fontSize: 16,
    width: 100,
  },
});

// Export the FavoritesScreen component
export default FavoritesScreen;
