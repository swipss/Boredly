import { StyleSheet, Text, View, TextInput } from 'react-native'
import React, {useState} from 'react'
import { AntDesign } from '@expo/vector-icons';
import { useSliderContext } from '../context/SliderContext';


export default function SearchBar() {
    const {activities, setActivities, filteredActivities, setFilteredActivities} = useSliderContext()
    const [text, setText] = useState('')
    const searchActivities = (text) => {
  // Check if searched text is not blank
        if (text) {
            // Inserted text is not blank
            // Filter the masterDataSource and update FilteredDataSource
            const newData = activities.filter(
            function (item) {
                // Applying filter for the inserted text in search bar
                const itemData = item.activity
                    ? item.activity.toUpperCase()
                    : ''.toUpperCase();
                const textData = text.toUpperCase();
                return itemData.indexOf(textData) > -1;
            }
            );
            setFilteredActivities(newData);
            setText(text);
        } else {
            // Inserted text is blank
            // Update FilteredDataSource with masterDataSource
            setFilteredActivities(activities);
            setText(text);
        }
        };

  return (
    <View style={styles.searchContainer}>
        <AntDesign name="search1" size={24} color="black" style={{marginRight: 10}}/>
        <TextInput 
        value={text}
        onChangeText={(text) => searchActivities(text)}
        placeholder={'Search activities'}
        style={{width: '100%'}}
        />
    </View>
  )
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginBottom: 20
    }
})