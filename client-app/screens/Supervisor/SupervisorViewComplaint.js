import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import ipconfig from "../../ipconfig";
function SupervisorViewComplaint({ route, navigation }) {
  const navigate = useNavigation();
  const data = route.params.data;
  const ip = ipconfig.ip;

  return (
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
            View Complaint
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 15,
          paddingHorizontal: 10,
          backgroundColor: "white",
          marginHorizontal: 15,
          borderRadius: 8,
          marginBottom: 20,
        }}
      >
        <Text style={{ fontWeight: "bold", fontSize: 15, alignSelf: "center" }}>
          Name :
        </Text>
        <Text style={{ alignSelf: "center", paddingLeft: 10 }}>
          {data.userId.Name}
        </Text>
      </View>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            paddingVertical: 15,
            paddingHorizontal: 10,
            backgroundColor: "white",
            marginHorizontal: 15,
            borderRadius: 8,
            height: 250,
            marginBottom: 15,
          }}
        >
          <ScrollView>
            <Text style={{ fontWeight: "bold", paddingBottom: 7 }}>
              Complaint:
            </Text>
            <Text>{data.Description}</Text>
          </ScrollView>
        </View>

        <View
          style={{
            justifyContent: "space-evenly",
            flexDirection: "row",
            marginTop: 25,
          }}
        ></View>
        <View>
          <Image
            style={{
              width: 120,
              height: 120,
              marginHorizontal: 15,
              marginTop: -10,
            }}
            source={{ uri: `${ip}/complaints/${data.photo}` }}
          />
        </View>
        {data.status == 0 && (
          <TouchableOpacity style={styles.logout}>
            <Button color="red" title="Pending" />
          </TouchableOpacity>
        )}
        {data.status == 1 && (
          <TouchableOpacity style={styles.logout}>
            <Button color="green" title="Solved" />
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

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
    width: "85%",
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
  logout: {
    width: "40%",
    alignSelf: "center",
    marginTop: "15%",
  },
});

export default SupervisorViewComplaint;
