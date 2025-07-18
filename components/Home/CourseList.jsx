import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Colors from "../../constants/Colors";
import { imageAssets } from "../../constants/Option";

const CourseList = ({ courseList }) => {
  const router = useRouter();
  return (
    <View style={{ marginTop: 15 }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>
        CourseList
      </Text>
      <FlatList
        data={courseList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={()=>router.push({
            pathname:`/courseView/${item.id}`,
            params:{
              courseParams:JSON.stringify(item)
            }
          })} key={index} style={styles.courseConatiner}>
            <Image
              source={imageAssets[item.banner_image]}
              style={{
                width: " 100%",
                height: 150,
                borderRadius: 15,
              }}
            />
            <Text
              style={{
                fontFamily: "outfit-bold",
                fontSize: 18,
                marginTop: 10,
              }}
            >
              {item?.courseTitle}
            </Text>
            <View style={{
                display:"flex",
                flexDirection:"row",
                gap:5,
                alignItems:'center',
                marginTop:5
            }}>
              <Ionicons name="book-outline" size={24} color={"black"} />
              <Text style={{ fontFamily: "outfit" }}>
                {item?.chapters?.length} Chapter
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default CourseList;

const styles = StyleSheet.create({
  courseConatiner: {
    padding: 10,
    backgroundColor: Colors.BG_GRAY,
    margin: 6,
    borderRadius: 15,
    width: 240,
  },
});
