import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { FlatList, Image, Platform, StyleSheet, View } from "react-native";
import CourseList from "../../components/Home/CourseList";
import CourseProgress from "../../components/Home/CourseProgress";
import Header from "../../components/Home/Header";
import NoCourse from "../../components/Home/NoCourse";
import PracticeSection from "../../components/Home/PracticeSection";
import { db } from "../../config/firebaseConfig";
import { UserDetailContext } from "../../context/userDetailContext";

const Home = () => {
  const { userDetail } = useContext(UserDetailContext);
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    userDetail && GetCourseList();
  }, [userDetail]);

  const GetCourseList = async () => {
    setLoading(true);
    const q = query(
      collection(db, "Courses"),
      where("createdBy", "==", userDetail?.email)
    );
    const querySnapShot = await getDocs(q);
    querySnapShot.forEach((doc) => {
      setCourseList((prev) => [...prev, doc.data()]);
    });
    setLoading(false);
  };
  return (
    <FlatList
      style={{
        backgroundColor: "white",
        flex: 1,
      }}
      data={[]}
      onRefresh={() => GetCourseList()}
      refreshing={loading}
      ListHeaderComponent={
        <View>
          <Image
            style={{
              position: "absolute",
              width: "100%",
              zIndex: 1,
            }}
            source={require("../../assets/images/wave.png")}
          />
          <View
            style={{
              padding: 25,
              backgroundColor: "white",
              paddingTop: (Platform.OS == "ios" || Platform.OS == "web") && 45,
            }}
          >
            <Header />
            {courseList?.length == 0 ? (
              <NoCourse />
            ) : (
              <View>
                <CourseProgress courseList={courseList} />
                <PracticeSection />
                <CourseList courseList={courseList} />
              </View>
            )}
          </View>
        </View>
      }
    />
  );
};

export default Home;

const styles = StyleSheet.create({});
