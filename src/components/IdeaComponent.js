import { StyleSheet, Text, View, Linking } from 'react-native'
import React from 'react'
import { Feather } from '@expo/vector-icons';


export default function IdeaComponent({accessibility, activity, link, participants, price, type}) {
  return (
      <View style={styles.activityContainer}>
          <View style={styles.textContainer}>
                <Text style={styles.activityText}>{activity}</Text>
                <Text style={styles.categoryText}>{type} &#8226; {participants} participants &#8226; ${price} &#8226; {accessibility < 0.5 ? 'accessible' : 'possibly unaccessible'}</Text>
                {link != '' && (
                    <Text
                    style={[styles.categoryText, {color: 'blue', marginVertical: 10}]}
                    onPress={() => Linking.openURL(link)}
                    >More info</Text>
                )}
                
          </View>
          <Feather name="menu" size={24} color="#888" />
      </View>
  )
}

const styles = StyleSheet.create({
    activityContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20,
        borderRadius: 20,
        marginBottom: 20
    },
    textContainer: {
        width: '90%'
    },
    activityText: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 10
    },
    categoryText: {
        color: '#888'
    }
})