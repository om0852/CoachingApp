import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import CourseProgressCard from "../Shared/CourseProgressCard";
const CourseProgress = ({ courseList }) => {
 
  return (
    <View
      style={{
        position: "relative",
        zIndex: 5,
        marginTop: 15,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 25,
          color: "white",
        }}
      >
        Progress
      </Text>
      <FlatList
        data={courseList}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return (
            <View key={index}>
         <CourseProgressCard item={item}/>
            </View>
          );
        }}
      />
    </View>
  );
};

export default CourseProgress;

const styles = StyleSheet.create({});
