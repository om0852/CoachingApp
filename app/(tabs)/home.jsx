import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { Platform, StyleSheet, View } from "react-native";
import CourseList from "../../components/Home/CourseList";
import Header from "../../components/Home/Header";
import NoCourse from "../../components/Home/NoCourse";
import PracticeSection from "../../components/Home/PracticeSection";
import { db } from "../../config/firebaseConfig";
import Colors from "../../constants/Colors";
import { UserDetailContext } from "../../context/userDetailContext";

const Home = () => {
  const { userDetail } = useContext(UserDetailContext);
  const [courseList, setCourseList] = useState([]);
  useEffect(() => {
    userDetail && GetCourseList();
  }, [userDetail]);

  const GetCourseList = async () => {
    const q = query(
      collection(db, "Courses"),
      where("createdBy", "==", userDetail?.email)
    );
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      console.log(doc.data());
      setCourseList((prev) => [...prev, doc.data()]);
    });
  };
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
      {courseList?.length == 0 ? (
        <NoCourse />
      ) : (
        <View>
          <PracticeSection/>
          <CourseList courseList={courseList} />
        </View>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
