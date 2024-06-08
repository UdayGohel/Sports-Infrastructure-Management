import React, { useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Button,
  Image,
  Alert,
  DatePickerAndroid,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ScrollView } from "react-native-gesture-handler";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import mime from "mime";
import ipconfig from "../../ipconfig";
import Icon from "react-native-vector-icons/FontAwesome";

const SignUp = ({ navigation }) => {
  const ip = ipconfig.ip;

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
    Name: "",
    Email: "",
    ContactNum: "",
    emergencyNumber: "", //////
    DOB: new Date(),
    address: "",
    bloodGroup: "",
    healthIssue: "",
    disability: "",
    Password: "",
    photo: "",
    phototype: "",
  });

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const [errormsg, setErrormsg] = useState(null);

  const handleInput = (field, value) => {
    setFdata({
      ...fdata,
      [field]: value,
    });
  };
  const handleConfirm = (date) => {
    handleInput("DOB", date);
    hideDatePicker();
  };

  const handleSignUp = async () => {
    if (
      fdata.Name == "" ||
      fdata.Email == "" ||
      fdata.ContactNum == "" ||
      fdata.emergencyNumber == "" ||
      fdata.DOB == "" ||
      fdata.address == "" ||
      fdata.bloodGroup == "" ||
      fdata.Password == ""
    ) {
      setErrormsg("All fields are required !");
      return;
    }
    console.log(fdata);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let type = mime.getType(fdata.photo).split("/")[1];

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ ...fdata, photoType: type, Role: 0 }),
      redirect: "follow",
    };

    let res = await fetch(`${ip}/signup`, requestOptions);
    let data = await res.json();
    if (data.rcode == 200) {
      // let photoTo = fdata.photo.split("/");
      // photoTo.pop();
      // console.log(data.myPhotoName);
      // photoTo.push(data.myPhotoName);
      // photoTo = photoTo.join("/");
      // let move = await FileSystem.moveAsync({
      //   from: fdata.photo,
      //   to: photoTo,
      // });
      let response = await FileSystem.uploadAsync(
        `${ip}/uploadPhoto`,
        fdata.photo,
        {
          fieldName: "photo",
          httpMethod: "POST",
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        }
      );
      Alert.alert("Alert Title", "Account Created Successfully", [
        // {
        //     text: 'Cancel',
        //     onPress: () => console.log('Cancel Pressed'),
        //     style: 'cancel',
        // },
        { text: "OK", onPress: () => navigation.navigate("Login") },
      ]);
    }
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

  // const showDatePicker = async () => {
  //   try {
  //     const { action, year, month, day } = await DatePickerAndroid.open({
  //       date: fdata.DOB,
  //     });
  //     if (action !== DatePickerAndroid.dismissedAction) {
  //       const selectedDate = new Date(year, month, day);
  //       handleInput("DOB", selectedDate);
  //     }
  //   } catch ({ code, message }) {
  //     console.warn("Cannot open date picker", message);
  //   }
  // };

  return (
    <SafeAreaProvider>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.formContainer}>
            <Text style={styles.heading}>Sign Up</Text>
            <TextInput
              placeholder="Full Name"
              onChangeText={(text) => handleInput("Name", text)}
              onFocus={() => setErrormsg(null)}
              value={fdata.Name}
              style={styles.input}
            />

            <TextInput
              placeholder="Email"
              onChangeText={(text) => handleInput("Email", text)}
              onFocus={() => setErrormsg(null)}
              value={fdata.Email}
              style={styles.input}
            />
            <TextInput
              placeholder="Mobile Number"
              keyboardType="numeric"
              maxLength={10}
              onChangeText={(text) => handleInput("ContactNum", text)}
              onFocus={() => setErrormsg(null)}
              value={fdata.ContactNum}
              style={styles.input}
            />
            <TextInput
              placeholder="Emergency Number"
              keyboardType="numeric"
              maxLength={10}
              onChangeText={(text) => handleInput("emergencyNumber", text)}
              onFocus={() => setErrormsg(null)}
              value={fdata.emergencyNumber}
              style={styles.input}
            />

            {/* <View
              style={{
                flexDirection: "row",
                marginBottom: 10,
              }}
            >
              <TextInput
                placeholder="Select Date of Birth"
                value={fdata.DOB.toDateString()}
                style={{
                  width: "50%",
                  height: 40,
                  borderWidth: 1,
                  borderColor: "#ccc",
                  padding: 10,
                  borderRadius: 5,
                  marginRight:12
                }}
              />
              <Button
                title="Pick your DOB"
                onPress={showDatePicker}
                style={{
                  width: "40%",
                  height: 30,
                  borderWidth: 1,
                  marginRight: 10,
                  borderColor: "#ccc",
                  marginBottom: 15,
                  borderRadius: 5,
                }}
              />
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
            </View> */}

            <TouchableOpacity onPress={showDatePicker}>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
              />
              <View style={styles.dobContainer}>
                <TextInput
                  placeholder="Select Your BirthDate"
                  editable={false}
                  style={{ color: "black" }}
                  value={fdata.DOB.toDateString()}
                ></TextInput>
                <Icon
                  name="calendar"
                  size={24}
                  color="#3498db"
                  style={styles.calendaricon}
                />
              </View>
            </TouchableOpacity>

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
                selectedValue={fdata.bloodGroup}
                onValueChange={(itemValue, itemIndex) => {
                  handleInput("bloodGroup", itemValue);
                }}
                style={styles.input}
                placeholder="Select a Blood Group"
              >
                <Picker.Item label={"Select a Blood Group"} />
                {bloodgroups.map((bloodGroup, index) => (
                  <Picker.Item
                    label={bloodGroup}
                    value={bloodGroup}
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
              onChangeText={(text) => handleInput("healthIssue", text)}
              onFocus={() => setErrormsg(null)}
              value={fdata.healthIssue}
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
              onChangeText={(text) => handleInput("Password", text)}
              onFocus={() => setErrormsg(null)}
              value={fdata.Password}
              secureTextEntry
              style={styles.input}
            />

            {fdata.photo && (
              <Image source={{ uri: fdata.photo }} style={styles.photo} />
            )}
            <TouchableOpacity style={styles.button} onPress={pickImage}>
              <Text style={styles.buttonText}>Upload Photo</Text>
            </TouchableOpacity>

            {errormsg && <Text style={styles.errorText}>{errormsg}</Text>}
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
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
    // paddingVertical: 50,
    flexGrow: 1,
    backgroundColor: "#f0f0f0",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fbe8e8",
    paddingBottom: 20,
  },
  formContainer: {
    marginTop: 50,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: "88%",
  },
  heading: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: "center",
  },
  dobContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    height: 46,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
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
  button: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#f2b69c",
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    flex: 1,
    color: "black",
    width: "75%",
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
  },
});

export default SignUp;
