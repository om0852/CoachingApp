import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { auth } from "../../config/firebaseConfig";
import Colors from "../../constants/Colors";
import { UserDetailContext } from "../../context/userDetailContext";

const Profile = () => {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const menu = [
    {
      title: "Add Course",
      link: "/addCourse",
      icon: "add-circle-outline",
    },
    {
      title: "My Course",
      link: "/home",
      icon: "book-outline",
    },
    {
      title: "Course Progress",
      link: "/progress",
      icon: "bar-chart-outline",
    },
    {
      title: "Logout",
      link: "/",
      icon: "log-out-outline",
    },
  ];
  const router = useRouter();
  const onMenuClick = (item) => {
    if (item.title == "Logout") {
      signOut(auth).then(() => {
        setUserDetail(null);
        router.push("/");
      });
    } else {
      router.push(item.link);
    }
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.WHITE,
        padding: 30,
      }}
    >
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 30,
        }}
      >
        Profile
      </Text>

      <View
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../assets/images/icon.png")}
          style={{
            width: 200,
            height: 200,
          }}
        />
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 25,
          }}
        >
          {userDetail.name}
        </Text>
        <Text
          style={{
            fontFamily: "outfit",
            fontSize: 20,
            color: Colors.GRAY,
          }}
        >
          {userDetail.email}
        </Text>
        <View
          style={{
            display: "flex",
            gap: 10,
            marginTop: 20,
          }}
        >
          {menu.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: 300,
                padding: 20,
                height: 80,
                borderWidth: 0.5,
                borderRadius: 5,
                gap: 30,
              }}
              onPress={() => onMenuClick(item)}
            >
              <Ionicons name={item.icon} size={44} color={Colors.PRIMARY} />
              <Text
                style={{
                  fontFamily: "outfit-bold",
                  fontSize: 20,
                }}
              >
                {item.title}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

export default Profile;
