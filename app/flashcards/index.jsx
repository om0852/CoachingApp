import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Dimensions,
    FlatList,
    Image,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import FlipCard from "react-native-flip-card";
import Colors from "../../constants/Colors";

const FlashCard = () => {
    const router = useRouter();
  const { courseParams } = useLocalSearchParams();
  const course = JSON.parse(courseParams);
  const flashcard = course?.flashcards;
  const [currentPage, setCurrentPage] = useState(0);
  const width = Dimensions.get("screen").width;


  const onScoll=(event)=>{
    const index =Math.round(event?.nativeEvent?.contentOffset.x/width)
    setCurrentPage(index)
  }
  return (
    <View style={{
        backgroundColor:Colors.WHITE
    }}>
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
          width: "100%",
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
            <Ionicons name="arrow-back" size={30} color={"white"} onPress={()=>router.back()}/>
          </Pressable>
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 25,
              color: Colors.WHITE,
            }}
          >
            {currentPage + 1} of {flashcard?.length}
          </Text>
        </View>
        <FlatList
          data={flashcard}
          horizontal={true}
          onScroll={onScoll}
          pagingEnable
          
          renderItem={({ item, index }) => (
            <View
              key={index + 1}
              style={{
                height: 500,
                marginTop: 60,
                width: width * 0.9,
                backgroundColor: Colors.WHITE,
              }}
            >
              <FlipCard style={styles.flipCard}>
                <View style={styles.frontCard}>
                  <Text
                    style={{
                      fontFamily: "outfit-bold",
                      fontSize: 28,
                    }}
                  >
                    {item?.front}
                  </Text>
                </View>
                <View style={styles.backCard}>
                  <Text
                    style={{
                      width: width,
                      fontSize: 28,
                      padding:25,
                      textAlign: "center",
                      fontFamily: "outfit",
                      color: Colors.WHITE,
                    }}
                  >
                    {item?.back}
                  </Text>
                </View>
              </FlipCard>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default FlashCard;

const styles = StyleSheet.create({
  flipCard: {
    width: Dimensions.get("screen").width * 0.78,
    height: 400,
    backgroundColor: Colors.WHITE,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    marginHorizontal: Dimensions.get("screen").width * 0.05,
  },
  frontCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    borderRadius: 20,
  },
  backCard: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    backgroundColor: Colors.PRIMARY,
    borderRadius: 20,
  },
});
