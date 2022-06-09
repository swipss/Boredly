import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  ActivityIndicator,
  LayoutAnimation,
} from "react-native";
import React, { useState, useEffect } from "react";
import CategoryItem from "../../components/CategoryItem";
import SliderComponent from "../../components/SliderComponent";
import { useSliderContext } from "../../context/SliderContext";
import { useNavigation } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";

const categories = [
  "education",
  "recreational",
  "social",
  "diy",
  "charity",
  "cooking",
  "relaxation",
  "music",
  "busywork",
];

export default function HomeScreen() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen((value) => !value);
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
  };

  const navigation = useNavigation();
  const {
    participants,
    setParticipants,
    price,
    setPrice,
    accessibility,
    setAccessibility,
    selectedCategory,
    setSelectedCategory,
  } = useSliderContext();

  const [open, setOpen] = useState(true);

  const onPress = () => {
    navigation.push("Idea");
  };

  const onReset = () => {
    setParticipants();
    setPrice();
    setAccessibility();
    setSelectedCategory();
  };

  return (
    <View style={[styles.container, { flex: isOpen && 1 }]}>
      <Text style={styles.headerTitle}>
        Click to generate a random activity
      </Text>
      <Pressable style={styles.button} onPress={onPress}>
        <Image
          source={require("../../../assets/bulb.png")}
          style={{ height: 100, width: 100 }}
        />
      </Pressable>
      <View style={styles.filterContainer}>
        <Text style={styles.text}>Filter activity</Text>
        <Pressable onPress={toggleOpen} activeOpacity={0.6}>
          <Entypo
            name={isOpen ? "chevron-up" : "chevron-down"}
            size={24}
            color="black"
          />
        </Pressable>
      </View>
      <ScrollView
        style={[styles.list, !isOpen ? styles.hidden : undefined]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.categoryContainer}>
          <Text style={styles.title}>Category</Text>
          <Pressable style={styles.reset} onPress={onReset}>
            <Text style={styles.resetText}>Reset</Text>
          </Pressable>
        </View>
        <ScrollView
          key={(item, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {categories.map((category) => (
            <View key={Math.random()}>
              <CategoryItem
                categoryText={category}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </View>
          ))}
        </ScrollView>
        <View
          style={{
            borderWidth: 0.5,
            borderColor: "#e9e9e9",
            marginVertical: 20,
          }}
        />

        <SliderComponent
          name="Participants"
          maximumValue={10}
          step={1}
          value={participants}
          setValue={setParticipants}
        />
        <SliderComponent
          name="Price"
          maximumValue={1}
          step={0.05}
          value={price?.toFixed(2)}
          setValue={setPrice}
        />
        <SliderComponent
          name="Accessibility"
          maximumValue={1}
          step={0.02}
          value={accessibility?.toFixed(2)}
          setValue={setAccessibility}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 60,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  button: {
    borderWidth: 5,
    alignSelf: "center",
    marginTop: 20,
    borderRadius: 200,
    padding: 50,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#F39C12",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  categoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  reset: {
    width: 75,
    height: 30,
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "lightgrey",
  },
  resetText: {
    fontWeight: "bold",
    textAlign: "center",
  },
  hidden: {
    height: 0,
  },
  list: {
    overflow: "hidden",
  },
});
