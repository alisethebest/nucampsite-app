import React from "react";
import { ScrollView } from "react-native";
import { Card, Text } from "react-native-elements"; // Import Card and Text from RNE

const ContactScreen = () => {
  return (
    <ScrollView>
      <Card wrapperStyle={{ margin: 20 }}>
        {" "}
        {/* Add wrapperStyle to Card */}
        <Card.Title>Contact Information</Card.Title> {/* Set the title */}
        <Card.Divider /> {/* Add a divider */}
        <Text>1 Nucamp Way</Text> {/* Address line */}
        <Text>Seattle, WA 98001</Text> {/* Address line */}
        <Text>U.S.A.</Text> {/* Address line */}
        <Text style={{ marginBottom: 10 }}>
          {" "}
          {/* Add marginBottom */}
          Phone: 1-206-555-1234
        </Text>
        <Text>Email: campsites@nucamp.co</Text>
      </Card>
    </ScrollView>
  );
};

export default ContactScreen;
