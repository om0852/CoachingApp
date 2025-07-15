import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import Header from "../../components/Home/Header";
import NoCourse from "../../components/Home/NoCourse";
import Colors from "../../constants/Colors";

const Home = () => {
  return (
    <View
      style={{
        padding: 25,
        paddingTop: Platform.OS == "ios" && 45,
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}
    >
      <Header />
      <NoCourse />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
