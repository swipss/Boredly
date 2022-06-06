import { StyleSheet, Text, View, FlatList, Pressable } from 'react-native'
import React, {useState, useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import IdeaComponent from '../../components/IdeaComponent'
import { SwipeListView } from 'react-native-swipe-list-view'
import { FontAwesome } from '@expo/vector-icons';
import { useSliderContext } from '../../context/SliderContext'


export default function SavedScreen() {
    const {activities, setActivities} = useSliderContext()

    const getActivities = async () => {
        const activities = await AsyncStorage.getItem('activities')
        const jsonActivities = JSON.parse(activities)
        setActivities(jsonActivities)
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
        await AsyncStorage.setItem('activities', JSON.stringify(activitiesItems));

            console.log('delete')
        } catch(error) {
        console.log('error: ', error);
        }}

    

    if (activities.length === 0) {
        return <Text style={styles.noActivitiesText}>No saved activities</Text>
    }

  return (
    <View style={styles.container}>
        <SwipeListView 
        data={activities}
        renderItem={({item}, rowMap) => (
            <IdeaComponent activity={item.activity} accessibility={item.accessibility}
                link={item.link}
                participants={item.participants}
                price={item.price}
                type={item.type}/>
            )}
            renderHiddenItem={ ({item}, rowMap) => (
                <View style={styles.rowBack}>
                    <Pressable onPress={() => removeActivity(item.key)}>
                        <FontAwesome name="trash-o" size={24} color="white" style={{paddingRight: 10}} />
                    </Pressable>
                </View>
            )}
            rightOpenValue={-75}
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
        padding: 20,
        borderRadius: 20,
        marginBottom: 20,
        flex: 1
    },
    noActivitiesText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#888',
        alignSelf: 'center'
    },
    
    
})