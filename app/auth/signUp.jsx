import { useRouter } from "expo-router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, db } from "../../config/firebaseConfig";
import Colors from "../../constants/Colors";
import { UserDetailContext } from "../../context/userDetailContext";
export default function signUp() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const CreateNewAcccount = async () => {
    const {userDetail} =useContext(UserDetailContext)

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (resp) => {
        const user = resp.user;
        console.log(user);
        await SaveUser(user);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const SaveUser = async (user) => {
    let data = {
      name: fullName,
      email: email,
      member: false,
      uid: user?.uid,
    }
    await setDoc(doc(db, "users", email),data);
    setUserDetail(data)
//navigate to new screen

  };
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        paddingTop: 100,
        paddingLeft: 20,
        paddingRight: 20,
        flex: 1,
        backgroundColor: Colors.WHITE,
      }}
    >
      <Image
        source={require("./../../assets/images/logo.png")}
        style={{
          width: 180,
          height: 180,
        }}
      />
      <Text
        style={{
          fontSize: 30,
          fontFamily: "outfit-bold",
        }}
      >
        Create New Account
      </Text>
      <TextInput
        placeholder="Full Name"
        onChangeText={setFullName}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Email"
        onChangeText={setEmail}
        style={styles.textInput}
      />
      <TextInput
        placeholder="Password"
        onChangeText={setPassword}
        secureTextEntry={true}
        style={styles.textInput}
      />
      <TouchableOpacity
        onPress={() => CreateNewAcccount()}
        style={{
          width: "100%",
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          marginTop: 25,
          borderRadius: 10,
        }}
      >
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 20,
            color: Colors.WHITE,
            textAlign: "center",
          }}
        >
          Create Account
        </Text>
      </TouchableOpacity>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
          marginTop: 20,
        }}
      >
        <Pressable
          onPress={() => router.push("/auth/signIn")}
          style={{
            display: "flex",
            height: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text> Already have an account? Sign In Here</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    width: "100%",
    padding: 15,
    fontSize: 18,
    marginTop: 20,
    borderRadius: 8,
  },
});
