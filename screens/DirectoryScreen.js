import React, { useState } from "react";
import { FlatList } from "react-native";
import { ListItem } from "react-native-elements";
import { CAMPSITES } from "../shared/campsites";

const DirectoryScreen = ({ navigation }) => {
  const [campsites, setCampsites] = useState(CAMPSITES);

  const renderCampsiteItem = ({ item }) => {
    return (
      <ListItem
        bottomDivider
        onPress={() => navigation.navigate("CampsiteInfo", { campsite: item })}
      >
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    );
  };

  return (
    <FlatList
      data={campsites}
      renderItem={renderCampsiteItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default DirectoryScreen;
