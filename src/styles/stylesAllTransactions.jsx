import { StyleSheet } from "react-native";
import Colors from "./Colors";
import cssUtils from "../constants/cssUtils";
import { screenHeight } from "../constants/utils";

const allTransactionsStyle = StyleSheet.create({
    headerRight: {
        backgroundColor: Colors.generalCardBg,
        padding: 10,
        borderRadius: 5,
        paddingHorizontal: 20
        },
    filterText: {
        color: Colors.white,
        fontSize: cssUtils.smallTextSize,
    },
    flatList: {
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        position: 'relative',
        zIndex: 10,
        paddingHorizontal: 20,
        paddingTop: screenHeight * 0.13
    },
    noDataContainer: {
        // height: screenHeight,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 20,
        paddingHorizontal: 20
    },
    noDataText: {
        fontSize: cssUtils.smallTextSize,
        color: Colors.black,
        textAlign: 'center'
    }
})

export default allTransactionsStyle;