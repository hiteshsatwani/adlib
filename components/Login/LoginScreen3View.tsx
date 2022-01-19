import { NativeStackNavigationProp, NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react"
import { Text, TouchableOpacity, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { navigatorStyles } from "./loginStyles";
import { RootStackParamList } from "./LoginViewController";
import { observer } from "mobx-react";

type Props = NativeStackScreenProps<RootStackParamList, 'Screen1'>;



const Screen3= ({ navigation, route }: Props) => {

    const loginViewModel = route.params.loginViewModel;


    return (
        <View style={navigatorStyles.container}>
            <View >
                <Text style={{ color: '#ffffff' }}> {loginViewModel.testString}</Text>
            </View>

            <View style={navigatorStyles.bottomContainer}>
                <View style={navigatorStyles.bottomRow}>
                    <TouchableOpacity onPress={() => navigation.goBack()} >
                        <AntDesign name="left" size={24} color="white" />
                    </TouchableOpacity>
                    <View style={navigatorStyles.dotRow}>
                        <TouchableOpacity style={navigatorStyles.greyDot} />
                        <TouchableOpacity style={navigatorStyles.greyDot}  />
                        <TouchableOpacity style={navigatorStyles.whiteDot}  />
                        <TouchableOpacity style={navigatorStyles.greyDot} />
                        <TouchableOpacity style={navigatorStyles.greyDot} />
                    </View>
                    <TouchableOpacity onPress={() => navigation.push('Screen4', route.params)}>
                        <AntDesign name="right" size={24} color="white" />
                    </TouchableOpacity>

                </View>

            </View>
        </View>

    )
}



export default observer(Screen3)