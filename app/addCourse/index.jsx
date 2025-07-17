import { GoogleGenAI } from "@google/genai";
import { useRouter } from "expo-router";
import { doc, setDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Button from "../../components/Shared/Button";
import { db } from "../../config/firebaseConfig";
import Colors from "../../constants/Colors";
import { default as prompt, default as Prompt } from "../../constants/Prompt";
import { UserDetailContext } from "../../context/userDetailContext";
const AddCourse = () => {
  const router = useRouter();
  const [userPhrase, setUserPhrase] = useState("");
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [topics, setTopics] = useState([]);

  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  const onTopicSelect = (topic) => {
    const isAlreadyExisting = selectedTopics.find((item) => item == topic);
    console.log(isAlreadyExisting, topic);
    if (!isAlreadyExisting) {
      setSelectedTopics((prev) => [...prev, topic]);
    } else {
      const topics = selectedTopics.filter((item) => item !== topic);

      setSelectedTopics(topics);
    }
  };
  const onGenerateTopic = async () => {
    if (!userPhrase.trim()) return;

    setLoading(true);
    setTopics("");

    try {
      const ai = new GoogleGenAI({
        apiKey: process.env.EXPO_PUBLIC_API_KEY, // ensure this works!
      });

      const fullPrompt = `${prompt.IDEA}\nUser topic: "${userPhrase}"`;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        contents: fullPrompt,
        config: { thinkingConfig: { thinkingBudget: -1 } },
      });
      const cleaned = response.text
        .replace(/^```json/, "") // remove ```json at the start
        .replace(/^```/, "") // or just ```
        .replace(/```$/, "") // remove ``` at the end
        .trim();

      setTopics(JSON.parse(cleaned));
      // console.log();
    } catch (e) {
      console.error(e);
      setTopics("Error generating content");
    } finally {
      setLoading(false);
    }
  };
  const generateCourse = async () => {
    setLoading(true);

    try {
      const ai = new GoogleGenAI({
        apiKey: process.env.EXPO_PUBLIC_API_KEY, // ensure this works!
      });

      const fullPrompt = selectedTopics + " " + Prompt.COURSE;
      // console.log(fullPrompt)
      const response = await ai.models.generateContent({
        model: "gemini-2.5-pro",
        contents: fullPrompt,
        config: { thinkingConfig: { thinkingBudget: -1 } },
      });
      // console.log(response.text);
      const cleaned = response.text
        .replace(/^```json/, "") // remove ```json at the start
        .replace(/^```/, "") // or just ```
        .replace(/```$/, "") // remove ``` at the end
        .trim();

      const courses = JSON.parse(cleaned);
      courses?.courses?.forEach(async (element) => {
        console.log(element);
        await setDoc(doc(db, "Courses", Date.now().toString()), {
          ...element,
          createdOn: Date.now(),
          createdBy: userDetail?.email,
          id: Date.now().toString(),
        });
      });
      router.push("/(tabs)/home");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    setLoading(false);
  };
  const isSelected = (topic) => {
    const selection = selectedTopics.find((item) => item == topic);
    return selection;
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <Text style={styles.header}>Create New Course</Text>
      <Text style={styles.subheader}>What you want to learn today?</Text>
      <Text style={styles.description}>
        What course you want to create (ex.Learn Python, Digital Marketing, 10TH
        Science Chapter, etc...)
      </Text>
      <TextInput
        placeholder="Enter course area e.g. Python dictionaries"
        style={styles.textInput}
        value={userPhrase}
        onChangeText={setUserPhrase}
      />
      <Button text="Generate Topics" type="outline" onPress={onGenerateTopic} />
      <View style={styles.resultContainer}>
        {loading && <ActivityIndicator size="large" color={Colors.PRIMARY} />}
        {!loading && topics.length > 0 && Array.isArray(topics) ? (
          <View style={styles.topicsWrapper}>
            <Text style={styles.selectTopicsText}>
              Select all topics which you want to add in the course
            </Text>
            {selectedTopics?.length > 0 && (
              <Button
                text={"Generate Course"}
                onPress={() => generateCourse()}
              />
            )}
            {topics.map((item, index) => (
              <Pressable
                onPress={() => onTopicSelect(item)}
                style={[
                  styles.topicItem,
                  isSelected(item) && styles.topicItemSelected,
                ]}
                key={index}
              >
                <Text
                  style={[
                    styles.topicItemText,
                    isSelected(item) && styles.topicItemTextSelected,
                  ]}
                >
                  {item}
                  {isSelected(item) ? " ✓" : ""}
                </Text>
              </Pressable>
            ))}
          </View>
        ) : null}
      </View>

      <View style={{ height: 50 }}></View>
    </ScrollView>
  );
};

export default AddCourse;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 24,
    marginBottom: 25,
    paddingTop: 40,
  },
  header: {
    fontFamily: "outfit-bold",
    fontSize: 30,
    color: Colors.PRIMARY,
    marginBottom: 8,
    textAlign: "left",
  },
  subheader: {
    fontFamily: "outfit",
    fontSize: 25,
    color: Colors.DARK,
    marginBottom: 6,
    textAlign: "left",
  },
  description: {
    fontFamily: "outfit",
    fontSize: 18,
    color: Colors.GRAY,
    marginTop: 7,
    marginBottom: 12,
    textAlign: "left",
  },
  textInput: {
    padding: 15,
    borderWidth: 1,
    borderColor: Colors.LIGHT_GRAY || "#ccc",
    borderRadius: 15,
    height: 100,
    marginTop: 10,
    marginBottom: 16,
    fontSize: 20,
    fontFamily: "outfit",
    backgroundColor: "#fafafa",
    textAlignVertical: "top",
  },
  resultContainer: {
    marginTop: 24,
    minHeight: 100,
  },
  topicsWrapper: {
    marginTop: 15,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  selectTopicsText: {
    fontFamily: "outfit",
    fontSize: 20,
    marginBottom: 10,
    color: Colors.DARK,
  },
  topicItem: {
    marginBottom: 8,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: Colors.PRIMARY,
    backgroundColor: "#eaf1fb",
    alignSelf: "flex-start",
    marginRight: 8,
    marginTop: 4,
    minWidth: 60,
    minHeight: 36,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 2,
    elevation: 1,
  },
  topicItemSelected: {
    backgroundColor: Colors.PRIMARY,
    borderColor: Colors.PRIMARY,
  },
  topicItemText: {
    fontFamily: "outfit",
    fontSize: 17,
    color: Colors.PRIMARY,
    textAlign: "center",
  },
  topicItemTextSelected: {
    color: Colors.WHITE,
    fontWeight: "bold",
  },
});
