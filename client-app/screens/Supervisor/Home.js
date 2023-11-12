import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";
import { useSelector } from "react-redux";
import ipconfig from "../../ipconfig";
const Home = () => {
  const ip = ipconfig.ip;
  const { SportComplexId } = useSelector((state) => state.user.User);
  const [detailsInstructor, setDetailsInstrutor] = useState([]);

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };
    fetch(
      `http://${ip}:9999/sportsComplexDetail?sportsComplex=${SportComplexId}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setDetailsInstrutor(result);
        // setLoading(true);
      })
      .catch((error) => console.log("error", error));
  }, []);
  //   data={[
  //     "Number of Atheltes",
  //     "Number of Facilities of Instructor",
  //     "Total Facility",
  //     "Sport Complex Details",
  //     "Number of Instructor",
  //     "Number of Present Athelte ", //(Perticular sport ma aatla Athelte)
  //   ]}
  return (
    <FlatList
      data={[
        { key: "Athlete Count", value: detailsInstructor.athleteCount },
        // {
        //   key: "Athlete Payment Count",
        //   value: detailsInstructor.athletePaymentCount[0].Paymentcount,
        // },
        {
          key: "Available Sports",
          value: detailsInstructor.availableSports.join(", "),
        },
        {
          key: "Instructor Data",
          value: detailsInstructor.instructerData.join(", "),
        },
      ]}
      renderItem={renderCategoryItem}
      numColumns={2}
      keyExtractor={(item) => item.key}
    />
  );
};

const renderCategoryItem = ({ item }) => {
  return (
    <View style={styles.gridItem}>
      <Pressable
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={() => {
          // Add navigation logic here based on the selected item
        }}
      >
        <View style={[styles.innerContainer, { backgroundColor: "orange" }]}>
          <Text style={styles.title}>
            {/* {item.key}: {detailsInstructor && detailsInstructor[item.value]} */}
            {item.key} : {item.value}
            {/* {item.key}: {value !== undefined ? value : "N/A"} */}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 16,
    height: 150,
    borderRadius: 8,
    elevation: 4,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  button: {
    flex: 1,
  },
  buttonPressed: {
    opacity: 0.5,
  },
  innerContainer: {
    flex: 1,
    padding: 16,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  imageBackground: {
    flex: 1, // This will make the ImageBackground take up the full parent view
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});