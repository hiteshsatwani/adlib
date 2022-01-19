import FontAwesome from "@expo/vector-icons/build/FontAwesome";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { NavigationProp, RouteProp } from "@react-navigation/core";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import VisibilitySensor from '@svanboxel/visibility-sensor-react-native';
import { Audio } from 'expo-av';
import * as Analytics from 'expo-firebase-analytics';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Dimensions, Image, Linking, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { RootStackParamList } from "../AppViewController";
import { ResponseModel } from "../dataModels/responseModel";
import { likeTrack, removeLike } from "../services/databaseServices";
import { tryColor } from "../util/colorPicker";
import { useSwipe } from "../util/swipeUtil";
import { StackParamList } from "./homeView";

type Props2 = NativeStackScreenProps<RootStackParamList, 'Home'>;



interface Props {
    data: ResponseModel
    flow: string
    likedata: string[]
    navigation: NavigationProp<StackParamList>
    route: RouteProp<StackParamList>
}
const Post = ({ data, flow, likedata, navigation, route }: Props) => {
    const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6)
    const [isPlaying, setIsPlaying] = useState(false)

    function onSwipeLeft() {
        navigation.navigate('Artist', { data: data })
        Haptics.selectionAsync()
    }

    function onSwipeRight() {
        console.log('SWIPE_RIGHT')
    }


    const [gradientColor, setgradientColor] = useState('#000000')
    const [sound, setSound] = React.useState() as any;

    const [isLiked, setIsLiked] = useState(false)

    useEffect(() => {
        Analytics.logEvent('SongLoaded', {
            screen: 'Home',
            purpose: 'Views a Song',
        });
        if (likedata.includes(data.trackid)) {
            setIsLiked(true)
        }

        console.log(data.trackbg)


    }, [])


    // const handleImageVisibility = async (visible: any) => {
    //     if (visible == true) {
            
    //         Audio.setIsEnabledAsync(true)
    //         playSound()
            
    //     } else {
    //         pauseSound()
    //     }
    // }

    var lastTap: any = null;
    const handleDoubleTap = () => {
        const now = Date.now();
        const DOUBLE_PRESS_DELAY = 200;
        if (lastTap && (now - lastTap) < DOUBLE_PRESS_DELAY) {
            onLikePress()
        } else {
            lastTap = now;
        }
    }

    

    const onLikePress = () => {
        Haptics.selectionAsync()

        if (isLiked == true) {
            Analytics.logEvent('SongUnLike', {
                screen: 'Home',
                purpose: 'Unliked a song',
            });
            removeLike(data.trackid, data.userid, flow)
            setIsLiked(!isLiked);
        } else {
            Analytics.logEvent('SongLike', {
                screen: 'Home',
                purpose: 'Liked a song',
            });
            likeTrack(data.trackid, data.userid, flow)
            setIsLiked(!isLiked);
        }
    };

    const openspotify = () => {
        Analytics.logEvent('SongOpened', {
            screen: 'Home',
            purpose: 'Opened a song on spotify',
        });
        Linking.openURL(data.trackhref);
    }

    const addToPlaylist = () => {
        navigation.navigate('Playlist', { trackid: data.trackid, trackname: data.trackname, trackimage: data.trackbg })
    }





    return (
            <TouchableWithoutFeedback onPress={handleDoubleTap}>
                <View style={styles.container} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
                    <Image source={{ uri: data.trackbg }}
                        style={styles.background}
                        resizeMode={'cover'}
                        blurRadius={3}
                    />
                    <LinearGradient colors={['transparent', gradientColor]}
                        style={styles.backgroundGradient}
                    />
                    <View style={styles.uiContainer}>
                        <Text style={styles.subtext}>
                            {data.trackname}
                        </Text>
                        <Text style={styles.heading}>
                            {data.artistname}
                        </Text>
                        {/* <VisibilitySensor onChange={handleImageVisibility} > */}

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => addToPlaylist()}>
                                <Ionicons name="add-circle-outline" size={35} color="#1DB954" style={{ paddingRight: 25, paddingTop: 10 }} />
                            </TouchableOpacity>
                            
                            <FontAwesome.Button
                                name="spotify"
                                borderRadius={50}
                                onPress={() => openspotify()}
                                color="#ffffff"
                                style={styles.playButton}
                                size={30}
                            >
                                <Text style={styles.buttonText}>Play</Text>
                            </FontAwesome.Button>
                            <TouchableOpacity onPress={() => onLikePress()}>
                                {isLiked ? <Ionicons name="heart" size={33} color="#1DB954" style={{ paddingLeft: 25, paddingTop: 10 }} /> : <Ionicons name="heart-outline" size={33} color="#1DB954" style={{ paddingLeft: 25, paddingTop: 10 }} />}
                            </TouchableOpacity>
                        </View>
                        {/* </VisibilitySensor> */}
                    </View>
                </View>
            </TouchableWithoutFeedback>
    )
}

export default observer(Post)

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        backgroundColor: '#000',
    },
    heading: {
        fontFamily: 'Montserrat_700Bold',
        color: '#ffffff',
        fontSize: 35,
        marginHorizontal: 20,
        textAlign: "center"
    },
    subtext: {
        fontFamily: 'Montserrat_700Bold',
        color: '#ffffff',
        fontSize: 25,
        marginBottom: 20,
        textAlign: "center",
        paddingHorizontal: 10
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        opacity: 0.5,
    },
    backgroundGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    uiContainer: {
        height: '85%',
        alignItems: "center",
        justifyContent: 'flex-end',
    },
    playButton: {
        backgroundColor: '#1DB954',
        overflow: 'hidden',
        paddingHorizontal: 50,
        paddingVertical: 15,
    },
    buttonText: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 18,
        color: '#fff'
    },
    buttonContainer: {
        marginTop: 40,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: "center"
    }
})