import { StyleSheet } from "react-native";
import Colors from "./Colors";
import cssUtils from "../constants/cssUtils";

const recentTransactionStyles = StyleSheet.create({
    container: {
        // backgroundColor: 'white',
        // borderTopLeftRadius: 20,
        // borderTopRightRadius: 20,
        marginTop: 20,
        padding: 20,
        paddingBottom: 100
        // height: 400
    },
    titleWrapper: {
       flexDirection: 'row',
       justifyContent: 'space-between',
       alignItems: 'center',
    },
    title: {
        color: Colors.white,
        fontSize: cssUtils.mediumTextSize,
        fontWeight: cssUtils.mediumBold,
    },
    seeAllText: {
        color: Colors.lightGrey,
        fontSize: cssUtils.smallTextSize,
        fontWeight: cssUtils.smallBold,
        textDecorationLine: 'underline',
    },
    noDataText: {
        color: Colors.lightGrey,
        fontSize: cssUtils.smallTextSize,
        fontWeight: cssUtils.mediumBold,
        textAlign: 'center',
        marginTop: 20,
    }
    });

    export default recentTransactionStyles;