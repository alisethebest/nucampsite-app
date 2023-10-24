import React from "react";
import { View, Text } from "react-native";

const CampsiteInfoScreen = ({ route }) => {
  const { campsite } = route.params;

  return (
    <View>
      <Text>{campsite.name}</Text>
      <Text>{campsite.description}</Text>
      {/* Add more campsite details here */}
    </View>
  );
};

export default CampsiteInfoScreen;
