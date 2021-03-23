import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions, Button } from "react-native";
import Input from "../../Shared/Form/Input";
import Error from "../../Shared/Error";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";
import Toast from "react-native-toast-message";

var { width } = Dimensions.get("window");

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPasssword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [name, setName] = useState("");

  //HandleSubmit

  const handleRegister = () => {
    if (email === "" || password === "" || phone === "" || name === "") {
      setError("Please fill in you credentials");
    } else {
      setError("");
      
    }

    let user = {
      name: name,
      email: email,
      password,
      phone,
      isAdmin: false,
    };

    axios
      .post("http://192.168.0.13:3005/api/v1/users/register", user)
      .then((res) => {
        if (res.status == 200) {
          Toast.show({
            topOffset: 60,
            type: "success",
            text1: "Registration Successfull",
            text2: "Please Login into your account",
          });

          setTimeout(() => {
            props.navigation.navigate("Login");
          }, 100);
        }
      })
      .catch((error) => {
        Toast.show({
          topOffset: 60,
          type: "Invalid",
          text1: "Registration Error",
          text2: "Please check the error",
          text3: `${error}`,
        });
      });
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTabBar={true}
      extraHeight={200}
      enableOnAndroid={true}
    >
      <Text style={styles.title}> Register </Text>
      <Input
        placeholder={"Enter Email"}
        name={"email"}
        id={"email"}
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
      />
      <Input
        placeholder={"Enter Name"}
        name={"name"}
        id={"name"}
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <Input
        placeholder={"Enter Phone Number"}
        name={"phone"}
        id={"phone"}
        value={phone}
        keyboardType={"numeric"}
        onChangeText={(text) => setPhone(text)}
      />
      <Input
        placeholder={"Enter Password"}
        name={"password"}
        id={"password"}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPasssword(text)}
      />

      <View style={{ width: "80%", alignItems: "center", textAlign: "center" }}>
        {error ? <Error message={error} /> : null}
        <Button title="Register" onPress={() => handleRegister()} />
      </View>
      <View
        style={{
          width: "80%",
          alignItems: "center",
          textAlign: "center",
          marginTop: 60,
        }}
      >
        <Button
          title={"Back to Login"}
          onPress={() => props.navigation.navigate("Login")}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    marginTop: 30,
    width: width,
    justifyContent: "center",
    alignContent: "center",
    fontSize: 30,
    marginBottom: 5,
  },
  inactive: {
    backgroundColor: "#a0e1eb",
  },
});

export default Register;
