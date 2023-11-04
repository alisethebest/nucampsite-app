import React, { useState } from "react";
import { FlatList, StyleSheet, View, Modal, Button, Text } from "react-native"; // Make sure Text is imported
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "../features/favorites/favoritesSlice";
import RenderCampsite from "../features/campsites/RenderCampsite";
import { Rating, Input } from "react-native-elements";
import { FontAwesome } from "@expo/vector-icons";
import { postComment } from "../features/comments/commentsSlice";

const CampsiteInfoScreen = ({ route }) => {
  const { campsite } = route.params;
  const comments = useSelector((state) => state.comments);
  const favorites = useSelector((state) => state.favorites);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(5);
  const [author, setAuthor] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = () => {
    const newComment = {
      campsiteId: campsite.id,
      rating,
      author,
      text,
    };

    console.log(newComment); // Log the new comment
    dispatch(postComment(newComment)); // Dispatch the postComment action here
    setShowModal(!showModal); // Toggle the visibility of the modal
    resetForm(); // Reset the form fields
  };

  const resetForm = () => {
    setRating(5);
    setAuthor("");
    setText("");
  };

  const renderCommentItem = ({ item }) => {
    return (
      <View style={styles.commentItem}>
        <Text style={{ fontSize: 14 }}>{item.text}</Text>
        <Rating
          startingValue={item.rating}
          imageSize={10}
          style={{ alignItems: "flex-start", paddingVertical: "5%" }}
          readonly
        />
        <Text
          style={{ fontSize: 12 }}
        >{`-- ${item.author}, ${item.date}`}</Text>
      </View>
    );
  };

  return (
    <>
      <FlatList
        data={comments.commentsArray.filter(
          (comment) => comment.campsiteId === campsite.id
        )}
        renderItem={renderCommentItem}
        keyExtractor={(item) => item.id.toString()}
        ListHeaderComponent={
          <>
            <RenderCampsite
              campsite={campsite}
              isFavorite={favorites.includes(campsite.id)}
              markFavorite={() => dispatch(toggleFavorite(campsite.id))}
              onShowModal={() => setShowModal(!showModal)}
            />
          </>
        }
      />
      <Modal
        animationType="slide"
        transparent={false}
        visible={showModal}
        onRequestClose={() => setShowModal(!showModal)}
      >
        <View style={styles.modal}>
          <Rating
            showRating
            startingValue={rating}
            imageSize={40}
            onFinishRating={setRating}
            style={{ paddingVertical: 10 }}
          />
          <Input
            placeholder="Author"
            leftIcon={<FontAwesome name="user-o" size={24} color="black" />}
            leftIconContainerStyle={{ paddingRight: 10 }}
            onChangeText={setAuthor}
            value={author}
          />
          <Input
            placeholder="Comment"
            leftIcon={<FontAwesome name="comment-o" size={24} color="black" />}
            leftIconContainerStyle={{ paddingRight: 10 }}
            onChangeText={setText}
            value={text}
            multiline
          />
          <View style={{ margin: 10 }}>
            <Button onPress={handleSubmit} color="#5637DD" title="Submit" />
            <Button
              onPress={() => {
                setShowModal(!showModal); // Toggle the visibility of the modal
                resetForm(); // Reset the form fields when cancel is pressed
              }}
              color="#808080"
              title="Cancel"
            />
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  commentsTitle: {
    textAlign: "center",
    backgroundColor: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    color: "#43484D",
    padding: 10,
    paddingTop: 30,
  },
  commentItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  modal: {
    justifyContent: "center",
    margin: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    backgroundColor: "#fff",
    textAlign: "center",
    marginVertical: 20,
  },
  modalText: {
    fontSize: 18,
    margin: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: "#DDD",
  },
});

export default CampsiteInfoScreen;
