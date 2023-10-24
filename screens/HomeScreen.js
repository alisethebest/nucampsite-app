import React from "react";
import { Text, View, ScrollView } from "react-native";
import { Card } from "react-native-elements";
import { useSelector } from "react-redux"; // Import useSelector
import { baseUrl } from "../shared/baseUrl"; // Import baseUrl from shared

const HomeScreen = () => {
  // Remove the useState and imports for CAMPSITES, PROMOTIONS, and PARTNERS

  // Use useSelector to get the data from Redux store
  const campsites = useSelector((state) => state.campsites);
  const promotions = useSelector((state) => state.promotions);
  const partners = useSelector((state) => state.partners);

  const FeaturedItem = ({ item }) => {
    if (item) {
      return (
        <Card containerStyle={{ padding: 0 }}>
          {/* Update the source prop of Card.Image */}
          <Card.Image source={{ uri: baseUrl + item.image }}>
            <View style={{ justifyContent: "center", flex: 1 }}>
              <Text
                style={{ color: "white", textAlign: "center", fontSize: 20 }}
              >
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

  // Update featCampsite, featPromotion, and featPartner
  const featCampsite = campsites.campsitesArray.find((item) => item.featured);
  const featPromotion = promotions.promotionsArray.find(
    (item) => item.featured
  );
  const featPartner = partners.partnersArray.find((item) => item.featured);

  return (
    <ScrollView>
      <FeaturedItem item={featCampsite} />
      <FeaturedItem item={featPromotion} />
      <FeaturedItem item={featPartner} />
    </ScrollView>
  );
};

export default HomeScreen;
