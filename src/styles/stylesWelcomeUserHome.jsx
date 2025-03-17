import { StyleSheet } from "react-native";
import Colors from "./Colors";
import cssUtils from "../constants/cssUtils";

const welcomeUserHomeStyles = StyleSheet.create({
    container: {
        padding: 20,
        paddingTop: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    leftContainer: {
        flexDirection: 'column',
    },
    timeText: {
        color: Colors.white,
        fontSize: cssUtils.mediumTextSize,
        fontWeight: cssUtils.bold,
    },
    nameText: {
        color: Colors.white,
        fontSize: cssUtils.averageBigTextSize,
        fontWeight: cssUtils.bold,
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 50,
        shadowColor: Colors.black,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
    },
    extraStyles: {
        color: Colors.white
    }
    });

export default welcomeUserHomeStyles;