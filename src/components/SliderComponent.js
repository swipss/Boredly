import { View, Text, StyleSheet } from 'react-native'
import React, {useState} from 'react'
import { Slider } from '@miblanchard/react-native-slider'

export default function SliderComponent({name, maximumValue, step, value, setValue}) {
  
  return (
    

    <View style={styles.container}>
      <View style={styles.valueContainer}>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.text}>{value}</Text>
      </View>
      <Slider 
      maximumValue={maximumValue}
      minimumTrackTintColor={"#F39C12"}
      thumbTintColor={'#F39C12'}
      maximumTrackTintColor={'#e9e9e9'}
      onValueChange={value => setValue(value[0])}
      step={step}
      animateTransitions={true}
      animationType={'spring'}
      value={value}
      
      />
      <View style={{borderWidth: 0.5, borderColor: '#e9e9e9', marginVertical: 20}}/>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
  },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16
  }
})