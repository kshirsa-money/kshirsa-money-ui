import { StyleSheet } from "react-native";
import { screenWidth } from "../constants/utils";
import Colors from "./Colors";
import cssUtils from "../constants/cssUtils";

const kshirsaFeturesStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 10,
        gap: 10,
        height: screenWidth*0.8,
        // backgroundColor: Colors.white,
    },
    card: {
        width: screenWidth*0.45,
        paddingHorizontal: 10,
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        backgroundColor: Colors.transactionCardBg,
        borderColor: Colors.secondary,
        borderWidth: 1,
        borderRadius: 10,
    },
    cardTitle: {
        color: Colors.darkGrey,
        fontSize: cssUtils.smallTextSize,
    }
})

export default kshirsaFeturesStyles;