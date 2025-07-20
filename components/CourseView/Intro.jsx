import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { doc, setDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { db } from "../../config/firebaseConfig";
import Colors from "../../constants/Colors";
import { imageAssets } from "../../constants/Option";
import { UserDetailContext } from "../../context/userDetailContext";
import Button from "../Shared/Button";

const Intro = ({ course, enroll=false }) => {
  console.log(enroll)
  const router = useRouter();
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [loading,setLoading] =useState(false);

  const onEnrollCourse = async () => {
    const router = useRouter()
    setLoading(true)
    const id = Date.now().toString();
    const data={
      ...course,
      createdBy: userDetail?.email,
      createdOn:new Date(),
      enroll:true
    }
    await setDoc(doc(db, "Courses", id),data);
    router.push({
      pathname:`/courseView/${id}`,
      params:{
        courseParams:JSON.stringify(data),
        enroll:false
      }});
    setLoading(false)

  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}
    >
      <Image
        source={imageAssets[course?.banner_image]}
        style={{ width: "100%", height: 280 }}
      />
      <View
        style={{
          padding: 20,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 20,
          }}
        >
          {course?.courseTitle}
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 5,
            alignItems: "center",
            marginTop: 5,
          }}
        >
          <Ionicons name="book-outline" size={24} color={"black"} />
          <Text style={{ fontFamily: "outfit", fontSize: 18 }}>
            {course?.chapters?.length} Chapter
          </Text>
        </View>
        <Text
          style={{
            marginTop: 10,
            fontFamily: "outfit-bold",
            fontSize: 20,
          }}
        >
          Description
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 18,
            color: Colors.GRAY,
          }}
        >
          {course.description}
        </Text>
        {enroll==true ? (
          <Button loading={loading} text={"Enroll Now"} onPress={() => onEnrollCourse()} />
        ) : (
          <Button loading={loading} text={"Start Now"} onPress={() => console.log("hi")} />
        )}
      </View>

      <Pressable
        style={{
          position: "absolute",
          padding: 10,
        }}
        onPress={() => router.back()}
      >
        <Ionicons name="arrow-back" size={34} color={"black"} />
      </Pressable>
    </View>
  );
};

export default Intro;

const styles = StyleSheet.create({});
