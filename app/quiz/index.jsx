import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import {
    Dimensions,
    Image,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import * as Progress from "react-native-progress";
import Button from "../../components/Shared/Button";
import { db } from "../../config/firebaseConfig";
import Colors from "../../constants/Colors";
const Quiz = () => {
  const { courseParams } = useLocalSearchParams();
  const course = JSON.parse(courseParams);
  const quiz = course?.quiz;
  const [selectedOption, setSelectedOption] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const GetProgess = (currentPage) => {
    const perc = (currentPage+1) / quiz?.length;
    return perc;
  };

  const OnOptionSelect = (selectedChoice) => {
    setResult((prev) => ({
      ...prev,
      [currentPage]: {
        userChoice: selectedChoice,
        isCorrect: quiz[currentPage]?.correctAns == selectedChoice,
        question: quiz[currentPage].question,
        correctAns: quiz[currentPage]?.correctAns,
      },
    }));
    console.log(result)
  };
  const onQuizFinish = async () => {
    //save the result in database for quiz
    try {
      setLoading(true);
    
      await updateDoc(doc(db, "Courses", course.id), {
        quizResult: result,
      });
      setLoading(false);
    } catch (e) {
        console.log(e)
      setLoading(false);
    }
    //redirect to summary page
  };

  return (
    <View>
      <Image
        source={require("./../../assets/images/wave.png")}
        style={{
          height: 800,
          width: "100%",
        }}
      />
      <View
        style={{
          position: "absolute",
          padding: 25,
        }}
      >
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Pressable>
            <Ionicons name="arrow-back" size={30} color={"white"} />
          </Pressable>
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 25,
              color: Colors.WHITE,
            }}
          >
            {currentPage + 1} of {quiz?.length}
          </Text>
        </View>
        <View
          style={{
            marginTop: 20,
          }}
        >
          <Progress.Bar
            progress={GetProgess(currentPage)}
            width={Dimensions.get("screen").width * 0.8}
            color={Colors.WHITE}
            height={10}
          />
        </View>
        <View
          style={{
            padding: 25,
            backgroundColor: Colors.WHITE,
            marginTop: 30,
            height: Dimensions.get("screen").height * 0.65,
            elevation: 1,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              fontSize: 25,
              fontFamily: "outfit-bold",
              textAlign: "center",
            }}
          >
            {" "}
            {quiz[currentPage]?.question}
          </Text>

          {quiz[currentPage]?.options.map((item, index) => (
            <TouchableOpacity
              onPress={() => {
                setSelectedOption(index);
                OnOptionSelect(item);
              }}
              key={index}
              style={{
                padding: 15,
                borderWidth: 0.3,
                borderRadius: 15,
                marginTop: 8,
                backgroundColor:
                  selectedOption == index ? Colors.LIGHT_GREEN : null,
                borderColor: selectedOption == index ? Colors.GREEN : null,
              }}
            >
              <Text
                style={{
                  fontFamily: "outfit",
                  fontSize: 20,
                }}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {selectedOption?.toString() && quiz?.length - 1 > currentPage && (
          <Button
            text={"Next"}
            onPress={() => {
              setCurrentPage(currentPage + 1);
              setSelectedOption(null);
            }}
          />
        )}
        {selectedOption?.toString() && quiz.length - 1 == currentPage && (
          <Button loading={loading} text={"Finish"} onPress={() => onQuizFinish()} />
        )}
      </View>
    </View>
  );
};

export default Quiz;

const styles = StyleSheet.create({});
