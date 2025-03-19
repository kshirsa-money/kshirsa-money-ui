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
        // backgroundColor: Colors.generalFocusBg,
        // flex: 1,
        paddingHorizontal: 20,
        // paddingBottom: 0,
        paddingTop: screenHeight * 0.13
    }
})

export default allTransactionsStyle;