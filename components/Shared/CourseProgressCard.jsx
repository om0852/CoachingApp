import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import * as Progress from "react-native-progress";
import Colors from '../../constants/Colors';
import { imageAssets } from '../../constants/Option';
const CourseProgressCard = ({item,width=280}) => {
    const GetCompletedChapter = (course) => {
        const completedChapter = course?.completedChapter?.length;
        const perc = completedChapter / course?.chapters?.length;
        return perc;
      };
  return (
    <View
    style={{
      margin: 7,
      padding: 15,
      backgroundColor: Colors.BG_GRAY,
      borderRadius: 15,
      width: width,
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
      <View
        style={{
          flex: 1,
        }}
      >
        <Text
          numberOfLines={2}
          style={{ fontFamily: "outfit-bold", fontSize: 17 }}
        >
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
    <View
      style={{
        marginTop: 10,
      }}
    >
      <Progress.Bar
        progress={GetCompletedChapter(item)}
        width={width-30}
      />
      <Text
        style={{
          fontFamily: "outfit",
          marginTop: 2,
        }}
      >
        {item?.completedChapter?.length || 0} Out of{" "}
        {item?.chapters?.length} Chapter Completed
      </Text>
    </View>
  </View>
  )
}

export default CourseProgressCard

const styles = StyleSheet.create({})