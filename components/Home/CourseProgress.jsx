import React from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import * as Progress from 'react-native-progress';
import Colors from "../../constants/Colors";
import { imageAssets } from "../../constants/Option";
const CourseProgress = ({ courseList }) => {
  return (
    <View
      style={{
        marginTop: 15,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 25,
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
            <View
              style={{
                margin: 7,
                padding: 15,
                backgroundColor: Colors.BG_GRAY,
                borderRadius: 15,
                width: 280,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 8,
                }}
              >
                <Image
                  source={imageAssets[item?.banner_image]}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 8,
                  }}
                />
                <View style={{
                    flex:1
                }}>
                  <Text
                  numberOfLines={2}
                  style={{ fontFamily: "outfit-bold", fontSize: 17 }}>
                    {item?.courseTitle}
                  </Text>
                  <Text
                    style={{
                      fontFamily: "outfit",
                      fontSize: 15,
                    }}
                  >
                    {item?.chapters?.length} Chapter
                  </Text>
                </View>
              </View>
              <View style={{
                marginTop:10
              }}>
              <Progress.Bar progress={0.3} width={250} />
              <Text style={{
                fontFamily:"outfit",
                marginTop:2
              }}>3 Out of 5 Chapter Completed</Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

export default CourseProgress;

const styles = StyleSheet.create({});
