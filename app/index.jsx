import Colors from "@/constants/Colors";
import { UserDetailContext } from "@/context/userDetailContext";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { auth, db } from "../config/firebaseConfig";
const Index = () => {
  const router = useRouter();
  const { setUserDetail } = useContext(UserDetailContext);
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log(user.email);
        const result = await getDoc(doc(db, "users", user.email));
        console.log(result.data());
        setUserDetail(result.data());
        router.replace("/(tabs)/home");
      }
    });
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: Colors.WHITE }}>
      <Image
        style={{
          width: "100%",
          height: 300,
          marginTop: 70,
        }}
        source={require("../assets/images/landing.png")}
      />
      <View
        style={{
          padding: 25,
          backgroundColor: Colors.PRIMARY,
          height: "100%",
          borderTopLeftRadius: 35,
          borderTopRightRadius: 35,
        }}
      >
        <Text
          style={{
            fontSize: 35,
            textAlign: "center",
            color: Colors.WHITE,
            fontFamily: "outfit-bold",
          }}
        >
          Welcome to Coaching Guru
        </Text>
        <Text
          style={{
            fontSize: 20,
            color: Colors.WHITE,
            textAlign: "center",
            marginTop: 20,
            fontFamily: "outfit",
          }}
        >
          Tranform Your Ideas into engaging eductional content effortlessly with
          us
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.push("/auth/signUp");
          }}
        >
          <Text style={[styles.buttonText, { color: Colors.PRIMARY }]}>
            Get Started
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => router.push("/auth/signIn")}
          style={[
            styles.button,
            {
              backgroundColor: Colors.PRIMARY,
              borderWidth: 1,
              borderColor: Colors.WHITE,
            },
          ]}
        >
          <Text style={[styles.buttonText, { color: Colors.WHITE }]}>
            Already have an Account ?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Index;

const styles = StyleSheet.create({
  button: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    marginTop: 20,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 18,
    fontFamily: "outfit",
  },
});
