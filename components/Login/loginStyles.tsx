import { StyleSheet } from "react-native";

export const navigatorStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomContainer: {
        position: 'absolute', //Here is the trick
        bottom: 0,
        paddingBottom: 75
    },
    bottomRow: {
        flex: 1,
        flexDirection: 'row'
    },
    whiteDot: {
        marginTop: 7,
        height: 8,
        width: 8,
        backgroundColor: '#ffffff',
        borderRadius: 5,
        marginHorizontal: 5
    },
    greyDot: {
        marginTop: 7,
        height: 8,
        width: 8,
        backgroundColor: '#c4c4c4',
        borderRadius: 5,
        marginHorizontal: 5
    },
    dotRow: {
        flexDirection: "row",
        marginHorizontal: 100
        
    },
    dotRow1: {
        flexDirection: "row",
        marginRight: 110,
        marginLeft: 150
    }
});