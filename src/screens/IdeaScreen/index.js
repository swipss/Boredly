import { StyleSheet, Text, View, ActivityIndicator, Pressable, Linking } from 'react-native'
import React, {useState, useEffect} from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { useSliderContext } from '../../context/SliderContext'
import { LinearGradient } from 'expo-linear-gradient'
import { AntDesign } from '@expo/vector-icons';
import AnimatedLottieView from 'lottie-react-native'
import { Entypo } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function IdeaScreen() {
    const [liked, setLiked] = useState(false)
    const navigation = useNavigation()
    const {price, participants, selectedCategory, accessibility, setActivities, activities} = useSliderContext()
    const [activity, setActivity] = useState()

    const getActivity = async () => {
            try {
                const response = await fetch(`http://www.boredapi.com/api/activity?${participants && `participants=${participants}`}&${price && `price=${price.toFixed(2)}`}&${accessibility && `accessibility=${accessibility.toFixed(2)}`}&${selectedCategory && `type=${selectedCategory}`}`)
                // console.log(`http://www.boredapi.com/api/activity?${participants && `participants=${participants}`}&${price && `price=${price.toFixed(2)}`}&${accessibility && `accessibility=${accessibility.toFixed(2)}`}&${selectedCategory && `type=${selectedCategory}`}`)
                const json = await response.json()
                setActivity(json)
            } catch (error) {
                console.log(error)
            }
        }

    const getActivities = async () => {
            const activities = await AsyncStorage.getItem('activities')
            const jsonActivities = JSON.parse(activities)
            setActivities(jsonActivities)
        }


    const storeNewActivity = async () => {

        let existingActivities = await getExistingActivitiesFromStorage()
        const updatedActivities = [...existingActivities, activity]
        console.log("Updated activities", updatedActivities)
        await AsyncStorage.setItem('activities', JSON.stringify(updatedActivities))
        console.log("Stored")
        setActivities(updatedActivities)
        
    }

    const checkIfInActivities = () => {
        if (activities) {
            for (let i = 0; i < activities.length; i++) {
                if (activities[i].activity === activity.activity) {
                    return true
                }
            }
            return false

        }
    }


    const getExistingActivitiesFromStorage = async () => {
        let activities = await AsyncStorage.getItem('activities')
        return activities ? JSON.parse(activities) : []
    }

    const checkIfInStorage = async () => {
        const existingActivities = await getExistingActivitiesFromStorage()
        // console.log(existingActivities)
        for (let i = 0; i < existingActivities.length; i++) {
            if (existingActivities[i].activity === activity.activity) {
                return true
            }
        }
        return false
    }

    // AsyncStorage.clear()

    
    useEffect(() => {
        getActivity()
        getActivities()
    }, [])

    const onLike = async () => {
        if (!await checkIfInStorage()) {
            storeNewActivity()
            return
        }
        console.log('exists')
        
    }

    
    if (!activity) {
        return (
            <View style={styles.container}>
                <AnimatedLottieView 
                    source={require('../../../assets/76185-orange-loader.json')}
                    style={{width: 200, height: 200}}
                    autoPlay
                />
            </View>
        )
    }
  return (
    <View style={styles.container}>
        <Pressable onPress={() => navigation.goBack()} style={{position: 'absolute', top: 60, left: 20}}>
            <Entypo name='chevron-left' size={28} color="black" />
        </Pressable>

        {activity.activity ? (
            <>
                <Text style={styles.title}>{activity.activity}</Text>
                <Text style={styles.info}>{activity.type} &#8226; {activity.participants} participants &#8226; ${activity.price} &#8226; {activity.accessibility < 0.5 ? 'accessible' : 'not accesible'}</Text>

            </>

        ) : (
            <Text style={styles.title}>No activity found with the specified parameters.</Text>
        )}
        {activity.link != '' && activity.activity && (
                    <Text
                    style={{color: 'blue', marginBottom: 10}}
                    onPress={() => Linking.openURL(activity.link)}
                    >More info</Text>
                )}
        {activity.activity && (
            <Pressable onPress={() => onLike()}>
                <AntDesign name={checkIfInActivities() ? "heart" : 'hearto'} size={36} color={checkIfInActivities() ? '#ff0050' : 'black'} />
            </Pressable>

        )}
        <Pressable onPress={() => getActivity()}>
            <LinearGradient  style={styles.button} start={{x: 0, y: 0}} end={{x: 2, y: 0}} colors={['#F39C12', '#FEE9A0']}>
                    <Text style={{fontWeight: 'bold', fontSize: 16, color: 'white'}}>Generate new idea</Text>
            </LinearGradient>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    title: {
        fontSize: 36,
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 10
    },
    info: {
        marginBottom: 10
    },
    button: {
        marginTop: 15,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 20,
        

    }
})