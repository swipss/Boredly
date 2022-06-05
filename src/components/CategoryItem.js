import { View, Text, StyleSheet, Pressable } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'

export default function CategoryItem({categoryText, selectedCategory, setSelectedCategory}) {
const isSelected = () => selectedCategory == categoryText

  return (
    
    <LinearGradient start={{x: 0, y: 0}} end={{x: 1.5, y: 0}} colors={isSelected() ? ['#F39C12', '#FEE9A0'] : []} style={styles.container}>
          <Pressable
          onPress={() => setSelectedCategory(categoryText)}
          >
              <Text style={[styles.text, {color: isSelected() ? 'white' : 'black'}]}>{categoryText[0].toUpperCase() + categoryText.substring(1)}</Text>

          </Pressable>

      </LinearGradient>
  )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 10,
        borderWidth: 1,
        borderColor: '#E9E9E9',
        paddingHorizontal: 24,
        paddingVertical: 8,
        borderRadius: 20,

    },
    text: {
      fontWeight: 'bold',
      color: 'white'
    },
})