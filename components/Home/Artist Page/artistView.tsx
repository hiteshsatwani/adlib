import AntDesign from "@expo/vector-icons/build/AntDesign";
import FontAwesome from "@expo/vector-icons/build/FontAwesome";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Audio } from 'expo-av';
import * as Analytics from 'expo-firebase-analytics';
import { setCurrentScreen } from "expo-firebase-analytics";
import { LinearGradient } from "expo-linear-gradient";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { getArtistSongs } from "../../services/databaseServices";
import { useSwipe } from "../../util/swipeUtil";
import { StackParamList } from "../homeView";

type Props = NativeStackScreenProps<StackParamList, 'Artist'>;
setCurrentScreen('Aritst')

const Artist = ({ navigation, route }: Props) => {
    const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6)
    const [topSongs, settopSongs] = useState([]) as any

    function onSwipeLeft() {
    }

    function onSwipeRight() {
        navigation.goBack()
    }

    const data = route.params.data


    useEffect(() => {

        getArtistSongs(data.artistObj.data.id).then((data) => {
            settopSongs(data)
        })
        Analytics.logEvent('ArtistViewed', {
            screen: 'Artist',
            purpose: 'Viewed An Artist',
        });
    }, [])

    const Song = ({ data, idx }: any) => {

        const goToSong = () => {
            Linking.openURL(data.external_urls.spotify);
        }
        return (
            <View style={styles.songContainer}>
                <Image source={{ uri: data.album.images[0].url }} blurRadius={5}
                    style={styles.backgroundImg} />

                <View style={styles.innerContainer}>
                    <View style={{ justifyContent: "center", width: '100%' }}>
                        <Text style={styles.songName}>{idx}.  {data.name}</Text>
                    </View>
                    <View style={{ marginLeft: "auto", paddingRight: 15 }}>
                        <FontAwesome.Button
                            name="spotify"
                            borderRadius={25}
                            backgroundColor={'#1DB954'}
                            onPress={() => goToSong()}
                            color="#ffffff"
                            style={styles.playButton}
                            size={36}
                        />
                    </View>
                </View>
            </View>
        )
    }
    const followers = data.artistObj.data.followers.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")


    return (
        <View style={styles.container} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <Image source={{ uri: data.artistimg }} style={styles.backgroundImg} blurRadius={3} />
            <LinearGradient
                // Background Linear Gradient
                colors={['transparent', '#000000']}
                style={styles.backgroundGradient}
            />
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backbtn}>
                <AntDesign name="left" size={24} color="white" />
            </TouchableOpacity>
            <View style={styles.profileContainer}>
                <Image source={{ uri: data.artistimg }} style={styles.profileImage} />
                <Text style={styles.name}>{data.artistname}</Text>
            </View>
            <Text style={styles.followersText}>{followers} Followers</Text>
            <Text style={styles.topSongs}>Top Songs</Text>

            {topSongs ? <View style={styles.songsContainer}>

                <FlatList
                    data={topSongs}
                    renderItem={({ item }) => <Song data={item} idx={topSongs.indexOf(item) + 1} />}
                    extraData={topSongs}
                />
            </View> : <View><Text style={styles.loadingText} >Loading Data...</Text></View>}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: Dimensions.get('window').height,
        backgroundColor: '#000',
    },
    backgroundImg: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        opacity: 0.5
    },
    backgroundGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    profileContainer: {
        paddingTop: 10
    },
    profileImage: {
        height: 100,
        width: 100,
        borderRadius: 100,
        alignSelf: 'center'
    },
    name: {
        fontFamily: 'Montserrat_700Bold',
        color: 'white',
        fontSize: 35,
        textAlign: 'center',
        paddingTop: 30
    },
    followersText: {
        fontFamily: 'Montserrat_500Medium',
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        paddingTop: 5
    },
    loadingText: {
        fontFamily: 'Montserrat_500Medium',
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        paddingTop: 30
    },
    songsContainer: {
        paddingTop: 30,
        maxHeight: '44%'
    },
    songContainer: {
        width: Dimensions.get('window').width,
        height: 80,
        backgroundColor: '#000',
        marginVertical: 20
    },
    songName: {
        fontFamily: 'Montserrat_700Bold',
        color: 'white',
        fontSize: 18,
        textAlign: 'left',
        paddingLeft: 30,
        maxWidth: '80%'
    },
    innerContainer: {
        flexDirection: 'row',
        marginTop: 'auto',
        marginBottom: "auto"
    },
    playButton: {
        backgroundColor: '#1DB954',
        overflow: 'hidden',
        paddingLeft: 16,
        marginLeft: 'auto',
    },
    buttonText: {
        fontFamily: 'Montserrat_600SemiBold',
        fontSize: 14,
        color: '#fff'
    },
    topSongs: {
        fontFamily: 'Montserrat_700Bold',
        color: 'white',
        fontSize: 25,
        textAlign: 'center',
        paddingTop: 30
    },
    backbtn: {
        paddingTop: 60,
        paddingLeft: 20
    }
})

export default observer(Artist)