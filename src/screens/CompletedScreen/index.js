import { StyleSheet, Text, View, FlatList } from 'react-native'
import React from 'react'
import { useSliderContext } from '../../context/SliderContext'
import IdeaComponent from '../../components/IdeaComponent'

export default function CompletedScreen() {
    const {completedActivities, filteredActivities} = useSliderContext()
    console.log(completedActivities)

  return (
    <View style={styles.container}> 
       {<FlatList
        data={completedActivities}
        renderItem={({item}, rowMap) => (
            <IdeaComponent activity={item.activity} accessibility={item.accessibility}
                link={item.link}
                participants={item.participants}
                price={item.price}
                type={item.type}/>
            )}
            
        />}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 20,
        marginTop: 20,
        flex: 1
    },
})