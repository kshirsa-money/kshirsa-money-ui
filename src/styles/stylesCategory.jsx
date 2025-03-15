import { StyleSheet } from "react-native";
import Colors from "./Colors";
import cssUtils from "./../constants/cssUtils";
import { screenHeight } from "../constants/utils";

const categoryStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.moodyBlack,
    },
    transactionTypeContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 20,
        borderRadius: 10, // Rounded corners for the whole container
        overflow: 'hidden', // Ensure child elements respect the border radius
        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        marginHorizontal: 20,
        backgroundColor: Colors.transactionCardBg,
    },
    transactionTypeText: {
        color: Colors.white,
        fontSize: cssUtils.textSize10,
        fontWeight: cssUtils.bold,
    },
    transactionTypeBtn: {
        width: '33.33%', // Ensure each tab has the same width and no gaps
        padding: 10,
        alignItems: 'center',
        borderRadius: 10, // Rounded corners for the whole container
    },
    selectedTransactionTypeBtn: {
        backgroundColor: Colors.primary, // Change background color when selected
    },
    categoryWrapper: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginHorizontal: 20,
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: Colors.transactionCardBg,
    },
    categoryText: {
        color: Colors.white,
        fontSize: cssUtils.mediumTextSize,
        fontWeight: cssUtils.bold,
    },
    categoryDesc: {
        color: Colors.darkGrey,
        fontSize: cssUtils.smallTextSize,
    },
    categoryContainer: {
        // marginTop: 80,
        // width: '100%',
        // flex: 1,
        height: screenHeight* 0.6,
        // marginRight: 20,
    },
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -60,
        marginBottom: 160,
    },
    noDataText: {
        color: Colors.white,
        fontSize: cssUtils.mediumTextSize,
        fontWeight: cssUtils.bold,
        textAlign: 'center',
    },
    categoryList: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '100%',
        // justifyContent: 'space-between',
    },
    categoryBtn: {
        flexDirection: 'row',
        // justifyContent: 'flex-end',
        alignItems: 'center',
        marginHorizontal: 20,
        padding: 10,
        borderRadius: 10,
        backgroundColor: Colors.generalCardBg,
        marginTop: 20,
        width: 'fit-content',
        alignSelf: 'flex-end',
        gap: 10,
    },
    modalContainer: {
        height: 'fit-content',
        gap: 20,
        paddingVertical: 20,
    },
    popupContainer: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        // borderColor: Colors.darkGrey,
        // borderWidth: 1,
    }
});

export default categoryStyles;