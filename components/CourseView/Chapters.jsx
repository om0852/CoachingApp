import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../constants/Colors";

const Chapters = ({ course }) => {
  const router = useRouter();
  const isChapterCompleted = (index) => {
    const isCompleted = course?.completedChapter.find((item) => item == index);
    return !isCompleted ? true : false;
  };
  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 25,
        }}
      >
        Chapters
      </Text>
      <FlatList
        data={course?.chapters}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "chapterView",
                params: {
                  chapterParams: JSON.stringify(item),
                  id: course.id,
                  chapterIndex: index,
                },
              })
            }
            style={{
              padding: 18,
              borderWidth: 0.5,
              borderRadius: 15,
              marginTop: 10,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 5,
              }}
            >
              <Text style={styles.chapterText}>{index + 1}.</Text>
              <Text style={styles.chapterText} numberOfLines={1}>
                {item?.chapterName}
              </Text>
            </View>
            {isChapterCompleted(index) ? (
              <Ionicons name="play" size={24} color={Colors.PRIMARY} />
            ) : (
              <Ionicons size={24} name="checkmark-circle" color={Colors.GREEN} />
            )}
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Chapters;

const styles = StyleSheet.create({
  chapterText: {
    fontFamily: "outfit",
    fontSize: 17,
    maxWidth: 270,
  },
});
