import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, View } from "react-native";
import Button from "../../components/Shared/Button";
import Colors from "../../constants/Colors";

const QuizSummary = () => {
  const { quizResultParam } = useLocalSearchParams();
  const quizResult = JSON.parse(quizResultParam);
  const [correctAns, setCorrectAns] = useState(0);
  const [totalQuestion, setTotalQuestion] = useState(0);
  const router = useRouter();
  useEffect(() => {
    CalculateResult();
  }, [quizResult]);
  const CalculateResult = () => {
    if (quizResult !== undefined) {
      const correctAns_ = Object.entries(quizResult)?.filter(
        ([key, value]) => value?.isCorrect == true
      );
      const totalQuestion_ = Object.keys(quizResult).length;
      setCorrectAns(correctAns_.length);
      setTotalQuestion(totalQuestion_);
    }
  };

  const GetPercentageMark = () => {
    return ((correctAns / totalQuestion) * 100).toFixed(0);
  };
  return (
    <FlatList
      data={[]}
      style={{
        flex: 1,
      }}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <View
          style={{
            backgroundColor: Colors.WHITE,
          }}
        >
          <View
            style={{
              position: "absolute",
              width: "100%",
              padding: 35,
            }}
          >
            <Image
              source={require("./../../assets/images/wave.png")}
              style={{
                width: "100%",
                height: 700,
              }}
            />
            <Text
              style={{
                textAlign: "center",
                fontFamily: "outfit-bold",
                fontSize: 30,
                color: Colors.WHITE,
              }}
            >
              Quiz Summery
            </Text>
            <View
              style={{
                backgroundColor: Colors.WHITE,
                padding: 20,
                borderRadius: 20,
                marginTop: 60,
                display: "flex",
                alignItems: "center",
              }}
            >
              <Image
                source={require("./../../assets/images/trophy.png")}
                style={{
                  width: 100,
                  height: 100,
                  marginTop: -60,
                }}
              />
              <Text
                style={{
                  fontSize: 25,
                  fontFamily: "outfit",
                }}
              >
                {GetPercentageMark() > 60 ? "Congratulation!" : "Try Again!"}
              </Text>
              <Text
                style={{
                  fontFamily: "outfit",
                  color: Colors.GRAY,
                }}
              >
                You gave {GetPercentageMark()}% Correct Answer
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginTop: 10,
                }}
              >
                <View style={styles.resultContainer}>
                  <Text style={styles.resultText}>Q {totalQuestion}</Text>
                </View>
                <View style={styles.resultContainer}>
                  <Text style={styles.resultText}>✅ {correctAns}</Text>
                </View>
                <View style={styles.resultContainer}>
                  <Text style={styles.resultText}>
                    ❌ {totalQuestion - correctAns}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <Button
            text={"Back To Home"}
            onPress={() => router.replace("/(tabs)/home")}
          />
          <View
            style={{
              marginTop: 25,
              flex: 1,
            }}
          >
            <Text
              style={{
                fontFamily: "outfit-bold",
                fontSize: 25,
              }}
            >
              Summary
            </Text>
            <FlatList
              data={Object.entries(quizResult)}
              renderItem={({ item, index }) => {
                const quizItem = item[1];
                return (
                  <View
                    style={{
                      padding: 15,
                      borderWidth: 1,
                      marginTop: 5,
                      borderRadius: 15,
                      backgroundColor:
                        quizItem.isCorrect == true
                          ? Colors.LIGHT_GREEN
                          : Colors.LIGHT_RED,
                      borderColor:
                        quizItem.isCorrect == true ? Colors.GREEN : Colors.RED,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: "outfit",
                        fontSize: 20,
                      }}
                    >
                      {quizItem?.question}
                    </Text>
                    <Text
                      style={{
                        fontFamily: "outfit",
                        fontSize: 20,
                      }}
                    >
                      Ans:{quizItem?.correctAns}
                    </Text>
                  </View>
                );
              }}
            />
          </View>
        </View>
      }
    />
  );
};

export default QuizSummary;

const styles = StyleSheet.create({
  resultContainer: {
    padding: 7,
    backgroundColor: Colors.WHITE,
    elevation: 1,
  },
  resultText: {
    fontFamily: "outfit",
    fontSize: 20,
  },
});
