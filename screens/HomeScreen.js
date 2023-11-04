import React, { useEffect, useRef } from "react"; // Add useEffect and useRef here
import { View, Text, Animated, StyleSheet } from "react-native";
import { Card } from "react-native-elements";
import { useSelector } from "react-redux";
import Loading from "../components/LoadingComponent";

const FeaturedItem = (props) => {
  const { item } = props;

  if (props.isLoading) {
    return <Loading />;
  }

  if (props.errMess) {
    return (
      <View>
        <Text>{props.errMess}</Text>
      </View>
    );
  }

  if (item) {
    return (
      <Card containerStyle={{ padding: 0 }}>
        <Card.Image source={{ uri: baseUrl + item.image }}>
          <View style={{ justifyContent: "center", flex: 1 }}>
            <Text style={{ color: "white", textAlign: "center", fontSize: 20 }}>
              {item.name}
            </Text>
          </View>
        </Card.Image>
        <Text style={{ margin: 20 }}>{item.description}</Text>
      </Card>
    );
  }
  return <View />;
};

const HomeScreen = () => {
  const campsites = useSelector((state) => state.campsites);
  const promotions = useSelector((state) => state.promotions);
  const partners = useSelector((state) => state.partners);

  // scaleValue constant using useRef
  const scaleValue = useRef(new Animated.Value(0)).current;

  // scaleAnimation constant
  const scaleAnimation = Animated.timing(scaleValue, {
    toValue: 1,
    duration: 1500,
    useNativeDriver: true,
  });

  // useEffect hook to start the animation
  useEffect(() => {
    scaleAnimation.start();
  }, []);

  return (
    <Animated.ScrollView style={{ transform: [{ scale: scaleValue }] }}>
      <FeaturedItem
        item={featCampsite}
        isLoading={campsites.isLoading}
        errMess={campsites.errMess}
      />
      <FeaturedItem
        item={featPromotion}
        isLoading={promotions.isLoading}
        errMess={promotions.errMess}
      />
      <FeaturedItem
        item={featPartner}
        isLoading={partners.isLoading}
        errMess={partners.errMess}
      />
    </Animated.ScrollView>
  );
};

export default HomeScreen;
