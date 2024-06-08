import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  Pressable,
} from "react-native";
import ipconfig from "../../ipconfig";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import QRCodeGenerator from "./QRCodeUser";

const IDCard = ({ navigation }) => {
  const ip = ipconfig.ip;
  const Userdata = useSelector((state) => state.user.User);
  const Atheltedata = useSelector((state) => state.athelte.Athelte);
  const [supervisorId, setsupervisorId] = useState("");
  const [image, setimage] = useState("./../../assets/icon.png");

  useEffect(() => {
    if (Atheltedata[0].createdBy) {
      setsupervisorId(Atheltedata[0].createdBy._id);
    }
    const i = Atheltedata[0].baseUrl.slice(1);
    setimage(i);
  }, [image]);
  return (
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
          <Text style={{ fontWeight: "bold", fontSize: 25 }}>ID Card</Text>
        </View>
      </View>
      <View style={styles.card}>
        <Image
          style={{
            width: 120,
            height: 120,
            borderRadius: 62.5,
            marginTop: "-35%",
            borderColor: "#fbe8e0",
            borderWidth: 5,
            marginBottom: "10%",
          }}
          source={{ uri: `${ip}/${image}` }}
        />
        <View style={styles.profileDetail}>
          {/* {supervisorId && <QRCodeGenerator value={supervisorId} size={300} />} */}
          <Image
            style={{
              width: 300,
              height: 300,
              // borderRadius: 62.5,
              // marginTop: -185,
              // borderColor: "white",
              // borderWidth: 5,
            }}
            source={{
              uri: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${supervisorId}`,
            }}
          />
          <View></View>
          <Text style={styles.input}>{Userdata.Email}</Text>
          <Text style={styles.input}>{Userdata.Name}</Text>
        </View>
      </View>
    </View>
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
  card: {
    backgroundColor: "#f2b69c",
    padding: 20,
    paddingTop: 50,
    borderRadius: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginHorizontal: 30,
    marginVertical: 100,
    alignItems: "center",
  },
  profileDetail: {
    alignItems: "center",
  },
  input: {
    marginTop: "3.5%",
    fontWeight: "bold",
    fontSize: 24,
  },
});

export default IDCard;
