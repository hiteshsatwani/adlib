import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { makeRedirectUri, useAuthRequest } from "expo-auth-session";
import * as Analytics from 'expo-firebase-analytics';
import { setCurrentScreen } from 'expo-firebase-analytics';
import * as WebBrowser from 'expo-web-browser';
import { observer } from "mobx-react";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import { config, discovery, getToken } from "../services/auth";
import { navigatorStyles } from "./loginStyles";
import { RootStackParamList } from "./LoginViewController";


type Props = NativeStackScreenProps<RootStackParamList, 'Screen1'>;
WebBrowser.maybeCompleteAuthSession();


setCurrentScreen('Login')

const Screen2 = ({ navigation, route }: Props) => {

    const loginViewModel = route.params.loginViewModel;

    const [request, response, promptAsync] = useAuthRequest(
        {
            clientId: config.clientId,
            scopes: config.scopes,
            usePKCE: false,
            redirectUri: makeRedirectUri({ native: 'adlib://' }),
        },
        discovery
    );

    useEffect(() => {
        if (response?.type === 'success') {
            const { code } = response.params;
            getToken(code).then(() => {
                navigation.push('Screen5', route.params)
                Analytics.logEvent('LogIn', {
                    screen: 'Log In',
                    purpose: 'User logged in',
                });
                loginViewModel.isLoggedIn = 'true'
            })
            
        }
    }, [response]);


    return (
        <View style={styles.container}>
            <View>
                <View>
                    
                    <View style={{ marginTop: 30 }}>

                        <FontAwesome.Button
                            name="spotify"
                            borderRadius={50}
                            onPress={() => promptAsync()}
                            color="#000000"
                            style={styles.loginScreenButton}
                            size={30}
                        >
                            <Text style={styles.buttonText}>Sign In with Spotify</Text>
                        </FontAwesome.Button>
                    </View>
                </View>
            </View>

            <View style={navigatorStyles.bottomContainer}>
                <View style={navigatorStyles.bottomRow}>
                    <TouchableOpacity onPress={() => navigation.goBack()} >
                        <AntDesign name="left" size={24} color="white" />
                    </TouchableOpacity>
                    <View style={navigatorStyles.dotRow}>
                        <TouchableOpacity style={navigatorStyles.greyDot} />
                        <TouchableOpacity style={navigatorStyles.whiteDot} />
                        <TouchableOpacity style={navigatorStyles.greyDot} />
                        <TouchableOpacity style={navigatorStyles.greyDot} />
                        <TouchableOpacity style={navigatorStyles.greyDot} />
                    </View>
                    {/* <TouchableOpacity onPress={() => navigation.push('Screen3', route.params)}>
                        <AntDesign name="right" size={24} color="white" />
                    </TouchableOpacity> */}

                </View>

            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 50
    },
    heading: {
        fontFamily: 'Montserrat_800ExtraBold',
        color: '#ffffff',
        fontSize: 35,
        marginHorizontal: 20
    },
    subtext: {
        fontFamily: 'Montserrat_500Medium',
        color: '#ffffff',
        fontSize: 18,
        marginHorizontal: 20,
        marginTop: 20
    },
    loginScreenButton: {
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        paddingHorizontal: 30,
        paddingVertical: 15,
    },
    buttonText: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 18
    },
    image: {
        width: 'auto',
        height: '80%',
        marginBottom: 50
    }
})



export default observer(Screen2)