import { useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, View } from "react-native";
import Chapters from "../../components/CourseView/Chapters";
import Intro from "../../components/CourseView/Intro";
import Colors from "../../constants/Colors";

const Index = () => {
  const { courseParams } = useLocalSearchParams();
  const course = JSON.parse(courseParams);

  return (
    <FlatList
      data={[]}
      ListHeaderComponent={
        <View
          style={{
            flex: 1,
            backgroundColor: Colors.WHITE,
          }}
        >
          <Intro course={course} />
          <Chapters course={course} />
        </View>
      }
    />
  );
};

export default Index;
