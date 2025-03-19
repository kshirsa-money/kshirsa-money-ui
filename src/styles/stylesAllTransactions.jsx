import { StyleSheet } from "react-native";
import Colors from "./Colors";
import cssUtils from "../constants/cssUtils";

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
    }
})

export default allTransactionsStyle;