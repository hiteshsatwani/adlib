import { NavigationContainer } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack";
import { setCurrentScreen } from "expo-firebase-analytics";
import { observer } from "mobx-react-lite";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Dimensions, FlatList, FlatListProps, StyleSheet, View, ViewToken, Text } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RootStackParamList } from "../AppViewController";
import { postData, ResponseModel } from "../dataModels/responseModel";
import { getSpotifyAuthToken } from "../services/auth";
import { getStoredUserData } from "../services/databaseServices";
import { getDataSpotify } from "../services/dataService";
import Artist from './Artist Page/artistView';
import addToPlaylistView from "./Playlists Page/addToPlaylistView";
import Post from './post';
import * as Analytics from 'expo-firebase-analytics';

import { Audio } from 'expo-av'
type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;
type Props2 = NativeStackScreenProps<StackParamList, 'Home'>;
setCurrentScreen('Home')

export type StackParamList = {
    Home: undefined
    Artist: { data: ResponseModel },
    Playlist: { trackid: string, trackname: string, trackimage: string }
};

interface Props3 {
    viewableItems: ViewToken[]
}


const Home = ({ navigation, route }: Props) => {

    const [posts, setposts] = useState<postData[]>([])
    const [likedata, setlikedata] = useState([])
    const flow = route.params.flow
    const yourRef = useRef<FlatList>(null)


    useEffect(() => {

        if (flow == 'spotify') {
            initLoad()
        }

    }, [])

    const loadMore = async () => {
        const token = await getSpotifyAuthToken()
        const newdata = await getDataSpotify(token)
        setposts(newdata)
    }

    const initLoad = async () => {
        const token = await getSpotifyAuthToken()
        const newdata = await getDataSpotify(token)
        const userdata = await getStoredUserData(newdata[0].userid, "spotify")
        setlikedata(userdata?.liked)
        setposts(newdata)
    }

    const onViewableItemsChanged = async ({ viewableItems }: Props3) => {
        console.log("Visible items are", viewableItems[0].index)
        await Analytics.logEvent('SongListened', {
            screen: 'Home',
            purpose: 'Views a Song',
        });
        await stopSound()
        await playSound(viewableItems[0].item.tracklink)
    }

    const playCurrent = () => {

    }


    const playSound = async (tracklink: string) => {
        Audio.setIsEnabledAsync(true)
        const { sound } = await Audio.Sound.createAsync({ uri: tracklink });
        await sound.setIsLoopingAsync(true)
        await sound.playAsync();
    }

    const stopSound = async () => {
        Audio.setIsEnabledAsync(false)
    }




    const NavigationStack = createStackNavigator<StackParamList>()

    const defaultHome = ({ navigation, route }: Props2) => {
        return (
            <View style={styles.container}>
                {posts.length > 0 ? <FlatList
                    data={posts}
                    renderItem={({ item }) => <Post data={item} flow={flow} likedata={likedata} route={route} navigation={navigation} />}
                    showsVerticalScrollIndicator={false}
                    snapToInterval={Dimensions.get('window').height}
                    snapToAlignment={'start'}
                    decelerationRate={'fast'}
                    onEndReachedThreshold={0.5}
                    onEndReached={loadMore}
                    keyExtractor={(item, index) => index.toString()}
                    ref={yourRef}
                    scrollsToTop={false}
                    onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={{
                        itemVisiblePercentThreshold: 50
                    }}
                />

                    :
                    <View style={styles.container}>
                        <ActivityIndicator size="large" color="#1DB954" />
                        <Text>truedat</Text>
                    </View>
                }

            </View>
        )
    }

    return (
        <SafeAreaProvider style={{ backgroundColor: "black" }}>
            <NavigationContainer independent={true}  >
                <NavigationStack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false, cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS, }} >
                    <NavigationStack.Screen name="Home" component={defaultHome} />
                    <NavigationStack.Screen name="Artist" component={Artist} />
                    <NavigationStack.Screen name="Playlist" component={addToPlaylistView} />
                </NavigationStack.Navigator>
            </NavigationContainer>
        </SafeAreaProvider>

    )


}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: Dimensions.get('window').height,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    }
})


export default observer(Home)


