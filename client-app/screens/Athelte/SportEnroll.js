import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ipconfig from "../../ipconfig";
import { useSelector } from "react-redux";
const SportEnroll = () => {
  const Atheltedata = useSelector((state) => state.athelte.Athelte);
  const id = Atheltedata[0]._id;
  const [payments, setPayment] = useState([]);
  const ip = ipconfig.ip;
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `http://${ip}:9999/getPaymentDetailswithsportwithinstructor?athleteId=${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setPayment(result.data);
        console.log(result);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const navigate = useNavigation();
  return (
    <>
      <View style={styles.container}>
        <View style={styles.header}>
          <Pressable
            onPress={() => {
              navigate.goBack();
            }}
          >
            <View style={styles.back}>
              <Ionicons name="arrow-back" size={24} />
            </View>
          </Pressable>
          <View style={styles.heading}>
            <Text style={{ fontWeight: "bold", fontSize: 25 }}>
              Enrolled Sports List
            </Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View style={styles.card}>
            <Pressable
              style={({ pressed }) => [
                {
                  backgroundColor: pressed ? "#f0f0f0" : "white",
                  padding: 20,
                  borderRadius: 10,
                },
              ]}
            >
              {/* <View style={styles.card}> */}
              {payments.map((item, index) => (
                <View key={index}>
                  <View style={styles.row}>
                    <Text style={styles.label}>Sport Name:</Text>
                    <Text style={styles.input}>{item.sports.SportName}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.label}>Sport Category:</Text>
                    <Text style={styles.input}>{item.sports.Category}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.label}>Instructor:</Text>
                    <Text style={styles.input}>
                      {item.instructorId.userId.Name}
                    </Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.label}>From :</Text>
                    <Text style={styles.input}>{item.timeSlot.from}</Text>
                  </View>
                  <View style={styles.row}>
                    <Text style={styles.label}>To :</Text>
                    <Text style={styles.input}>{item.timeSlot.to}</Text>
                  </View>
                </View>
              ))}
              {/* </View> */}
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingVertical: 50,
    backgroundColor: "#f0f0f0",
  },
  header: {
    flexDirection: "row",
    marginBottom: 10,
    width: "100%",
    height: 50,
    backgroundColor: "#f0f0f0",
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
  scrollContainer: {
    flexGrow: 1,
    padding: 10,
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    fontSize: 17,
  },
  input: {
    marginLeft: 6,
  },
});

export default SportEnroll;