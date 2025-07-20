import { useRouter } from "expo-router";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View
} from "react-native";
import { db } from "../../config/firebaseConfig";
import Colors from "../../constants/Colors";
import CourseList from "../Home/CourseList";

const CourseListBYCategory = ({ category }) => {
  const router = useRouter();
  useEffect(() => {
    GetCourseListByCatgeory();
  }, [category]);

  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);
  const GetCourseListByCatgeory = async () => {
    try {
      setCourseList([]);
      setLoading(true);

      const q = query(
        collection(db, "Courses"),
        where("category", "==", category),
        orderBy("createdOn", "desc")
      );
      const querySnapShot = await getDocs(q);
      querySnapShot?.forEach((doc) => {
        setCourseList((prev) => [...prev, doc.data()]);
      });
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View
     >
    
{courseList?.length>0 && <CourseList courseList={courseList} heading={category} enroll={true}/>
}   
 </View>
  );
};

export default CourseListBYCategory;

const styles = StyleSheet.create({
  courseConatiner: {
    padding: 10,
    backgroundColor: Colors.BG_GRAY,
    margin: 6,
    borderRadius: 15,
    width: 240,
  },
});
