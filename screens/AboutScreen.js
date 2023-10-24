import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Card, Text, ListItem, Avatar, Image } from "react-native-elements"; // Import necessary components

// Import the partners data from the shared folder
import { PARTNERS } from "../shared/partners";

// Separate functional component for the Mission
const Mission = () => {
  return (
    <Card>
      <Card.Title>Our Mission</Card.Title> {/* Title for Mission */}
      <Card.Divider /> {/* Divider after the title */}
      <Text style={{ margin: 10 }}>
        We present a curated database of the best campsites in the vast woods
        and backcountry of the World Wide Web Wilderness. We increase access to
        adventure for the public while promoting safe and respectful use of
        resources. The expert wilderness trekkers on our staff personally verify
        each campsite to make sure that they are up to our standards. We also
        present a platform for campers to share reviews on campsites they have
        visited with each other.
      </Text>
    </Card>
  );
};

const AboutScreen = () => {
  // Initialize state for partners data
  const [partnersData, setPartnersData] = useState(PARTNERS);

  return (
    <ScrollView>
      <Mission /> {/* Render the Mission component */}
      <Card>
        <Card.Title>Community Partners</Card.Title>{" "}
        {/* Title for Community Partners */}
        <Card.Divider /> {/* Divider after the title */}
        {partnersData.map((partner) => (
          <ListItem key={partner.id}>
            <Avatar rounded source={{ uri: partner.image }} />{" "}
            {/* Avatar with partner's image */}
            <ListItem.Content>
              <ListItem.Title>{partner.name}</ListItem.Title>{" "}
              {/* Partner's name */}
              <ListItem.Subtitle>{partner.description}</ListItem.Subtitle>{" "}
              {/* Partner's description */}
            </ListItem.Content>
          </ListItem>
        ))}
      </Card>
    </ScrollView>
  );
};

export default AboutScreen;
