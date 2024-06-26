import { FontAwesome } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import FlatListScreen from "./FlatListScreen";

import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
  Dimensions,
  Platform,
  Pressable,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import Carousel, { ParallaxImage } from "react-native-snap-carousel";
// import LinearGradient from "react-native-linear-gradient";
import {
  Ionicons,
  Feather,
  Entypo,
  MaterialIcons,
  Icon,
} from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import FilterModal from "./FilterModal";
import ipconfig from "../../ipconfig";

const { width: screenWidth } = Dimensions.get("window");

const MyCarousel = ({ navigation, route }) => {
  const [selectedOption, setSelectedOption] = useState("getSports");
  const [searchQuery, setSearchQuery] = useState("");
  const [filterModal, setFilterModal] = useState(false);
  const [lat, setlat] = useState("");
  const [long, setlong] = useState("");
  const [distance, setDistance] = useState("");
  const [category, setCategory] = useState("");
  const carouselRef = useRef(null);
  const [image, setImages] = useState([]);
  const ip = ipconfig.ip;

  const goForward = () => {
    carouselRef.current.snapToNext();
  };
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(`${ip}/getUpdates?level=0&active=1`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setImages(result.data);
      })
      .catch((error) => console.log("error", error));
  }, []);

  useEffect(() => {
    const { lat, long, distance, district, Category } = route.params || {};
    if (lat) {
      // console.log(lat, long);
      setlat(lat);
      setlong(long);
      setDistance(distance);
    }
    if (district) {
      setSearchQuery(district);
    }
    if (Category) {
      setCategory(Category);
    }
  }, [route.params]);

  const renderItem = ({ item, index }, parallaxProps) => {
    const updatedImage = `${ip}${item.image}`;
    // console.log(updatedImage);
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Events");
        }}
      >
        <View style={styles.item}>
          <ParallaxImage
            source={{ uri: updatedImage }}
            containerStyle={styles.imageContainer}
            style={styles.image}
            parallaxFactor={0.4}
            {...parallaxProps}
          />
          {/* <Text style={styles.title} numberOfLines={2}>
                    {item.title}
                </Text> */}
        </View>
      </TouchableOpacity>
    );
  };
  const clearHandler = () => {
    setCategory("");
    setDistance("");
    setlong("");
    setlat("");
    setSearchQuery("");
  };

  return (
    <View style={styles.container}>
      {/* {filterModal && <Modal show={filterModal} />} */}
      {filterModal && (
        <FilterModal show={filterModal} selectedOption={selectedOption} />
      )}
      <TouchableOpacity onPress={goForward}>
        {/* <Text>go to next slide</Text> */}
      </TouchableOpacity>
      <Carousel
        ref={carouselRef}
        sliderWidth={screenWidth}
        sliderHeight={screenWidth}
        itemWidth={screenWidth - 60}
        data={image}
        renderItem={renderItem}
        hasParallaxImages={true}
        autoplay={true}
        autoplayInterval={5000}
        loop={true}
        loopClonesPerSide={2}
      />
      <View style={styles.background}>
        <View style={styles.primaryView}></View>
        <View style={styles.ovalSection}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-around" }}
          >
            <TouchableOpacity
              style={
                selectedOption == "getSports"
                  ? styles.button
                  : styles.onpressbutton
              }
              onPress={() => {
                setSelectedOption("getSports");
              }}
            >
              <Text style={styles.buttonText}>Facility</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                selectedOption == "searchSportsComplex"
                  ? styles.button
                  : styles.onpressbutton
              }
              onPress={() => {
                setSelectedOption("searchSportsComplex");
              }}
            >
              <Text style={styles.buttonText}>Sports Complex</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.input}
              fontSize={15}
              placeholder="Search..."
              onChangeText={(text) => setSearchQuery(text)}
              value={searchQuery}
            />
            <Pressable
              onPress={() => {
                setFilterModal(!filterModal);
              }}
            >
              <Feather
                // style={{ marginLeft: "70%" }}
                color={"black"}
                name="filter"
                size={25}
              />
            </Pressable>
            <TouchableOpacity style={styles.button1} onPress={clearHandler}>
              <Text style={styles.buttonText1}>Clear</Text>
            </TouchableOpacity>
          </View>
          {/* <Button title="Clear" onPress={clearHandler}></Button> */}
          {/* //FlatListScreen */}
          <FlatListScreen
            optionField={selectedOption}
            searchfield={searchQuery}
            navigate={navigation}
            lat={lat}
            distance={distance}
            long={long}
            category={category}
          />
        </View>
      </View>
    </View>
  );
};

export default MyCarousel;

const styles = StyleSheet.create({
  onpressbutton: {
    marginTop: 10,
    width: "40%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 5,
    height: "90%",
  },
  button: {
    marginTop: 10,
    width: "40%",
    backgroundColor: "#f2b69c",
    borderRadius: 10,
    padding: 5,
    height: "90%",
  },
  buttonText: {
    textAlign: "center",
    color: "black",
    fontSize: 17,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff6f3",
    // #e8b7a9
    // #d7a592
    // #c99c81
    // #e3cfbf
    // #c99c81
    //        #f8d7c9

    // #f5c6b3
    // #f2b69c
    //  #fbe8e0
    // #f2b69c
  },
  input: {
    width: "90%",
  },
  item: {
    width: screenWidth - 50,
    height: screenWidth - 110,
  },
  imageContainer: {
    flex: 1,
    marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
    backgroundColor: "white",
    borderRadius: 8,
    borderWidth: 1,
    marginTop: "15%",
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: "cover",
  },
  background: {
    backgroundColor: "#fff6f3",
    flexDirection: "column",
  },
  primaryView: {
    backgroundColor: "#ffffff",
  },
  ovalSection: {
    marginTop: 10,
    alignSelf: "center",
    backgroundColor: "#f8d7c9", // #fbe8e8,#fee8e8,#e8fbef #e8b7a9
    // #d7a592
    borderTopLeftRadius: screenWidth * 0.1,
    borderTopRightRadius: screenWidth * 0.1,
    width: screenWidth,
    height: 550,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: "#ffffff",
    marginTop: 20,
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    marginLeft: "5%",
    marginTop: "3%",
    alignItems: "center",
    width: "70%",
    borderWidth: 1,
    borderRadius: 10,
    borderBottomWidth: 5,
  },
  button1: {
    flexDirection: "row",
    marginLeft: "2%",
    marginTop: "3%",
    width: "28%",
    backgroundColor: "#f2b69c",
    borderRadius: 5,
    height: "110%",
    borderWidth: 1,
    border0Radius: 10,
    borderBottomWidth: 5,
    marginBottom: "1.5%",
  },
  buttonText1: {
    flex: 1,
    color: "black",
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});
