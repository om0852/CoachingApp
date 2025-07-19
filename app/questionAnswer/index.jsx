import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import Colors from "../../constants/Colors";

const QuestionAnswer = () => {
  const router = useRouter();
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const { courseParams } = useLocalSearchParams();
  const course = JSON.parse(courseParams);
  const qaList = course?.qa;

  const onQuestionSelect = (index) => {
    if (selectedQuestion != null) {
      setSelectedQuestion(null);
    } else {
      setSelectedQuestion(index);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}
    >
      <Image
        source={require("./../../assets/images/wave.png")}
        style={{
          height: 600,
          width: "100%",
        }}
      />

      <View
        style={{
          position: "absolute",
          width: "100%",
          padding: 20,
          paddingTop: 60,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Pressable>
            <Ionicons
              name="arrow-back"
              size={30}
              color={"white"}
              onPress={() => router.back()}
            />
          </Pressable>
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 25,
              color: Colors.WHITE,
            }}
          >
            Question & Answer
          </Text>
        </View>

        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 25,
            marginTop:20,
            color:Colors.WHITE
          }}
        >
          {course?.courseTitle}
        </Text>
      </View>
      <FlatList
      style={{
        marginTop:-400,
        padding:20,
      }}
        data={qaList}
        renderItem={({ item, index }) => {
          return (
            <Pressable
              style={styles?.card}
              onPress={() => {
                onQuestionSelect(index);
              }}
            >
              <Text
                style={{
                  fontFamily: "outfit-bold",
                  fontSize: 20,
                }}
              >
                {item?.question}
              </Text>
              {selectedQuestion == index && (
                <View
                  style={{
                    borderTopWidth: 0.4,
                    marginVertical: 10,
                    //   marginBottom: 10,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "outfit",
                      fontSize: 17,
                      color: Colors.GREEN,
                      marginTop: 10,
                    }}
                  >
                    Answer: {item?.answer}
                  </Text>
                </View>
              )}
            </Pressable>
          );
        }}
      />
    </View>
  );
};

export default QuestionAnswer;

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: Colors.WHITE,
    marginTop: 15,
    borderRadius: 15,
    borderWidth: 1,
  },
});
