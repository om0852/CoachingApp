import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

const Index = () => {
  const router = useRouter()

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
            fontFamily:"outfit-bold"
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
            fontFamily:"outfit"
          }}
        >
          Tranform Your Ideas into engaging eductional content effortlessly with
          us
        </Text>
        <TouchableOpacity style={styles.button} onPress={()=>{router.push('/auth/signUp')}}>
          <Text style={[styles.buttonText,{color:Colors.PRIMARY}]}>Get Started</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>router.push("/auth/signIn")} style={[styles.button,{backgroundColor:Colors.PRIMARY,borderWidth:1,borderColor:Colors.WHITE}]}>
          <Text style={[styles.buttonText,{color:Colors.WHITE}]}>Already have an Account ?</Text>
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
    fontFamily:"outfit"
  },
});
