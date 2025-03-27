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
        height: screenHeight* 0.6,
        justifyContent: 'center',
        alignItems: 'center',
        // alignSelf: 'center',
        width: '100%',
        paddingHorizontal: 20,
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
        // justifyContent: 'flex-start',
        width: '100%'

    },
    categoryItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: Colors.transactionCardBg,
    }
});

export default categoryStyles;