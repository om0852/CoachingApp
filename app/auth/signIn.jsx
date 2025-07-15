import { useRouter } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useContext, useState } from "react";
import {
    Image,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
} from "react-native";
import { auth, db } from "../../config/firebaseConfig";
import Colors from "../../constants/Colors";
import { UserDetailContext } from "../../context/userDetailContext";
export default function signIn() {
  const { userDetail,setUserDetail } = useContext(UserDetailContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const onSignIn=async()=>{
signInWithEmailAndPassword(auth,email,password).then(async(resp)=>{
    const user = resp.user;
    // console.log(user)
    await getUserDetail()
    ToastAndroid.show("Login Successfully",ToastAndroid.BOTTOM)

}).catch(e=>{
    console.log(e)
    ToastAndroid.show("Incorrect Email and Password",ToastAndroid.BOTTOM)
});
}

const getUserDetail = async()=>{
const result =  await getDoc(doc(db,'users',email));
setUserDetail(result.data())
}

  const router = useRouter();
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
        Welcome Back
      </Text>
      <TextInput
        onChangeText={setEmail}
        placeholder="Email"
        style={styles.textInput}
      />
      <TextInput
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry={true}
        style={styles.textInput}
      />
      <TouchableOpacity
      onPress={onSignIn}
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
          Sign In
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
          onPress={() => router.push("/auth/signUp")}
          style={{
            display: "flex",
            height: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text> Create a account? Sign Up Here</Text>
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
