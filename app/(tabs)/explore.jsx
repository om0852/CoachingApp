import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import CourseListBYCategory from "../../components/Explore/CourseListBYCategory";
import Colors from "../../constants/Colors";
import { CourseCategory } from "../../constants/Option";

const Explore = () => {
  return (
    <FlatList
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}
      data={[]}
      ListHeaderComponent={
        <View
          style={{
            padding: 25,
            backgroundColor: Colors.WHITE,
            flex: 1,
          }}
        >
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 30,
            }}
          >
            Explore More Courses
          </Text>
          {CourseCategory.map((item, index) => (
            <View
              key={index}
              style={{
                marginTop: 10,
              }}
            >
              <CourseListBYCategory category={item} />
            </View>
          ))}
        </View>
      }
    />
  );
};

export default Explore;

const styles = StyleSheet.create({});
