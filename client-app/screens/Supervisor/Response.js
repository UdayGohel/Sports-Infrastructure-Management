// import {
//   View,
//   Text,
//   Image,
//   StyleSheet,
//   Button,
//   TouchableOpacity,
//   ScrollView,
//   Pressable,
// } from "react-native";
// import RatingModal from "./RatingModal";
// import { Ionicons } from "@expo/vector-icons";
// import { useEffect, useState } from "react";
// import { useNavigation } from "@react-navigation/native";
// import ipconfig from "../../ipconfig";
// import { useSelector } from "react-redux";
const Response = () => {
  //   const Userdata = useSelector((state) => state.user.User);
  //   // console.log(Atheltedata[0].payments[0].sports);
  //   //   const id = Atheltedata[0]._id;
  //   const [rateModal, setRateModal] = useState(false);
  //   const [rateId, setRateId] = useState("");
  //   const [rating, setrating] = useState("");
  //   const ip = ipconfig.ip;
  //   const [data, setData] = useState([]);
  //   useEffect(() => {
  //     var requestOptions = {
  //       method: "GET",
  //       redirect: "follow",
  //     };
  //     fetch(
  //       `${ip}/ratingForSupervisor?sportComplexId=${Userdata.SportComplexId}`,
  //       requestOptions
  //     )
  //       .then((response) => response.json())
  //       .then((result) => {
  //         console.log(result);
  //         setData(result.ratings);
  //       })
  //       .catch((error) => console.log("error", error));
  //   }, []);
  //   const ratingcountHandler = (id) => {
  //     setrating(id);
  //     console.log(id);
  //   };
  //   const ratingHandler = () => {
  //     setRateModal(!rateModal);
  //   };
  //   console.log(data);
  //   const navigate = useNavigation();
  //   return (
  //     <>
  //       <View style={styles.container}>
  //         <View style={styles.header}>
  //           <Pressable
  //             onPress={() => {
  //               navigate.goBack();
  //             }}
  //           >
  //             {rateModal && (
  //               <RatingModal
  //                 rateID={rateId}
  //                 setrating={ratingcountHandler}
  //                 rateModal={rateModal}
  //               ></RatingModal>
  //             )}
  //             <View style={styles.back}>
  //               <Ionicons name="arrow-back" size={24} />
  //             </View>
  //           </Pressable>
  //           <View style={styles.heading}>
  //             <Text style={{ fontWeight: "bold", fontSize: 25 }}>
  //               Enrolled Sports List
  //             </Text>
  //           </View>
  //         </View>
  //         <ScrollView contentContainerStyle={styles.scrollContainer}>
  //           {data.map((item, index) => (
  //             <View style={styles.card} key={index}>
  //               <Pressable
  //                 onPress={() => {
  //                   setRateId(item._id);
  //                 }}
  //                 style={({ pressed }) => [
  //                   {
  //                     backgroundColor: pressed ? "#f0f0f0" : "white",
  //                     padding: 20,
  //                     borderRadius: 10,
  //                   },
  //                 ]}
  //               >
  //                 <View style={styles.row}>
  //                   <Text style={styles.label}>Remarks : </Text>
  //                   <Text style={styles.input}>{item.remarks}</Text>
  //                 </View>
  //                 {/* <View style={styles.row}>
  //                   <Text style={styles.label}>Sport Category:</Text>
  //                   <Text style={styles.input}>{item.sports.Category}</Text>
  //                 </View>
  //                 <View style={styles.row}>
  //                   <Text style={styles.label}>Instructor:</Text>
  //                   <Text style={styles.input}>
  //                     {item.instructorId.userId.Name}
  //                   </Text>
  //                 </View>
  //                 <View style={styles.row}>
  //                   <Text style={styles.label}>Start Date :</Text>
  //                   <Text style={styles.input}>
  //                     {new Date(item.from).getDate() +
  //                       "/" +
  //                       (new Date(item.from).getMonth() + 1) +
  //                       "/" +
  //                       new Date(item.from).getFullYear()}
  //                   </Text>
  //                 </View>
  //                 <View style={styles.row}>
  //                   <Text style={styles.label}>Duration:</Text>
  //                   <Text style={styles.input}>
  //                     {parseInt((new Date(item.from) - new Date()) / 86400000)}
  //                   </Text>
  //                 </View>
  //                 <View style={styles.row}>
  //                   <Text style={styles.label}>Time Slot : </Text>
  //                   <Text style={styles.input}>{item.timeSlot.from} </Text>
  //                   <Text style={styles.input}>to</Text>
  //                   <Text style={styles.input}>{item.timeSlot.to}</Text>
  //                 </View> */}
  //                 <Pressable onPress={ratingHandler}>
  //                   <View style={{ alignSelf: "flex-end", padding: 10 }}>
  //                     <Text style={{ color: "#0054a8" }}>Rate us</Text>
  //                   </View>
  //                 </Pressable>
  //               </Pressable>
  //             </View>
  //           ))}
  //         </ScrollView>
  //       </View>
  //     </>
  //   );
};

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "white",
//     paddingVertical: 50,
//     backgroundColor: "#f0f0f0",
//   },
//   header: {
//     flexDirection: "row",
//     marginBottom: 10,
//     width: "100%",
//     height: 50,
//     backgroundColor: "#f0f0f0",
//     alignItems: "center",
//   },
//   back: {
//     marginHorizontal: 4,
//     alignSelf: "center",
//   },
//   heading: {
//     justifyContent: "center",
//     alignItems: "center",
//     width: "90%",
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     padding: 10,
//   },
//   card: {
//     backgroundColor: "white",
//     borderRadius: 10,
//     shadowColor: "black",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//     elevation: 5,
//     marginHorizontal: 15,
//     marginVertical: 10,
//   },
//   inline: {
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   row: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 10,
//   },
//   label: {
//     fontWeight: "bold",
//     fontSize: 17,
//   },
//   input: {
//     marginLeft: 6,
//   },
// });

export default Response;
