import { useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import Chapters from "../../../components/CourseView/Chapters";
import Intro from "../../../components/CourseView/Intro";
import { db } from "../../../config/firebaseConfig";
import Colors from "../../../constants/Colors";

const Index = () => {
  const { courseParams, courseId,enroll } = useLocalSearchParams();
  console.log(enroll)
  const [course, setCourse] = useState(null);
  useEffect(() => {
    if (!courseParams) {
      GetCourseById();
    } else {
      setCourse(JSON.parse(courseParams));
    }
  }, [courseId, courseParams]);

  const GetCourseById = async () => {
    const docRef = await getDoc(doc(db, "Courses", courseId));
    const courseData = docRef.data();
    console.log("data updated")
    setCourse(courseData);
  };
  return (
    course && (
      <FlatList
        data={[]}
        ListHeaderComponent={
          <View
            style={{
              flex: 1,
              backgroundColor: Colors.WHITE,
            }}
          >
            <Intro course={course} enroll={enroll} />
            <Chapters course={course} />
          </View>
        }
      />
    )
  );
};

export default Index;
