import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Feed from './screens/Feed';
import Settings from './screens/tabScreens/Settings';
import Calendar from './screens/tabScreens/Calendar';

import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useColorScheme } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Payments from './screens/drawerScreens/Payments';

//Tab bottom
const Tab = createBottomTabNavigator();

function TabGroup() {
    return (
        <Tab.Navigator
            screenOptions={({ route, navigation }) => ({
                tabBarIcon: ({color, focused, size }) => {
                    let iconName;
                    let IconComponent = Ionicons;
                    if (route.name === "Notes") {
                        iconName = focused ? "notebook" : "notebook-outline";
                        IconComponent = MaterialCommunityIcons;
                    } else if (route.name === "Calendar") {
                        iconName = focused ? "ios-calendar" : "ios-calendar-outline";
                    } else if (route.name === "Settings") {
                        iconName = focused ? "ios-settings-sharp" : "ios-settings-outline";
                    }
                    return <IconComponent name={iconName} size={size} color={color}/>
                },
                tabBarActiveTintColor: "#00BFFF",
        })}
        >
            <Tab.Screen name='Notes' component={Feed}/>
            <Tab.Screen name='Calendar' component={Calendar}/>
            <Tab.Screen name='Settings' component={Settings}/>
        </Tab.Navigator>
    )
}

// Drawer

const Drawer = createDrawerNavigator();

function DrawerGroup() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="TabGroup" component={TabGroup} />
            <Drawer.Screen name="Payments" component={Payments}/>

        </Drawer.Navigator>
    )
}


export default function Navigation() {
    const currentTheme = useColorScheme();
    return (
        <NavigationContainer theme={currentTheme === "dark" ? DarkTheme : DefaultTheme}>
            <TabGroup/>
        </NavigationContainer>
    )
}