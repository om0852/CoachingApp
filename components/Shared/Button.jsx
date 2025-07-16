import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import Colors from "../../constants/Colors";

const Button = ({ text, type, onPress, loading }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        padding: 15,
        width: "100%",
        borderRadius: 15,
        marginTop: 15,
        borderWidth: 1,
        borderColor: Colors.PRIMARY,
        backgroundColor: type == "fill" ? Colors.PRIMARY : Colors.WHITE,
      }}
      disabled={loading}
    >
      {!loading ? (
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            color: type == "fill" ? Colors.WHITE : Colors.PRIMARY,
          }}
        >
          {text}
        </Text>
      ) : (
        <ActivityIndicator
          size={"large"}
          color={type == "fill" ? Colors.WHITE : Colors.PRIMARY}
        />
      )}
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({});
