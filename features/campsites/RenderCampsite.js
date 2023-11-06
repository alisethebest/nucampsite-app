import PropTypes from "prop-types"; // Import PropTypes
import { useRef } from "react";
import { StyleSheet, Text, View, PanResponder, Alert } from "react-native";
import { Card, Icon } from "react-native-elements";
import { baseUrl } from "../../shared/baseUrl";
import * as Animatable from "react-native-animatable";

const RenderCampsite = (props) => {
  const { campsite, isFavorite, markFavorite, onShowModal } = props;

  const view = useRef();

  const isLeftSwipe = ({ dx }) => dx < -200;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      view.current
        .rubberBand(1000)
        .then((endState) =>
          console.log(endState.finished ? "finished" : "canceled")
        );
    },
    onPanResponderEnd: (e, gestureState) => {
      if (isLeftSwipe(gestureState)) {
        if (isFavorite) {
          Alert.alert(
            "Favorite Already Set",
            `${campsite.name} is already set as a favorite.`,
            [{ text: "OK" }],
            { cancelable: true }
          );
        } else {
          Alert.alert(
            "Add Favorite",
            `Are you sure you wish to add ${campsite.name} to favorites?`,
            [
              {
                text: "Cancel",
                style: "cancel",
              },
              {
                text: "OK",
                onPress: markFavorite,
              },
            ],
            { cancelable: false }
          );
        }
      }
    },
  });

  if (campsite) {
    return (
      <Animatable.View
        animation="fadeInDownBig"
        duration={2000}
        delay={1000}
        ref={view}
        {...panResponder.panHandlers}
      >
        <Card containerStyle={styles.cardContainer}>
          <Card.Image source={{ uri: baseUrl + campsite.image }}>
            <View style={{ justifyContent: "center", flex: 1 }}>
              <Text style={styles.cardText}>{campsite.name}</Text>
            </View>
          </Card.Image>
          <Text style={{ margin: 20 }}>{campsite.description}</Text>
          <View style={styles.cardRow}>
            <Icon
              name={isFavorite ? "heart" : "heart-o"}
              type="font-awesome"
              color="#f50"
              raised
              reverse
              onPress={() =>
                isFavorite
                  ? Alert.alert(
                      "Favorite Already Set",
                      `${campsite.name} is already set as a favorite.`
                    )
                  : markFavorite()
              }
              accessibilityLabel={
                isFavorite ? "This is a favorite campsite" : "Mark as favorite"
              }
            />
            <Icon
              name="pencil"
              type="font-awesome"
              color="#5637DD"
              raised
              reverse
              onPress={onShowModal}
              accessibilityLabel="Edit"
            />
          </View>
        </Card>
      </Animatable.View>
    );
  }
  return (
    <View style={styles.placeholderContainer}>
      <Text style={styles.placeholderText}>No Campsite Data Available</Text>
    </View>
  );
};

RenderCampsite.propTypes = {
  campsite: PropTypes.object,
  isFavorite: PropTypes.bool,
  markFavorite: PropTypes.func,
  onShowModal: PropTypes.func,
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 0,
    margin: 0,
    marginBottom: 20,
  },
  cardRow: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    flexDirection: "row",
    margin: 20,
  },
  cardText: {
    textShadowColor: "rgba(0, 0, 0, 0.8)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    textAlign: "center",
    color: "white",
    fontSize: 20,
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 200,
  },
  placeholderText: {
    fontSize: 18,
    fontStyle: "italic",
  },
});

export default RenderCampsite;
