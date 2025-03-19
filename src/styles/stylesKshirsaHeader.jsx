import { StyleSheet } from "react-native";
import { screenHeight } from "../constants/utils";
import Colors from "./Colors";
import cssUtils from "../constants/cssUtils";

const kshirsaHeaderStyles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: Colors.tabbaroverlay,
        height: screenHeight * 0.13,
        position: 'absolute',
        top: 10, 
        width: '100%',
        zIndex: 1000,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        justifyContent: 'center',
    },
    back: {
        padding: 10,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        fontSize: cssUtils.mediumTextSize,
        fontWeight: cssUtils.mediumBold,
        color: Colors.white,
    }
})

export default kshirsaHeaderStyles;