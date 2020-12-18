import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  ScrollView,
} from "react-native";
import yelp from "../api/yelp";

const ResultShowScreen = ({ navigation }) => {
  const [restaurant, setRestaurant] = useState(null);

  const id = navigation.getParam("id");

  const getResult = async (id) => {
    const { data } = await yelp.get(`/${id}`);
    setRestaurant(data);
  };

  useEffect(() => {
    getResult(id);
  }, []);

  if (!restaurant) {
    return null;
  }

  return (
    <ScrollView>
      <View style={{ alignItems: "center", marginBottom: 20 }}>
        <Text style={styles.title}>{restaurant.name}</Text>
        <FlatList
          data={restaurant.photos}
          keyExtractor={(photo) => photo}
          renderItem={({ item }) => {
            return <Image style={styles.image} source={{ uri: item }} />;
          }}
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  title: {
    fontSize: 16,
    margin: 10,
    fontWeight: "bold",
  },
  image: {
    height: 200,
    width: 300,
    marginBottom: 10,
  },
});

export default ResultShowScreen;
