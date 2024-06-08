import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  Pressable,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";

import ipconfig from "../../ipconfig";
import {
  Ionicons,
  Feather,
  Entypo,
  MaterialIcons,
  FontAwesome,
  Fontisto,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { useEffect, useState, useRef } from "react";
import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import { useSelector } from "react-redux";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";
import bronze from "./../../assets/badges/bronze.png";
import silver from "./../../assets/badges/silver.png";
import gold from "./../../assets/badges/gold.png";
import platinum from "./../../assets/badges/platinum.png";
import diamond from "./../../assets/badges/diamond.png";
import crown from "./../../assets/badges/crown.png";

const badge = (points) => {
  if (points < 250) return bronze;
  if (points >= 250 && points < 500) return silver;
  if (points >= 500 && points < 750) return gold;
  if (points >= 750 && points < 1000) return platinum;
  if (points >= 1000 && points < 1250) return diamond;
  else return crown;
};
const badgename = (points) => {
  if (points < 250) return "Bronze";
  if (points >= 250 && points < 500) return "Silver";
  if (points >= 500 && points < 750) return "Gold";
  if (points >= 750 && points < 1000) return "Platinum";
  if (points >= 1000 && points < 1250) return "Diamond";
  else return "Crown";
};

const BadgePerformance = () => {
  const navigation = useNavigation();
  const ip = ipconfig.ip;
  const Userdata = useSelector((state) => state.user.User);
  const Atheltedata = useSelector((state) => state.athelte.Athelte);
  const [data, setdata] = useState([]);
  const [userData, setUserData] = useState({});
  const [sportid, setsportid] = useState();
  const [loading, setLoading] = useState(true);
  const [sportpoints, setsportponits] = useState();
  const leaderboardRef = useRef();
  const handleCapture = async () => {
    try {
      const uri = await captureRef(leaderboardRef, {
        format: "png",
        quality: 0.8,
      });
      await Sharing.shareAsync(uri, {
        mimeType: "image/png",
        dialogTitle: "Share Leaderboard",
      });
    } catch (error) {
      console.error("Error capturing screenshot:", error);
    }
  };
  const OnclickHandler = (e) => {
    console.log(e);
    setsportponits(e.rating);
    setsportid(e);
  };

  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${ip}/getAthletesWithAllSportsRating?athleteid=${Atheltedata[0]._id}&userid=${Userdata._id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setUserData(result.atheltedata);
        setdata(result.data);
        setsportponits(result.points);
      })
      .catch((error) => console.log("error", error))
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }
  function calculateAge(dateOfBirth) {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    // If the birthdate for the current year hasn't occurred yet, subtract one year
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }
  return (
    <View style={styles.container} ref={leaderboardRef}>
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
          <Text style={{ fontWeight: "bold", fontSize: 25 }}>Performance</Text>
        </View>
        <View>
          <TouchableOpacity onPress={handleCapture}>
            <MaterialIcons
              style={{ marginRight: "2%", marginTop: "20%" }}
              name="share"
              size={24}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.feedHeader}>
        <Text style={styles.feedHeaderText}>Sports</Text>
      </View>
      <View
        style={{
          width: "94%",
          marginLeft: "3%",
          borderWidth: 1,
          borderRadius: 5,
          borderBottomWidth: 3,
          padding: 4,
        }}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.questionNoBar}
        >
          <View style={styles.buttonContainer}>
            {data.map((item, index) => (
              <TouchableOpacity
                style={styles.button}
                key={index}
                onPress={OnclickHandler.bind(this, item)}
              >
                {/* <Ionicons
                  style={{ alignSelf: "center" }}
                  name="football-outline"
                  size={24}
                /> */}
                <MaterialCommunityIcons
                  style={{ alignSelf: "center" }}
                  name={item.sports.SportName.toLowerCase()}
                  size={24}
                />
                <Text style={styles.buttonText}>{item.sports.SportName}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
      <View style={styles.card}>
        <View style={styles.topLeft}>
          <Text style={styles.lable}>Age</Text>
          <Text style={styles.input}>{calculateAge(Userdata.DOB) + " y"}</Text>
        </View>

        <View style={styles.topRight}>
          <Text style={styles.lable}>Points</Text>
          <Text style={styles.input}>{sportpoints}</Text>
        </View>

        <View style={styles.bottomLeft}>
          <Text style={styles.lable}>Weight</Text>
          <Text style={styles.input}>
            {userData.weight ? userData.weight + " kg" : "-"}
          </Text>
        </View>

        <View style={styles.bottomRight}>
          <Text style={styles.lable}>Height</Text>
          <Text style={styles.input}>
            {userData.height ? userData.height + " ft" : "-"}
          </Text>
        </View>

        <View style={styles.middleContainer}>
          <Image
            source={badge(sportpoints)}
            // source={{ uri: `${ip}/${userData.baseUrl.slice(1)}` }}
            style={styles.middleImage}
            resizeMode="cover"
          />
          <Text style={styles.input}>{badgename(sportpoints)}</Text>
        </View>
      </View>
      {sportid ? (
        <View style={styles.card2}>
          <WebView
            onError={(syntheticEvent) => {
              const { nativeEvent } = syntheticEvent;
              console.error("WebView error: ", nativeEvent);
            }}
            javaScriptEnabled={true}
            scalesPageToFit={true}
            showsHorizontalScrollIndicator={false}
            style={{
              width: Dimensions.get("screen").width - 35,
              marginTop: 10,
            }}
            source={{
              uri:
                sportid.rating !== 0
                  ? `${ip}/athelteperformance/${Atheltedata[0]._id}/${sportid.sports._id}`
                  : "",
            }}
          />
        </View>
      ) : (
        <View style={styles.card23}>
          <View style={styles.bigCircle}>
            <Text style={styles.bigCircleText}>Pending Goals</Text>
            <Text style={styles.bigCircleTextNum}>
              {
                Atheltedata[0].goals.filter((item) => item.achieved !== "0")
                  .length
              }
            </Text>
          </View>
          <View style={styles.bigCircle}>
            <Text style={styles.bigCircleText}>Completed Goals</Text>
            <Text style={styles.bigCircleTextNum}>
              {
                Atheltedata[0].goals.filter((item) => item.achieved === "0")
                  .length
              }
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default BadgePerformance;
const styles = StyleSheet.create({
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fbe8e8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 25,
    width: "90%",
    paddingLeft: "5%",
    backgroundColor: "#fbe8e8",
  },
  back: {
    marginRight: 4,
    alignSelf: "center",
  },
  heading: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
  },
  feedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "8%",
    marginLeft: "5%",
  },
  feedHeaderText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 10,
  },
  button: {
    backgroundColor: "gray",
    padding: 10,
    borderRadius: 7,
    flex: 1,
    height: 70,
  },
  buttonText: {
    color: "white",
  },
  card: {
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center",
    marginTop: "4%",
    width: "94%",
    height: "30%",
    borderRadius: 10,
    borderWidth: 1,
    borderBottomWidth: 3,
    backgroundColor: "white",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    paddingBottom: "5%",
    backgroundColor: "#f2b69c",
    justifyContent: "space-evenly",
    position: "relative",
  },
  topLeft: {
    position: "absolute",
    top: 5,
    left: 5,
  },
  topRight: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  bottomLeft: {
    position: "absolute",
    bottom: 5,
    left: 5,
  },
  bottomRight: {
    position: "absolute",
    bottom: 5,
    right: 5,
  },
  middleContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%", // Adjust this width according to your layout
    height: "100%", // Adjust this height according to your layout
  },
  middleImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  card2: {
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center",
    marginTop: "2%",
    width: "94%",
    height: "39%",
    borderRadius: 10,
    borderWidth: 1,
    borderBottomWidth: 4,
    backgroundColor: "white",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    paddingBottom: "5%",
    backgroundColor: "#f2b69c",
    justifyContent: "space-evenly",
    // marginTop:"-50%",
  },
  card23: {
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center",
    marginTop: "2%",
    width: "94%",
    height: "39%",
    borderRadius: 10,
    backgroundColor: "#fbe8e8",
    paddingBottom: "5%",
    justifyContent: "space-evenly",
  },
  row: {
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  column1: {
    width: "35%",
  },
  column2: {
    width: "35%",
  },
  lable: {
    fontSize: 18,
    color: "grey",
  },
  input: {
    fontSize: 16,
    fontWeight: "bold",
  },
  bigCircle: {
    backgroundColor: "#f2b69c",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 120,
    height: 120,
    width: "75%",
    marginTop: "15%",
    borderWidth: 1,
    borderBottomWidth: 5,
  },
  bigCircleText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  bigCircleTextNum: {
    fontSize: 36,
    fontWeight: "bold",
  },
  // teamContainer: {
  //     flexDirection: "row",
  //     justifyContent: "space-between",
  //     alignItems: "center",
  //     borderBottomWidth: 1,
  //     borderTopWidth: 1,
  //     paddingVertical: 2,
  // },

  // teamRow: {
  //     flexDirection: "row",
  //     alignItems: "center",
  //     gap: 2,
  // },
  // teamLogo: {
  //     width: 40,
  //     height: 40,
  // },
  // scoreContainer: {
  //     flexDirection: "row",
  //     alignItems: "center",
  //     gap: 2,
  // },
  // scoreText: {
  //     fontSize: 18,
  //     fontWeight: "bold",
  // },
});
