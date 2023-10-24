import React from "react";
import { FlatList, Text, View } from "react-native";
import { Tile } from "react-native-elements";
import { useSelector } from "react-redux";
import Loading from "../components/LoadingComponent";

const DirectoryScreen = ({ navigation }) => {
  const campsites = useSelector((state) => state.campsites);

  if (campsites.isLoading) {
    return <Loading />;
  }

  if (campsites.errMess) {
    return (
      <View>
        <Text>{campsites.errMess}</Text>
      </View>
    );
  }

  const renderDirectoryItem = ({ item }) => {
    return (
      <Tile
        title={item.name}
        caption={item.description}
        featured
        onPress={() => navigation.navigate("CampsiteInfo", { campsite: item })}
        imageSrc={{ uri: baseUrl + item.image }}
      />
    );
  };

  return (
    <FlatList
      data={campsites.campsitesArray}
      renderItem={renderDirectoryItem}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default DirectoryScreen;
