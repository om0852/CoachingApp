import { useLocalSearchParams } from "expo-router";
import React from "react";
import { View } from "react-native";
import Intro from "../../components/CourseView/Intro";
import Colors from "../../constants/Colors";

const Index = () => {
  const { courseParams } = useLocalSearchParams();
  const course = JSON.parse(courseParams);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}
    >
      <Intro course={course} />
    </View>
  );
};

export default Index;
