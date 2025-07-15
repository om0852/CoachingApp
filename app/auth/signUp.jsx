import { useRouter } from "expo-router";
import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../constants/Colors";
export default function signUp() {
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
        Create New Account
      </Text>
      <TextInput placeholder="Full Name" style={styles.textInput} />
      <TextInput placeholder="Email" style={styles.textInput} />
      <TextInput
        placeholder="Password"
        secureTextEntry={true}
        style={styles.textInput}
      />
      <TouchableOpacity
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
