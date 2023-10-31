import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
  DatePickerAndroid,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ScrollView } from "react-native-gesture-handler";

const SignUp = ({ navigation }) => {
  const bloodgroups = [
    "A Positive",
    "A Negative",
    "A Unknown",
    "B Positive",
    "B Negative",
    "B Unknown",
    "AB Positive",
    "AB Negative",
    "AB Unknown",
    "O Positive",
    "O Negative",
    "O Unknown",
    "Unknown",
  ];
  const [fdata, setFdata] = useState({
    fullname: "",
    email: "",
    phone: "",
    ephone: "",
    dateOfBirth: new Date(),
    address: "",
    bloodgroup: "",
    healthissue: "",
    disability: "",
    password: "",
    photo: "",
    phototype: "",
  });

  const [errormsg, setErrormsg] = useState(null);

  const handleInput = (field, value) => {
    setFdata({
      ...fdata,
      [field]: value,
    });
  };

  const handleSignUp = async () => {
    if (
      fdata.fullname == "" ||
      fdata.email == "" ||
      fdata.phone == "" ||
      fdata.ephone == "" ||
      fdata.dateOfBirth == "" ||
      fdata.address == "" ||
      fdata.bloodgroup == "" ||
      fdata.password == ""
    ) {
      setErrormsg("All fields are required !");
      return;
    }
    console.log(fdata);
    // var formdata = new FormData();
    // formdata.append("photo", {
    //   uri: fdata.photo,
    //   type: fdata.phototype,
    //   name: fdata.username,
    // });
    // formdata.append("password", fdata.password);
    // formdata.append("fullname", fdata.fullname);
    // formdata.append("email", fdata.email);
    // formdata.append("address", fdata.address);
    // formdata.append("district", fdata.district);
    // formdata.append("phone", fdata.phone);
    // formdata.append("dateOfBirth", fdata.dateOfBirth);

    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "multipart/form-data");

    // var requestOptions = {
    //   method: "POST",
    //   headers: myHeaders,
    //   body: formdata,
    //   // redirect: 'follow'
    // };

    // let res = await fetch(
    //   `http://${globals.ip}:3000/worker/workerSignup`,
    //   requestOptions
    // );
    // let data = await res.json();
    // console.log(data);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setFdata({
        ...fdata,
        photo: result.uri,
        phototype: result.type,
      });
    }
    console.log(result);
  };

  const navigateToLogin = () => {
    navigation.navigate("Login");
  };

  const showDatePicker = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: fdata.dateOfBirth,
      });
      if (action !== DatePickerAndroid.dismissedAction) {
        const selectedDate = new Date(year, month, day);
        handleInput("dateOfBirth", selectedDate);
      }
    } catch ({ code, message }) {
      console.warn("Cannot open date picker", message);
    }
  };

  return (
    <SafeAreaProvider>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Text style={styles.heading}>Sign Up</Text>
            <TextInput
              placeholder="Full Name"
              onChangeText={(text) => handleInput("fullname", text)}
              onFocus={() => setErrormsg(null)}
              value={fdata.fullName}
              style={styles.input}
            />

            <TextInput
              placeholder="Email"
              onChangeText={(text) => handleInput("email", text)}
              onFocus={() => setErrormsg(null)}
              value={fdata.email}
              style={styles.input}
            />
            <TextInput
              placeholder="Mobile Number"
              keyboardType="numeric"
              maxLength={10}
              onChangeText={(text) => handleInput("phone", text)}
              onFocus={() => setErrormsg(null)}
              value={fdata.phone}
              style={styles.input}
            />
            <TextInput
              placeholder="Emergency Number"
              keyboardType="numeric"
              maxLength={10}
              onChangeText={(text) => handleInput("ephone", text)}
              onFocus={() => setErrormsg(null)}
              value={fdata.ephone}
              style={styles.input}
            />

            {/* <Button
            onPress={() => {
              DateTimePickerAndroid.open({
                value: fdata.dateOfBirth,
                onChange: (event, selectedDate) => {
                  handleInput("dateOfBirth", selectedDate);
                },
                mode: "date",
              });
            }}
            title="Set Date"
          /> */}
            {/* <TouchableOpacity
            onPress={() => {
              showDatePicker();
            }}
          >
            <TextInput
              placeholder="Select Date of Birth"
              value={fdata.dateOfBirth.toDateString()}
              style={styles.input}
            />
          </TouchableOpacity> */}

            <TextInput
              placeholder="Address"
              multiline={true}
              numberOfLines={4}
              style={{
                height: 100,
                textAlignVertical: "top",
                width: "100%",
                borderWidth: 1,
                borderColor: "#ccc",
                marginBottom: 15,
                padding: 10,
                borderRadius: 5,
              }}
              onChangeText={(text) => handleInput("address", text)}
              onFocus={() => setErrormsg(null)}
              value={fdata.address}
            />
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={fdata.bloodgroup}
                onValueChange={(itemValue, itemIndex) => {
                  handleInput("bloodgroup", itemValue);
                }}
                style={styles.input}
                placeholder="Select a Blood Group"
              >
                <Picker.Item label={"Select a Blood Group"} />
                {bloodgroups.map((bloodgroup, index) => (
                  <Picker.Item
                    label={bloodgroup}
                    value={bloodgroup}
                    key={index}
                  />
                ))}
              </Picker>
            </View>
            <TextInput
              placeholder="Health Issues if any"
              multiline={true}
              numberOfLines={4}
              style={{
                height: 100,
                textAlignVertical: "top",
                width: "100%",
                borderWidth: 1,
                borderColor: "#ccc",
                marginBottom: 15,
                padding: 10,
                borderRadius: 5,
              }}
              onChangeText={(text) => handleInput("healthissue", text)}
              onFocus={() => setErrormsg(null)}
              value={fdata.healthissue}
            />
            <TextInput
              placeholder="Disability in %"
              keyboardType="numeric"
              maxLength={3}
              onChangeText={(text) => handleInput("disability", text)}
              onFocus={() => setErrormsg(null)}
              value={fdata.disability}
              style={styles.input}
            />
            <TextInput
              placeholder="Password"
              onChangeText={(text) => handleInput("password", text)}
              onFocus={() => setErrormsg(null)}
              value={fdata.password}
              secureTextEntry
              style={styles.input}
            />

            {fdata.photo && (
              <Image source={{ uri: fdata.photo }} style={styles.photo} />
            )}
            <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
              <Text style={styles.buttonText}>Upload Photo</Text>
            </TouchableOpacity>

            {errormsg && <Text style={styles.errorText}>{errormsg}</Text>}
            <TouchableOpacity
              style={styles.signupButton}
              onPress={handleSignUp}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <TouchableOpacity onPress={navigateToLogin}>
              <Text style={styles.loginLink}>Log In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingVertical: 50,
    flexGrow: 1,
    backgroundColor: "#f0f0f0",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  formContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: "80%",
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 15,
  },
  photo: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  signupButton: {
    backgroundColor: "green",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  loginContainer: {
    marginTop: 20,
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
  errorText: {
    color: "red",
    fontSize: 16,
    marginTop: 10,
    textAlign: "center",
  },
  uploadButton: {
    backgroundColor: "#3498db",
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});

export default SignUp;
