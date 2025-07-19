import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../constants/Colors";

const CourseListGrid = ({ courseList, option }) => {
  const router = useRouter();
  const onPress = (course)=>{
    console.log(option)
   if(option?.name=="Quiz"){
    router.push({
      pathname:"/quiz",
      params:{
        courseParams:JSON.stringify(course),
      }
    })
   }
   else if(option.name=="Flashcards"){
    router.push({
      pathname:"/flashcards",
      params:{
        courseParams:JSON.stringify(course)
      }
    })
   }
   else if(option.name=="Question & Ans"){
    router.push({
      pathname:"/questionAnswer",
      params:{
        courseParams:JSON.stringify(course)
      }
    })
   }
  }
  return (
    <View>
      <FlatList
        data={courseList}
        numColumns={2}
        style={{
          padding: 20,
        }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => onPress(item)}
            key={index}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: 15,
              backgroundColor: Colors.WHITE,
              margin: 7,
              borderRadius: 15,
              elevation: 1,
            }}
          >
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={Colors.GRAY}
              style={{
                position: "absolute",
                left: 20,
                top: 10,
              }}
            />
            <Image
              source={option?.icon}
              style={{
                width: "100%",
                height: 70,
                objectFit: "contain",
              }}
            />
            <Text
              style={{
                fontFamily: "outfit",
                textAlign: "center",
                marginTop: 7,
              }}
              numberOfLines={2}
            >
              {item.courseTitle}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CourseListGrid;

const styles = StyleSheet.create({});
