import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/Colors";

const CourseListGrid = ({ courseList, option }) => {
  return (
    <View>
      <FlatList
        data={courseList}
        numColumns={2}
        style={{
          padding: 20,
        }}
        renderItem={({ item, index }) => (
          <View
            key={index}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 15,
              backgroundColor: Colors.WHITE,
              margin: 7,
              borderRadius: 15,
              elevation: 1,
            }}
          >
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={Colors.GRAY}
              style={{
                position: "absolute",
                left: 20,
                top: 10,
              }}
            />
            <Image
              source={option?.icon}
              style={{
                width: "100%",
                height: 70,
                objectFit: "contain",
              }}
            />
            <Text
              style={{
                fontFamily: "outfit",
                textAlign: "center",
                marginTop: 7,
              }}
            >
              {item.courseTitle}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default CourseListGrid;

const styles = StyleSheet.create({});
