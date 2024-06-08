import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Button,
  TouchableOpacity,
  ScrollView,
  Pressable,
  Dimensions,
} from "react-native";
import React, { useEffect } from "react";
const { height: screenHeight } = Dimensions.get("window");
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useSelector } from "react-redux";
import ipconfig from "../../ipconfig";
import { useNavigation } from "@react-navigation/native";
import CheckBox from "react-native-check-box";
const AthleteResponse = ({ route }) => {
  const navigation = useNavigation();
  const ip = ipconfig.ip;
  const [payments, setPayment] = useState([]);

  const Athelte = useSelector((state) => state.athelte.Athelte);

  const [value, onChangeText] = React.useState("");

  const [selectedSportParameters, setSelectedSportParameters] = useState({});
  const [selectedSports, setSelectedSports] = useState([]);
  const [selectedInstructorId, setSelectedInstructorId] = useState({});

  const handleParameterChange = (sportId, parameter, text) => {
    setSelectedSportParameters((prevState) => ({
      ...prevState,
      [sportId]: {
        ...prevState[sportId],
        [parameter]: parseInt(text),
      },
    }));
  };
  const handleSportSelection = (sportId, sportName, instructorId) => {
    const newSelectedSports = [...selectedSports];
    const index = newSelectedSports.indexOf(sportId);
    if (index === -1) {
      newSelectedSports.push(sportId);
    } else {
      newSelectedSports.splice(index, 1);
    }
    setSelectedSports(newSelectedSports);

    // Clear selected parameters when unchecking a sport
    if (index !== -1) {
      setSelectedSportParameters((prevState) => {
        const newState = { ...prevState };
        delete newState[sportId];
        return newState;
      });
    }

    setSelectedInstructorId((prevInstructors) => ({
      ...prevInstructors,
      [sportId]: instructorId,
    }));
  };

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${ip}/getPaymentDetailswithsportwithinstructor?athleteId=${Athelte[0]._id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setPayment(result.data);
        // console.log(result.data);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const submitHandler = () => {
    const { userId, SportComplexId, enrollid } = route.params.data;

    const formattedData = selectedSports.map((sportId) => {
      const parameters =
        selectedSportParameters[sportId] &&
        Object.keys(selectedSportParameters[sportId]).map((parameter) => ({
          parameter,
          value: selectedSportParameters[sportId][parameter],
        }));

      return {
        instructorId: selectedInstructorId[sportId],
        sportId,
        parameters: parameters || [],
      };
    });

    //patch query of session table to add sports array
    console.log(selectedSports);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      sport: selectedSports,
    });

    var requestOptions = {
      method: "PATCH",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(
      `${ip}/updateSportsInSession?_id=${enrollid}&sportscomplex=${SportComplexId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("done" + result);
      })
      .catch((error) => console.log("error", error));

    // console.log(formattedData);
    for (let index = 0; index < formattedData.length; index++) {
      const element = formattedData[index];
      console.log(element);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({
        sportId: element.sportId,
        athleteId: Athelte[0]._id,
        sportComplexId: Athelte[0].createdBy.SportComplexId,
        // remarks: value,
        parameters: element.parameters,
        instructorId: element.instructorId,
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow",
      };

      fetch(`${ip}/remarkRatingByAthlete`, requestOptions)
        .then((response) => response.text())
        .then((result) => {})
        .catch((error) => console.log("error", error));
    }

    navigation.goBack();

    // formattedData.forEach((item) => {
    //   console.log("Sport ID:", item.sportId);
    //   console.log("Parameters:");

    //   item.parameters.forEach((parameter) => {
    //     console.log("Parameter:", parameter.parameter);
    //     console.log("Value:", parameter.value);
    //   });
    // });
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
          >
            <View style={styles.back}>
              <Ionicons name="arrow-back" size={24} />
            </View>
          </Pressable>
          <View style={styles.heading}>
            <Text style={{ fontWeight: "bold", fontSize: 25 }}>
              Athlete Response
            </Text>
          </View>
        </View>
        <View
          style={{
            paddingLeft: 10,
            height: screenHeight * 0.75,
            width: "94%",
            marginLeft: "2%",
          }}
        >
          <ScrollView>
            {payments.map((item, index) => (
              <View
                key={index}
                style={{
                  marginVertical: 10,
                  borderWidth: 1,
                  borderBottomWidth: 3,
                  borderRadius: 10,
                  padding: "2%",
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <CheckBox
                    isChecked={selectedSports.includes(item.sports._id)}
                    onClick={() =>
                      handleSportSelection(
                        item.sports._id,
                        item.sports.SportName,
                        item.instructorId.userId._id
                      )
                    }
                    checkBoxColor="blue" // Set your desired checkbox color
                  />
                  <Text style={{ fontSize: 17, fontWeight: "bold" }}>
                    {item.sports.SportName}
                  </Text>
                </View>
                {selectedSports.includes(item.sports._id) && (
                  <View>
                    {item.sports.parameters.map((parameter, parameterIndex) => (
                      <View key={parameterIndex}>
                        <Text style={{ fontSize: 17 }}>{parameter}</Text>
                        <TextInput
                          keyboardType="numeric"
                          style={{
                            height: 40,
                            borderColor: "black",
                            borderWidth: 2,
                            borderRadius: 5,
                          }}
                          placeholder="   Enter a value"
                          value={
                            selectedSportParameters[item.sports._id] &&
                            selectedSportParameters[item.sports._id][parameter]
                              ? selectedSportParameters[item.sports._id][
                                  parameter
                                ].toString()
                              : ""
                          }
                          onChangeText={(text) =>
                            handleParameterChange(
                              item.sports._id,
                              parameter,
                              text
                            )
                          }
                        />
                      </View>
                    ))}
                  </View>
                )}
              </View>
            ))}
          </ScrollView>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={submitHandler}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbe8e0",
    paddingTop: "7%",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    width: "90%",
    paddingLeft: "5%",
    height: 50,
    backgroundColor: "#fbe8e0",
  },
  back: {
    marginHorizontal: 4,
    alignSelf: "center",
  },
  heading: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },
  photo: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  loginButton: {
    marginBottom: 10,
    height: 50,
    backgroundColor: "#f2b69c",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 20,
    width: 100,
    alignSelf: "center",
    fontWeight: "bold",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  uploadButton: {
    width: "40%",
    alignSelf: "center",
    backgroundColor: "#3498db",
    padding: "2%",
    borderRadius: 5,
    alignItems: "center",
    marginTop: "2%",
  },
  scrollContainer: {
    // flexGrow: 1,
    width: "90%",
    padding: 10,
    borderWidth: 1,
  },

  card: {
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginHorizontal: 15,
    marginVertical: 10,
  },
  inline: {
    flexDirection: "row",
    alignItems: "center",
  },
  picker: {
    marginVertical: 30,
    width: "90%",
    alignSelf: "center",
    paddingVertical: 15,
    width: "90%",
    marginTop: "3%",
    // backgroundColor: "#f8d7c9",
    backgroundColor: "#f2b69c",
  },
  label: {
    fontWeight: "bold",
    fontSize: 17,
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
  multiline: {
    alignSelf: "center",
    width: "90%",
    backgroundColor: "white",
    borderRadius: 5,
    height: 200,
  },
});

export default AthleteResponse;
