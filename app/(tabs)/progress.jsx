import { useRouter } from "expo-router";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CourseProgressCard from "../../components/Shared/CourseProgressCard";
import { db } from "../../config/firebaseConfig";
import Colors from "../../constants/Colors";
import { UserDetailContext } from "../../context/userDetailContext";

const Progress = () => {
  const router = useRouter();
  const { userDetail } = useContext(UserDetailContext);
  const [courseList, setCourseList] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    userDetail && GetCourseList();
  }, [userDetail]);

  const GetCourseList = async () => {
    setCourseList([])
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
    <View style={{
      backgroundColor:"white",
      flex:1
    }}>
      <Image
        source={require("./../../assets/images/wave.png")}
        style={{
          position: "absolute",
          width: "100%",
          height: 700,
        }}
      />
      <View
        style={{
          width: "100%",
          position: "absolute",
          marginTop: 20,
          padding: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            color: Colors.WHITE,
            fontSize: 30,
            marginBlock: 10,
          }}
        >
          Course Progress
        </Text>
        <FlatList
          data={courseList}
          showsVerticalScrollIndicator={false}
          onRefresh={()=>GetCourseList()}
          refreshing={loading}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={()=>{
              router.push({
                pathname:"/courseView/"+item?.id,
                params:{
                  courseParams:JSON.stringify(item)
                }
              })
            }}>
              <CourseProgressCard item={item}  width={"95%"}/>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default Progress;

const styles = StyleSheet.create({});
