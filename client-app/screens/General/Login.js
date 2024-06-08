import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserActions } from "../../store/User";
import { useDispatch, useSelector } from "react-redux";
import ipconfig from "../../ipconfig";
const Login = ({ navigation }) => {
  const ip = ipconfig.ip;
  const notificationtoken = useSelector((s) => s.notificationtoken.token);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const setLoginData = async (value) => {
    await AsyncStorage.setItem("token", value);
  };

  const handleLogin = () => {
    console.log(notificationtoken);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      Email: email,
      Password: password,
      notificationtoken: notificationtoken,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${ip}/login`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.rcode === 200) {
          setLoginData(result.token);
          dispatch(UserActions.getuserRole(result.data));
        } else {
          alert("Invalid Cradential !! ");
        }
        setPassword("");
        setEmail("");
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <View style={styles.container}>
      <Image
        style={{ width: 150, height: 150, marginBottom: 20 }}
        source={require("../../assets/Logo.png")}
      />
      <View style={styles.loginBox}>
        <Text style={styles.title}>Sports Authority of Gujarat</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={setEmail}
          value={email}
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Create new account?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SignUp");
            }}
          >
            <Text style={styles.loginLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fbe8e8",
  },
  loginBox: {
    paddingVertical: "8%",
    paddingHorizontal: "6%",
    borderRadius: 8,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },

  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    color: "black",
    height: 50,
    marginVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: "white",
  },
  button: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    width: "90%",
    backgroundColor: "#f2b69c",
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    flex: 1,
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  loginContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  loginText: {
    fontSize: 16,
    marginRight: 5,
  },
  loginLink: {
    fontSize: 16,
    fontWeight: "bold",
    color: "blue",
  },
});

export default Login;
