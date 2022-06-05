import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import IdeaScreen from "../screens/IdeaScreen";
import SavedScreen from "../screens/SavedScreen";
import { Entypo } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';


const Stack = createNativeStackNavigator()

const RootNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="Tabs" component={TabNavigator}/>
            <Stack.Screen name="Saved" component={SavedScreen}/>
        </Stack.Navigator>
    )
}

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
    return(
        <Tab.Navigator >
            <Tab.Screen name="Home" component={HomeStackNavigator}
            options={{tabBarIcon: ({ color }) => <Entypo name="home" size={24} color={color} />,
            tabBarActiveTintColor: '#F39C12',
            headerShown: false
        }}
            />
            <Tab.Screen name="Saved" component={SavedScreen}
            options={{tabBarIcon: ({ color }) => <AntDesign name="heart" size={24} color={color} />,
            tabBarActiveTintColor: '#F39C12',
            headerTitle: 'Saved activities'
        }}
            />
        </Tab.Navigator>
    )
}

const HomeStack = createNativeStackNavigator()

const HomeStackNavigator = () => {
    return (
        <HomeStack.Navigator screenOptions={{headerShown: false}}>
            <HomeStack.Screen name="HomeScreen" component={HomeScreen}/>
            <HomeStack.Screen name="Idea" component={IdeaScreen}/>
        </HomeStack.Navigator>
    )
}

export default RootNavigator