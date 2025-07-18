import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import {
    ActivityIndicator,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import CourseListGrid from "../../../components/PracticeScreen/CourseListGrid";
import { db } from "../../../config/firebaseConfig";
import Colors from "../../../constants/Colors";
import { PraticeOption } from "../../../constants/Option";
import { UserDetailContext } from "../../../context/userDetailContext";

const PracticeTypeHomeScreen = () => {
  const { userDetail } = useContext(UserDetailContext);
  const { type } = useLocalSearchParams();
  const router = useRouter();
  const option = PraticeOption.find((item) => item.name == type);
  const [loading, setLoading] = useState(false);
  const [courseList, setCourseList] = useState([]);
  useEffect(() => {
    userDetail && GetCourseList();
  }, [userDetail]);
  const GetCourseList = async () => {
    try {
      setCourseList([]);
      setLoading(true);
      const q = query(
        collection(db, "Courses"),
        where("createdBy", "==", userDetail.email),
        orderBy("createdOn", "desc")
      );
      const querySnapShot = await getDocs(q);
      querySnapShot.forEach((doc) => {
        setCourseList((prev) => [...prev, doc.data()]);
      });
      setLoading(false);
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };
  return (
    <View
      style={{
        marginTop: 30,
        backgroundColor: Colors.WHITE,
        flex: 1,
      }}
    >
      <Image
        source={option.image}
        style={{
          height: 200,
          width: "100%",
        }}
      />
      <View
        style={{
          position: "absolute",
          padding: 10,
          display: "flex",
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
        }}
      >
        <Pressable onPress={() => router.back()}>
          <Ionicons
            name="arrow-back"
            color={"black"}
            style={{
              backgroundColor: Colors.WHITE,
              borderRadius: 10,
              padding: 8,
            }}
            size={24}
          />
        </Pressable>
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 35,
            color: "white",
          }}
        >
          {type}
        </Text>
      </View>
      {loading && (
        <ActivityIndicator
          size={"large"}
          color={Colors.PRIMARY}
          style={{
            marginTop: 150,
          }}
        />
      )}
      <CourseListGrid courseList={courseList} />
    </View>
  );
};

export default PracticeTypeHomeScreen;

const styles = StyleSheet.create({});
