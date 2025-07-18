import { Ionicons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { UserDetailContext } from "../../context/userDetailContext";

export default function Header() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        color: "white",
        position: "relative",
        zIndex: 5,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View>
        <Text
          style={{ fontFamily: "outfit-bold", fontSize: 25, color: "white" }}
        >
          Hello,{userDetail?.name}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 17,
            color: "white",
          }}
        >
          Let's Get Started
        </Text>
      </View>
      <TouchableOpacity>
        <Ionicons name="settings-outline" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({});
