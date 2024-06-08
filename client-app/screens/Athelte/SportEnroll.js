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
import RatingModal from "./RatingModal";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ipconfig from "../../ipconfig";
import { useSelector } from "react-redux";
const SportEnroll = () => {
  const Atheltedata = useSelector((state) => state.athelte.Athelte);
  // console.log(Atheltedata[0].payments[0].sports);
  const id = Atheltedata[0]._id;
  const [payments, setPayment] = useState([]);
  const [rateModal, setRateModal] = useState(false);
  const [rating, setrating] = useState("");
  const [sportid, setsportid] = useState("");
  const ip = ipconfig.ip;

  const ConvertMonthsToDays = ({ months, startdate }) => {
    const convertMonthsToDays = (months, startdate) => {
      // Get the current date

      const today = new Date();
      // Calculate future date based on months
      const futureDate = new Date(startdate);
      futureDate.setMonth(startdate.getMonth() + months);

      let timeDifference;
      // Calculate the difference in milliseconds
      if (startdate.getMilliseconds() - today.getMilliseconds() > 0) {
        timeDifference = futureDate - startdate;
      } else {
        timeDifference = futureDate - today;
      }
      // Convert milliseconds to days
      const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
      return days;
    };

    const remainingDays = convertMonthsToDays(months, startdate);

    return (
      <View>
        <Text>{`${remainingDays} days remaining.`}</Text>
      </View>
    );
  };
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${ip}/getPaymentDetailswithsportwithinstructor?athleteId=${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setPayment(result.data);
      })
      .catch((error) => console.log("error", error));
  }, []);

  const ratingcountHandler = (id) => {
    setrating(id);
    console.log(id);
  };
  const ratingHandler = (id) => {
    setsportid(id);
    setRateModal(!rateModal);
  };
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
            {rateModal && (
              <RatingModal
                sportid={sportid}
                sportcomplex={Atheltedata[0].createdBy.SportComplexId}
                athelteid={Atheltedata[0]._id}
                setrating={ratingcountHandler}
                rateModal={rateModal}
              ></RatingModal>
            )}
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
          {payments.map((item, index) => (
            <View style={styles.card} key={index}>
              <Pressable
                style={({ pressed }) => [
                  {
                    backgroundColor: pressed ? "#f8d7c9" : "#f2b69c",
                    padding: 20,
                    borderRadius: 10,
                  },
                ]}
                onPress={ratingHandler.bind(this, item.sports._id)}
              >
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
                  <Text style={styles.label}>Start Date :</Text>
                  <Text style={styles.input}>
                    {new Date(item.from).getDate() +
                      "/" +
                      (new Date(item.from).getMonth() + 1) +
                      "/" +
                      new Date(item.from).getFullYear()}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Duration:</Text>
                  <Text style={styles.input}>
                    <ConvertMonthsToDays
                      startdate={new Date(item.from)}
                      months={item.duration}
                    />
                    {/* {parseInt((new Date(item.from) - new Date()) / 86400000)} */}
                  </Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.label}>Time Slot : </Text>
                  <Text style={styles.input}>{item.timeSlot.from} </Text>
                  <Text style={styles.input}>to</Text>
                  <Text style={styles.input}>{item.timeSlot.to}</Text>
                </View>

                <View style={{ alignSelf: "flex-end", padding: 10 }}>
                  <Text style={{ color: "#0054a8" }}>Rate us</Text>
                </View>
              </Pressable>
            </View>
          ))}
        </ScrollView>
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
  scrollContainer: {
    flexGrow: 1,
    padding: 10,
  },
  card: {
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginHorizontal: 15,
    marginVertical: 10,
    backgroundColor: "#f2b69c",
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
