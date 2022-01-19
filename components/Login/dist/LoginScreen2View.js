"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var vector_icons_1 = require("@expo/vector-icons");
var loginStyles_1 = require("./loginStyles");
var mobx_react_1 = require("mobx-react");
var vector_icons_2 = require("@expo/vector-icons");
var expo_auth_session_1 = require("expo-auth-session");
var auth_1 = require("../services/auth");
var WebBrowser = require("expo-web-browser");
var Google = require("expo-auth-session/providers/google");
var firebase_1 = require("firebase");
var GoogleAuthentication = require("expo-google-app-auth");
WebBrowser.maybeCompleteAuthSession();
var Screen2 = function (_a) {
    var navigation = _a.navigation, route = _a.route;
    var loginViewModel = route.params.loginViewModel;
    var _b = expo_auth_session_1.useAuthRequest({
        clientId: auth_1.config.clientId,
        scopes: auth_1.config.scopes,
        usePKCE: false,
        redirectUri: expo_auth_session_1.makeRedirectUri({ native: 'adlib://' })
    }, auth_1.discovery), request = _b[0], response = _b[1], promptAsync = _b[2];
    var _c = Google.useAuthRequest({
        expoClientId: '37621229835-luuhbvirjhmvsimnh56ogr7itnt6skub.apps.googleusercontent.com',
        iosClientId: '37621229835-p2mofi2t37ceuokj7qr7ium88oc0rbgc.apps.googleusercontent.com',
        androidClientId: '37621229835-iip9djkfa7gm2f5dcj7o2nib9q9qv2vi.apps.googleusercontent.com',
        webClientId: '37621229835-t29knmebosp1j1qtmi1bf381pi1gottf.apps.googleusercontent.com'
    }), grequest = _c[0], gresponse = _c[1], gpromptAsync = _c[2];
    react_1["default"].useEffect(function () {
        if ((gresponse === null || gresponse === void 0 ? void 0 : gresponse.type) === 'success') {
            var authentication = gresponse.authentication;
            var credential = firebase_1["default"].auth.GoogleAuthProvider.credential(authentication === null || authentication === void 0 ? void 0 : authentication.idToken, authentication === null || authentication === void 0 ? void 0 : authentication.accessToken);
            firebase_1["default"].auth().signInWithCredential(credential).then(function (result) {
                return console.log(result.user);
            });
            // Successful sign in is handled by firebase.auth().onAuthStateChanged
        }
    }, [gresponse]);
    var signInWithGoogle = function () {
        return GoogleAuthentication.logInAsync({
            androidStandaloneAppClientId: '37621229835-iip9djkfa7gm2f5dcj7o2nib9q9qv2vi.apps.googleusercontent.comANDROID_STANDALONE_APP_CLIENT_ID',
            iosStandaloneAppClientId: '37621229835-p2mofi2t37ceuokj7qr7ium88oc0rbgc.apps.googleusercontent.com',
            scopes: ['profile', 'email']
        })
            .then(function (logInResult) {
            if (logInResult.type === 'success') {
                var idToken = logInResult.idToken, accessToken = logInResult.accessToken;
                var credential = firebase_1["default"].auth.GoogleAuthProvider.credential(idToken, accessToken);
                return firebase_1["default"].auth().signInWithCredential(credential);
                // Successful sign in is handled by firebase.auth().onAuthStateChanged
            }
            return Promise.reject(); // Or handle user cancelation separatedly
        })["catch"](function (error) {
            // ...
        });
    };
    return (react_1["default"].createElement(react_native_1.View, { style: styles.container },
        react_1["default"].createElement(react_native_1.Image, { source: require('../../assets/screen2.png'), style: styles.image }),
        react_1["default"].createElement(react_native_1.View, null,
            react_1["default"].createElement(react_native_1.View, null,
                react_1["default"].createElement(react_native_1.View, { style: { marginBottom: 30 } },
                    react_1["default"].createElement(vector_icons_2.FontAwesome.Button, { name: "spotify", borderRadius: 50, onPress: function () { return promptAsync().then(function () { return navigation.push('Screen5', route.params); }); }, color: "#000000", style: styles.loginScreenButton, size: 30 },
                        react_1["default"].createElement(react_native_1.Text, { style: styles.buttonText }, "Sign In with Spotify"))),
                react_1["default"].createElement(vector_icons_2.FontAwesome.Button, { name: "google", borderRadius: 50, onPress: function () {
                        signInWithGoogle();
                    }, color: "#000000", style: styles.loginScreenButton, size: 30 },
                    react_1["default"].createElement(react_native_1.Text, { style: styles.buttonText }, "Sign In with Google")))),
        react_1["default"].createElement(react_native_1.View, { style: loginStyles_1.navigatorStyles.bottomContainer },
            react_1["default"].createElement(react_native_1.View, { style: loginStyles_1.navigatorStyles.bottomRow },
                react_1["default"].createElement(react_native_1.TouchableOpacity, { onPress: function () { return navigation.goBack(); } },
                    react_1["default"].createElement(vector_icons_1.AntDesign, { name: "left", size: 24, color: "white" })),
                react_1["default"].createElement(react_native_1.View, { style: loginStyles_1.navigatorStyles.dotRow },
                    react_1["default"].createElement(react_native_1.TouchableOpacity, { style: loginStyles_1.navigatorStyles.greyDot }),
                    react_1["default"].createElement(react_native_1.TouchableOpacity, { style: loginStyles_1.navigatorStyles.whiteDot }),
                    react_1["default"].createElement(react_native_1.TouchableOpacity, { style: loginStyles_1.navigatorStyles.greyDot }),
                    react_1["default"].createElement(react_native_1.TouchableOpacity, { style: loginStyles_1.navigatorStyles.greyDot }),
                    react_1["default"].createElement(react_native_1.TouchableOpacity, { style: loginStyles_1.navigatorStyles.greyDot })),
                react_1["default"].createElement(react_native_1.TouchableOpacity, { onPress: function () { return navigation.push('Screen3', route.params); } },
                    react_1["default"].createElement(vector_icons_1.AntDesign, { name: "right", size: 24, color: "white" }))))));
};
var styles = react_native_1.StyleSheet.create({
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
        paddingVertical: 15
    },
    buttonText: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 18
    },
    image: {
        width: '80%',
        height: '50%',
        marginBottom: 50
    }
});
exports["default"] = mobx_react_1.observer(Screen2);
