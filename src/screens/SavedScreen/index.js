import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import IdeaComponent from '../../components/IdeaComponent'
import { SwipeListView } from 'react-native-swipe-list-view'
import { FontAwesome } from '@expo/vector-icons';
import { useSliderContext } from '../../context/SliderContext'
import SearchBar from '../../components/SearchBar'
import { Entypo } from '@expo/vector-icons';


export default function SavedScreen() {
    const {activities, setActivities, setFilteredActivities, filteredActivities} = useSliderContext()

    const getActivities = async () => {
        const activities = await AsyncStorage.getItem('activities')
        const jsonActivities = JSON.parse(activities)
        setActivities(jsonActivities)
        setFilteredActivities(jsonActivities)
    }

    useEffect(() => {
        getActivities()
    }, [])

    const removeActivity = async (key) => {
        // REMOVE FROM ACTIVITIES AND ASYNC STORAGE

        try {
        const existingActivities = await AsyncStorage.getItem('activities');
        let activitiesFav = JSON.parse(existingActivities);
        const activitiesItems = activitiesFav.filter(function(e){ return e.key !== key });
        setActivities(activitiesItems)
        setFilteredActivities(activitiesItems)
        await AsyncStorage.setItem('activities', JSON.stringify(activitiesItems));

            console.log('delete')
        } catch(error) {
        console.log('error: ', error);
        }}

    
        // console.log('activities', activities)
    if (activities?.length === 0 || !activities) {
        return <Text style={styles.noActivitiesText}>No saved activities</Text>
    }

  return (
    <View style={styles.container}>
        <SwipeListView
        showsVerticalScrollIndicator={false}
        data={filteredActivities}
        renderItem={({item}, rowMap) => (
            <IdeaComponent activity={item.activity} accessibility={item.accessibility}
                link={item.link}
                participants={item.participants}
                price={item.price}
                type={item.type}/>
            )}
            renderHiddenItem={ ({item}, rowMap) => (
                <View style={styles.rowBack}>
                    <Pressable onPress={() => removeActivity(item.key)} style={styles.delete}>
                        <FontAwesome name="trash-o" size={24} color="white"/>
                    </Pressable>
                    <Pressable onPress={() => console.log('complete')} style={styles.complete}>
                        <Entypo name="check" size={24} color="white" />
                    </Pressable>
                </View>
            )}
            ListHeaderComponent={<SearchBar />}
            rightOpenValue={-180}
            disableRightSwipe
        />
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginTop: 20,
        flex: 1
    },
    rowBack: {
        backgroundColor: '#ff0050',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderRadius: 20,
        marginBottom: 20,
        flex: 1,
    },
    complete: {
        backgroundColor: '#24d600',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 35,
        borderTopEndRadius: 20,
        borderBottomEndRadius: 20
    },
    delete: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 40
    },
    
    noActivitiesText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#888',
        alignSelf: 'center'
    },
    
    
})