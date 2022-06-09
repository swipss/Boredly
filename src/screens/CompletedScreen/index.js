import { StyleSheet, Text, View, FlatList } from "react-native";
import React, { useState } from "react";
import { useSliderContext } from "../../context/SliderContext";
import IdeaComponent from "../../components/IdeaComponent";

export default function CompletedScreen() {
  const { completedActivities, filteredActivities } = useSliderContext();
  const [isEditing, setIsEditing] = useState(false);

  if (completedActivities?.length === 0 || !completedActivities) {
    return <Text style={styles.noActivitiesText}>No completed activities</Text>;
  }

  return (
    <View style={styles.container}>
      {
        <FlatList
          data={completedActivities}
          renderItem={({ item }, rowMap) => (
            <IdeaComponent
              activity={item.activity}
              accessibility={item.accessibility}
              link={item.link}
              participants={item.participants}
              price={item.price}
              type={item.type}
              isEditing={isEditing}
            />
          )}
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 20,
    flex: 1,
  },
  noActivitiesText: {
    textAlign: "center",
    marginTop: 20,
    color: "#888",
    alignSelf: "center",
  },
});
