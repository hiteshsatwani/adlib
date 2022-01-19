import Ionicons from '@expo/vector-icons/build/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import {
    CardStyleInterpolators,
} from '@react-navigation/stack';
import { observer } from 'mobx-react';
import React from 'react';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Home, { StackParamList } from './Home/homeView';
import HomeViewModel from './Home/homeViewModel';
import LoginViewModel from './Login/LoginViewModel';
import Profile from './Profile/profileView';
import ProfileViewModel from './Profile/profileViewModel';


export type RootStackParamList = {
    Home: { flow: string }
    Profile: { profileViewModel: ProfileViewModel, loginViewModel: LoginViewModel }
};

interface Props {
    profileViewModel: ProfileViewModel
    loginViewModel: LoginViewModel
    flow: string
}


const AppViewController = ({ profileViewModel, loginViewModel, flow }: Props) => {
    const AppNavigationStack = createBottomTabNavigator<RootStackParamList>()


    return (
        <SafeAreaProvider style={{ backgroundColor: "black" }}>
            <NavigationContainer>
                <AppNavigationStack.Navigator initialRouteName="Home" screenOptions={({ route }) => (Platform.OS === "android" ? {
                    tabBarIcon: ({ focused, color, size }) => {
                        if (route.name === 'Home') {
                            return <Ionicons name='home-sharp' size={size} color={color} />;
                        } else if (route.name === 'Profile') {
                            return <Ionicons name='person' size={size} color={color} />;
                        }
                    },
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    tabBarActiveTintColor: '#1DB954',
                    tabBarInactiveTintColor: 'white',
                    headerShown: false,
                    tabBarStyle: {
                        backgroundColor: '#000000',
                        borderTopWidth: 0,
                        position: 'absolute',
                        elevation: 0  // <-- this is the solution
                    },
                } : {
                    tabBarIcon: ({ focused, color, size }) => {
                        if (route.name === 'Home') {
                            return <Ionicons name='home-sharp' size={size} color={color} />;
                        } else if (route.name === 'Profile') {
                            return <Ionicons name='person' size={size} color={color} />;
                        }
                    },
                    tabBarActiveTintColor: '#1DB954',
                    tabBarInactiveTintColor: 'white',
                    headerShown: false,
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                    tabBarStyle: {
                        backgroundColor: 'transparent',
                        borderTopWidth: 0,
                        position: 'absolute',
                        elevation: 0  // <-- this is the solution
                    },
                })}>
                    <AppNavigationStack.Screen name="Home" component={Home} options={{ tabBarLabel: () => { return null } }} initialParams={{ flow: flow }} />
                    <AppNavigationStack.Screen name="Profile" component={Profile} options={{ tabBarLabel: () => { return null } }} initialParams={{ profileViewModel: profileViewModel, loginViewModel: loginViewModel }} />
                </AppNavigationStack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>
    )
}

export default observer(AppViewController)