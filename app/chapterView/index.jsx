import { useLocalSearchParams, useRouter } from "expo-router";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import * as Progress from "react-native-progress";
import Button from "../../components/Shared/Button";
import { db } from "../../config/firebaseConfig";
import Colors from "../../constants/Colors";
const ChapterView = () => {
  const router = useRouter();
  const { chapterParams, id, chapterIndex } = useLocalSearchParams();
  const chapters = JSON.parse(chapterParams);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const getProgress = (currentPage) => {
    const prec = currentPage / chapters?.content?.length;
    return prec;
  };

  const onChapterComplete = async () => {
    console.log(id, chapterIndex);
    setLoading(true);
    await updateDoc(doc(db, "Courses", id), {
      completedChapter: arrayUnion(chapterIndex),
    });
    setLoading(false);
    router.replace("/courseView/" + id);
  };
  return (
    <FlatList
      data={[]}
      ListHeaderComponent={
        <View
          style={{
            padding: 25,
            backgroundColor: Colors.WHITE,
            flex: 1,

          }}
        >
          <Progress.Bar
            progress={getProgress(currentPage)}
            width={Dimensions.get("screen").width * 0.85}
          />
          <View
            style={{
              marginTop: 20,
              marginBottom:20
            }}
          >
            <Text
              style={{
                fontFamily: "outfit-bold",
                fontSize: 25,
              }}
            >
              {chapters?.content[currentPage]?.topic}
            </Text>
            <Text
              style={{
                fontFamily: "outfit",
                fontSize: 20,
                marginTop: 7,
              }}
            >
              {chapters?.content[currentPage]?.explain}
            </Text>
            {chapters?.content[currentPage]?.code && (
              <Text
                style={[
                  styles.codeExample,
                  { backgroundColor: Colors.BLACK, color: Colors.WHITE },
                ]}
              >
                {chapters?.content[currentPage]?.code}
              </Text>
            )}
            {/* <Text>Example:</Text> */}
            <Text>{chapters?.content[currentPage]?.example}</Text>
          </View>
          <View
            style={{
              position: "absolute",
              bottom: 15,
              width: "100%",
              left: 25,
            }}
          >
            {chapters?.content?.length - 1 != currentPage ? (
              <Button
                text={"Next"}
                onPress={() => setCurrentPage((prev) => prev + 1)}
              />
            ) : (
              <Button
                text={"Finish"}
                onPress={() => onChapterComplete()}
                loading={loading}
              />
            )}
          </View>
        </View>
      }
    />
  );
};

export default ChapterView;

const styles = StyleSheet.create({
  codeExample: {
    padding: 15,
    backgroundColor: Colors.BG_GRAY,
    borderRadius: 15,
    fontFamily: "outfit",
    fontSize: 18,
    marginTop: 2,
  },
});
