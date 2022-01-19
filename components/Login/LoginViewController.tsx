import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Screen1 from './LoginScreen1View';
import React from 'react';
import Screen2 from './LoginScreen2View';
import Screen3 from './LoginScreen3View';
import Screen4 from './LoginScreen4View';
import Screen5 from './LoginScreen5View';
import LoginViewModel from './LoginViewModel';
import { observer } from 'mobx-react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export type RootStackParamList = {
    Screen1: { loginViewModel: LoginViewModel };
    Screen2: { loginViewModel: LoginViewModel };
    Screen3: { loginViewModel: LoginViewModel };
    Screen4: { loginViewModel: LoginViewModel };
    Screen5: { loginViewModel: LoginViewModel };
};

interface Props {
    loginViewModelA: LoginViewModel
}


const LoginViewController = ({ loginViewModelA }: Props) => {
    const LoginNavigationStack = createStackNavigator<RootStackParamList>()


    return (
        <SafeAreaProvider style={{ backgroundColor: "black" }}>

        <NavigationContainer >
            <LoginNavigationStack.Navigator initialRouteName="Screen1" screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                headerShown: false
            }}>
                <LoginNavigationStack.Screen name="Screen1" component={Screen1} initialParams={{ loginViewModel: loginViewModelA }} />
                <LoginNavigationStack.Screen name="Screen2" component={Screen2} initialParams={{ loginViewModel: loginViewModelA }} />
                <LoginNavigationStack.Screen name="Screen3" component={Screen3} initialParams={{ loginViewModel: loginViewModelA }} />
                <LoginNavigationStack.Screen name="Screen4" component={Screen4} initialParams={{ loginViewModel: loginViewModelA }} />
                <LoginNavigationStack.Screen name="Screen5" component={Screen5} initialParams={{ loginViewModel: loginViewModelA }} />
            </LoginNavigationStack.Navigator>
        </NavigationContainer>
        </SafeAreaProvider>
    )
}

export default observer(LoginViewController)