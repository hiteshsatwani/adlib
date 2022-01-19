import AntDesign from "@expo/vector-icons/build/AntDesign";
import { NavigationProp, RouteProp } from "@react-navigation/core";
import { Audio } from 'expo-av';
import * as Analytics from 'expo-firebase-analytics';
import { setCurrentScreen } from "expo-firebase-analytics";
import { LinearGradient } from "expo-linear-gradient";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { addToPlaylist, getPlaylists, getSongURI } from "../../services/databaseServices";
import { StackParamList } from "../homeView";

interface Props {
    navigation: NavigationProp<StackParamList, 'Playlist'>
    route: RouteProp<StackParamList, 'Playlist'>
}

interface Props2 {
    data: SpotifyApi.PlaylistObjectFull
}
setCurrentScreen('Playlist')

const addToPlayList = ({ navigation, route }: Props) => {

    const [Playlists, setPlaylists] = useState([]) as any


    useEffect(() => {
        getPlaylists().then((result) => {
            setPlaylists(result)
        })

    }, [])



    const trackid = route.params.trackid
    const trackname = route.params.trackname
    const trackimage = route.params.trackimage

    const Playlist = ({ data }: Props2) => {

        const buttonAction = async () => {
            const trackuri = await getSongURI(trackid)
            addToPlaylist(data.id, trackuri).then(() => {
                alert('Added to ' + data.name)
                navigation.goBack()
            })
            await Analytics.logEvent('PlaylistAdded', {
                screen: 'Playlist',
                purpose: 'Added a song to the playlist',
            });
        }

        if (data.owner.display_name == "Spotify") {
            return null
        } else {
            return (
                <View style={{ marginVertical: 20 }}>
                    <TouchableOpacity style={styles.buttonContainer} onPress={() => buttonAction()}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 20 }}>
                            <Image source={{ uri: data.images[0].url }} style={styles.albumimage} />
                        </View>
                        <Text style={styles.buttonText}>{data.name}</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    
    return (
        <View style={styles.container}>
            <Image source={{ uri: trackimage }} style={styles.backgroundImg} blurRadius={3} />

            <LinearGradient
                colors={['transparent', '#000000']}
                style={styles.backgroundGradient}
            />
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backbtn}>
                <AntDesign name="left" size={24} color="white" />
            </TouchableOpacity>
            <View style={{ paddingTop: 30 }}>
                <Text style={styles.heading}>Add To A Playlist</Text>
            </View>
            <View style={styles.playlistContainer}>
                <FlatList
                    data={Playlists.items}
                    renderItem={({ item }) => <Playlist data={item} />}
                />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: Dimensions.get('window').height,
        backgroundColor: '#000'
    },
    backgroundGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    heading: {
        fontFamily: 'Montserrat_700Bold',
        color: 'white',
        fontSize: 35,
        textAlign: 'center',
    },
    backgroundImg: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        opacity: 0.5
    },
    playlistContainer: {
        height: "70%",
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
    },
    buttonText: {
        fontFamily: 'Montserrat_700Bold',
        color: 'black',
        fontSize: 25,
        textAlign: 'center',
        maxWidth: '70%'
    },
    buttonContainer: {
        backgroundColor: '#ffffff',
        paddingVertical: 20,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    albumimage: {
        height: 150,
        width: 150,
    },
    backbtn: {
        paddingTop: 60,
        paddingLeft: 20
    }

})

export default observer(addToPlayList)