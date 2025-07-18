import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import Colors from "../../constants/Colors";
import { PraticeOption } from "../../constants/Option";

const PracticeSection = () => {
  const router = useRouter();
  return (
    <View
      style={{
        marginTop: 10,
        position: "relative",
        zIndex: 5,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 25,
        }}
      >
        Practice
      </Text>
      <View>
        <FlatList
          data={PraticeOption}
          numColumns={3}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={{
                flex: 1,
                margin: 5,
                aspectRatio: 1,
              }}
              onPress={() => router.push("/practice/" + item.name)}
            >
              <Image
                source={item?.image}
                style={{
                  width: "100%",
                  height: "100%",
                  maxHeight: 160,
                  borderRadius: 15,
                }}
              />
              <Text
                style={{
                  position: "absolute",
                  padding: 15,
                  fontFamily: "outfit",
                  fontSize: 14,
                  color: Colors.WHITE,
                }}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default PracticeSection;
