import { StyleSheet } from "react-native";
import Colors from './Colors';
import cssUtils from "../constants/cssUtils";

export const addTransactionStyles = StyleSheet.create({
    container: {
        backgroundColor: Colors.moodyBlack,
        padding: 10,
        flex: 1,
        gap: 10,
    },
    transactionCardContainer: {
        backgroundColor: Colors.generalCardBg,
        margin: 10,
        borderRadius: 10,
        height: 280,
        overflow: 'hidden',
    },
    transactionType: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 0,
        gap: 0,
        // backgroundColor: Colors.primary,
    },
    transactionTypeText: {
        fontSize: cssUtils.smallTextSize,
        color: Colors.white,
        // flex: 1,
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 20,
        backgroundColor: Colors.generalFocusBg,
        // alignItems: 'center',
        textAlign: 'center',
    },
    transactionTypeFocus: {
        backgroundColor: Colors.generalCardBg,
        color: Colors.secondary,
        fontWeight: cssUtils.mediumBold,
    },
    cardRowBody: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        // alignItems: 'flex-end',
        gap: 10,
        // borderColor: Colors.darkGrey,
        // borderWidth: 1,
    },
    blankView: {
        width: '45%',
        padding: 10,
        alignItems: 'center',
    },
    categoryWrapper: {
        paddingHorizontal: 20,
        paddingVertical: 25,
        marginTop: 10,
        // backgroundColor: Colors.generalFocusBg,
        borderRadius: 10,
        minWidth: 80,
    },
    categoryName: {
        color: Colors.white,
        fontSize: cssUtils.mediumTextSize,
    },
    cardBody: {
        // alignItems: 'center',
        // justifyContent: 'space-between',
        // borderColor: Colors.darkGrey,
        // borderWidth: 1,
        flexDirection: 'column',
        flex: 1,
        paddingHorizontal: 20
    },
    paymentModeContainer: {
        fontSize: cssUtils.averageBigTextSize,
        padding: 10,
        gap: 10,
    },
    paymentModeWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        backgroundColor: Colors.generalFocusBg,
        borderRadius: 10,
    },
    rupeesText: {
        color: Colors.white,
        fontSize: cssUtils.bigTextSize,
        marginLeft: 10,
    },
    amountWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    amountInput: {
        color: Colors.white,
        textAlign: 'center',
        fontSize: cssUtils.bigTextSize,
    },
    transactionDateTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        // gap: 10,
    },
    calendarContainer: {
       flexDirection: 'row',
       alignItems: 'center',
       gap: 10,
    },
    calendarIcon: {
        backgroundColor: Colors.generalCardBg,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        padding: 9,
    },
    date: {
        color: Colors.white,
        fontSize: cssUtils.mediumTextSize,
    },
    timeContainer:{
        backgroundColor: Colors.generalCardBg,
        borderRadius: 10,
        padding: 10,
    },
    time: {
        color: Colors.white,
        fontSize: cssUtils.mediumTextSize,
    },
    transactionCategoryContainer: {
        backgroundColor: Colors.generalCardBg,
        height: 80,
        marginHorizontal: 10,
        borderRadius: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    leftSide: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        color: Colors.white,
    },
    categoryTextContainer: {
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 3,
        paddingBottom: 20,
    },
    categoryText: {
        color: Colors.lightGrey,
        fontSize: cssUtils.smallTextSize,
    },
    categoryName: {
        color: Colors.white,
        fontSize: cssUtils.smallTextSize,
    },
    transactionNotesContainer: {
        backgroundColor: Colors.generalFocusBg,
        height: 80,
        marginHorizontal: 10,
        borderRadius: 10,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 10,
    },
    leftSideNotes: {
        flex: 1,
    },
    notesInput: {
        textAlignVertical: 'top', // Ensures text starts from the top in multiline mode
        height: '100%', // Adjust as needed or remove if unnecessary
        multiline: true, // Allows text to wrap to the next line
        flex: 1, 
        padding: 10,
        color: Colors.white,
        height: '100%',
    },
    paymentModeOptionsContainer: {
        flexDirection: 'column',
        gap: 10,
        paddingHorizontal: 10,
        // marginHorizontal: 10,
    },
    paymentModeOption: {
        backgroundColor: Colors.moodyBlack,
        borderRadius: 40,
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // marginHorizontal: 10,
        marginVertical: 5,
        justifyContent: 'space-between',
        width: '100%',
        borderColor: Colors.darkGrey,
        borderWidth: 1,
    },
    paymentOptionLabel: {
        color: Colors.white,
        fontSize: cssUtils.smallTextSize,
    },
    buttonContainer: {
        // flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 10,
        position: 'absolute',
        // bottom: 50,
        right: 30,
        bottom: 0,
    }
    });