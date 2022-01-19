import { AntDesign } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Audio } from 'expo-av';
import { setCurrentScreen } from 'expo-firebase-analytics';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from 'react-native-gesture-handler';
import { RootStackParamList } from '../AppViewController';
import { getProfileData, getSongData, removeLike, signOut } from "../services/databaseServices";
type Props = NativeStackScreenProps<RootStackParamList, 'Profile'>;

setCurrentScreen('Profile')
const Profile = ({ navigation, route }: Props) => {
    const [profileData, setprofileData] = useState(null) as any
    const [trackData, settrackData] = useState(null) as any


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            Audio.setIsEnabledAsync(false)
            getProfileData().then((result2) => {
                setprofileData(result2)
                getSongData(result2?.liked_tracks).then((result3) => {
                    settrackData(result3.tracks.reverse())
                })
            })

        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        Audio.setIsEnabledAsync(false)
        getProfileData().then((result2) => {
            setprofileData(result2)
            getSongData(result2?.liked_tracks).then((result3) => {
                settrackData(result3.tracks.reverse())
            })
        })
    }, [])

    const unLike = (trackid: string) => {
        removeLike(trackid, profileData.userid, "spotify")
    }

    const signOutButton =( ) => {
        signOut()
        route.params.loginViewModel.isLoggedIn = "false"
        route.params.loginViewModel.setSpotifyAccessToken('')
    }

    const Song = ({ data }: any) => {
        return (
            <View style={styles.songContainer}>
                <Image source={{ uri: data.album.images[0].url }} blurRadius={5}
                    style={styles.backgroundImg} />
                <View style={styles.innerContainer}>
                    <Text style={styles.songName}>{data.name}</Text>
                    <Ionicons onPress={() => unLike(data.id)} name="heart" size={33} color="#1DB954" style={{ marginLeft: 'auto', paddingRight: 30 }} />
                </View>
            </View>
        )
    }
    return (
        <View style={styles.container}>
            <LinearGradient
                // Background Linear Gradient
                colors={['transparent', '#1D6000']}
                style={styles.backgroundGradient}
            />
            <View>
                <TouchableOpacity style={styles.logout} onPress={() => signOutButton()}>
                    <AntDesign name="logout" size={24} color="white" />
                </TouchableOpacity>
                {profileData ?
                    <View>
                        <View style={styles.profileContainer}>
                            <Image source={{ uri: profileData.profilehref }} style={styles.profileImage} />
                            <Text style={styles.name}>{profileData.name}</Text>
                        </View>
                        <Text style={styles.likedText}>{profileData.no_liked == 1 ? profileData.no_liked + " track liked" : profileData.no_liked + " tracks liked"}</Text>
                        <View style={styles.songsContainer}>
                            {trackData !== null ?
                                <FlatList
                                    data={trackData}
                                    renderItem={({ item }) => <Song data={item} />}
                                    extraData={trackData}
                                />
                                : null}
                        </View>
                    </View>
                    :
                    <View style={{ flex: 1, backgroundColor: '#000000', alignContent: 'center', justifyContent: 'center' }}>
                        <ActivityIndicator size="large" color="#1DB954" />
                    </View>
                }
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: Dimensions.get('window').height,
        backgroundColor: '#000',
    },
    name: {
        fontFamily: 'Montserrat_700Bold',
        color: 'white',
        fontSize: 35,
        textAlign: 'center',
        paddingTop: 30
    },
    profileContainer: {
        paddingTop: 20
    },
    profileImage: {
        height: 100,
        width: 100,
        borderRadius: 100,
        alignSelf: 'center'
    },
    likedText: {
        fontFamily: 'Montserrat_500Medium',
        color: 'white',
        fontSize: 18,
        textAlign: 'center',
        paddingTop: 5
    },
    backgroundGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
    backgroundImg: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        opacity: 0.5
    },
    songsContainer: {
        paddingTop: 50,
        maxHeight: '60%'
    },
    songContainer: {
        width: Dimensions.get('window').width,
        height: 80,
        backgroundColor: '#000',
        marginVertical: 10
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
    logout: {
        paddingTop: 50,
        marginLeft: "auto",
        paddingRight: 30
    }
})

export default Profile