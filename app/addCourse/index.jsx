import { GoogleGenAI } from "@google/genai";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import Button from "../../components/Shared/Button";
import Colors from "../../constants/Colors";

const AddCourse = () => {

  const onGenerateTopic=()=>{

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
  apiKey:process.env.GEMINI_API_KEY
});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Explain how AI works in a few words",
  });
  console.log(response.text);
}

main();
  }
  return (
    <View
      style={{
        padding: 25,
        backgroundColor: Colors.WHITE,
        flex: 1,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 30,
        }}
      >
        Create New Course
      </Text>
      <Text style={{ fontFamily: "outfit", fontSize: 25 }}>
        What you want to learn today?
      </Text>
      <Text style={{ fontFamily: "outfit", fontSize: 20, marginTop: 7 }}>
        What course you want to create (ex.Learn Python,Digital Marketing,10TH
        Science Chapter, etc...)
      </Text>
      <TextInput placeholder="Ex.Learn Python,Digital Marketing,10TH Science Chapter, etc..." multiline={true} numberOfLines={3} style={styles.textInput}/>
      <Button text={"Generate Topic"} type={"outline"} onPress={()=>onGenerateTopic()}/>
    </View>
  );
};

export default AddCourse;

const styles = StyleSheet.create({
  textInput: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 15,
    height: 100,
    marginTop: 10,
    alignItems: "flex-start",
    fontSize: 20,
  },
});
