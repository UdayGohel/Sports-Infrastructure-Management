import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import ipconfig from "../../ipconfig";
import { captureRef } from "react-native-view-shot";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState, useRef } from "react";
import { MaterialIcons } from "@expo/vector-icons"; // Import Ionicons from @expo/vector-icons
import Leaderboard from "react-native-leaderboard";
import { useSelector } from "react-redux";
import * as Sharing from "expo-sharing";
import ComparativeAnalysisModal from "./ComparativeAnalysisModal";

const getOrdinalSuffix = (number) => {
  if (10 <= number / 100 && number / 100 <= 20) {
    return "th";
  } else {
    const suffix = { 1: "st", 2: "nd", 3: "rd" }[number % 10] || "th";
    return suffix;
  }
};

const LeaderBoard = ({ navigation }) => {
  const ip = ipconfig.ip;
  const AthelteData = useSelector((s) => s.athelte.Athelte);
  const [image, setimage] = useState("../../assets/icon.png");
  const [loading, setLoading] = useState(true);
  const [userdata, setuserdata] = useState([
    {
      name: "Adam Savage",
      score: "-",
      iconUrl:
        "https://www.shareicon.net/data/128x128/2016/09/15/829473_man_512x512.png",
    },
  ]);
  const [atheltedata, setatheltedata] = useState([]);

  useEffect(() => {
    const i = AthelteData[0].baseUrl.slice(1);
    setimage(i);
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      `${ip}/getAthletesWithRating?id=${AthelteData[0]._id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setuserdata(result.currentuserdata);
        let temp = result.data1.map((item) => {
          let iconUrl = item.iconUrl.slice(1);
          return { ...item, iconUrl: `${ip}/${iconUrl}` };
        });
        setatheltedata(temp);
        setLoading(false);
      })
      .catch((error) => console.log("error", error));
  }, [image]);

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

  return (
    <>
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ) : (
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
              <Text style={{ fontWeight: "bold", fontSize: 25 }}>
                LeaderBoard
              </Text>
            </View>
          </View>
          <View style={styles.card}>
            <Text style={styles.label}>
              {userdata.index + 1 ? userdata.index + 1 : "-"}
              {userdata.index
                ? getOrdinalSuffix(parseInt(userdata.index) + 1)
                : "st"}
            </Text>
            <View style={styles.profileImage}>
              <Image
                style={{
                  width: 125,
                  height: 125,
                  borderRadius: 62.5,
                  borderColor: "#fbe8e0",
                  borderWidth: 5,
                }}
                source={{ uri: `${ip}/${image}` }}
              />
            </View>
            <Text style={styles.label}>
              {userdata[0].score ? userdata[0].score + " Points" : "-"}
            </Text>
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
          <Leaderboard
            labelBy="name"
            sortBy="score"
            icon="iconUrl"
            data={atheltedata}
            onRowPress={(item, index) => {
              Alert.alert(
                "LeaderBoard",
                item.name + " have " + item.score + " points ",
                [
                  // {
                  //     text: 'Cancel',
                  //     onPress: () => console.log('Cancel Pressed'),
                  //     style: 'cancel',
                  // },
                  { text: "OK", onPress: () => {} },
                ]
              );
            }}
            evenRowColor="#edfcf9"
            oddRowColor="#ffffff"
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fbe8e0",
    paddingTop: "7%",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pickerContainer: {
    backgroundColor: "#f2b69c",
    borderRadius: 5,
    marginBottom: 15,
    width: "90%",
    marginLeft: "5%",
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
  card: {
    backgroundColor: "white",
    borderRadius: 15,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 5,
    height: "22%",
    flexDirection: "row",
    width: "95%",
    marginLeft: "2.5%",
    backgroundColor: "#edfcf9",
  },
  label: {
    fontWeight: "bold",
    fontSize: 20,
    flex: 1,
    alignSelf: "center",
    textAlign: "center",
    marginRight: -15,
  },
  profileImage: {
    flex: 1,
    alignSelf: "center",
    borderRadius: 15,
    borderColor: "white",
  },
});

export default LeaderBoard;
