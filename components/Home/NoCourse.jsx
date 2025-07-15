import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Button from "../Shared/Button";

export default function NoCourse() {
  return (
    <View
      style={{
        marginTop: 40,
        display: "flex",
        alignItems: "center",
      }}
    >
      <Image
        style={{
          height: 200,
          width: 200,
        }}
        source={require("../../assets/images/book.png")}
      />
      <Text style={{ fontFamily: "outfit-bold", fontSize: 25,textAlign:"center" }}>
        You Don't Have Any Course
      </Text>
      <Button text={"+ Create New Course"}/>
      <Button text={"Explore Existing Courses"} type="fill"/>

    </View>
  );
}

const styles = StyleSheet.create({});
