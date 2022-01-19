import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react"
import { Text, TouchableOpacity, View, StyleSheet, Button } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { navigatorStyles } from "./loginStyles";
import { RootStackParamList } from "./LoginViewController";
import { observer } from "mobx-react";

type Props = NativeStackScreenProps<RootStackParamList, 'Screen1'>;



const Screen5 = ({ navigation, route }: Props) => {

    const loginViewModel = route.params.loginViewModel;

    return (
        <View style={styles.container}>
            <AntDesign name="arrowup" size={124} color="white" />
            <Text style={styles.heading}>SWIPE UP TO DISCOVER</Text>
            <TouchableOpacity onPress={() => loginViewModel.setLoggedIn("true")} style={styles.letsGoButton}>
                <Text style={styles.buttonText}>Lets Go</Text>
            </TouchableOpacity>

            <View style={navigatorStyles.bottomContainer}>
                <View style={navigatorStyles.bottomRow}>

                    <View style={navigatorStyles.dotRow}>
                        <TouchableOpacity style={navigatorStyles.greyDot} />
                        <TouchableOpacity style={navigatorStyles.greyDot} />
                        <TouchableOpacity style={navigatorStyles.greyDot} />
                        <TouchableOpacity style={navigatorStyles.greyDot} />
                        <TouchableOpacity style={navigatorStyles.whiteDot} onPress={() => navigation.goBack()} />
                    </View>


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
    },
    heading: {
        fontFamily: 'Montserrat_800ExtraBold',
        color: '#ffffff',
        fontSize: 35,
        textAlign: "center",
        paddingTop: 50
    },
    subtext: {
        fontFamily: 'Montserrat_500Medium',
        color: '#ffffff',
        fontSize: 18,
        marginHorizontal: 20,
        marginTop: 20
    },
    letsGoButton: {
        backgroundColor: '#ffffff',
        overflow: 'hidden',
        paddingHorizontal: 30,
        paddingVertical: 15,
        marginTop: 50,
        borderRadius: 25
    },
    buttonText: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 18
    },
})



export default observer(Screen5)