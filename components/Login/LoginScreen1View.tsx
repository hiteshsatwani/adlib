import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react"
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { navigatorStyles } from "./loginStyles";
import { RootStackParamList } from "./LoginViewController";
import { observer } from "mobx-react";

type Props = NativeStackScreenProps<RootStackParamList, 'Screen1'>;



const Screen1 = ({ navigation, route }: Props) => {

    const loginViewModel = route.params.loginViewModel;


    return (
        <View style={styles.container}>
            <View >
                <Text style={styles.heading}>WELCOME TO ADLIB</Text>
                <Text style={styles.subtext}>Start listening to music based on what you like</Text>
            </View>

            <View style={navigatorStyles.bottomContainer}>
                <View style={navigatorStyles.bottomRow}>
                    {/* <TouchableOpacity onPress={() => navigation.push('Screen1', route.params)} style={{display: 'none'}}>
                        <AntDesign name="left" size={24} color="white" />
                    </TouchableOpacity> */}
                    <View style={navigatorStyles.dotRow1}>
                        <TouchableOpacity style={navigatorStyles.whiteDot} />
                        <TouchableOpacity style={navigatorStyles.greyDot} />
                        <TouchableOpacity style={navigatorStyles.greyDot} />
                        <TouchableOpacity style={navigatorStyles.greyDot} />
                        <TouchableOpacity style={navigatorStyles.greyDot} />
                    </View>
                    <TouchableOpacity onPress={() => navigation.push('Screen2', route.params)}>
                        <AntDesign name="right" size={24} color="white" />
                    </TouchableOpacity>

                </View>

            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
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
    }
})



export default observer(Screen1)