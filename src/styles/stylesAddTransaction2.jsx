import { StyleSheet } from "react-native";
import Colors from "./Colors";
import cssUtils from "../constants/cssUtils";
import { screenWidth } from "../constants/utils";

const addTransactionStyles2 = StyleSheet.create({
    headerContainer: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20
        // justifyContent: 'space-between',
    },
    backButton: {
        backgroundColor: Colors.generalFocusBg,
        // padding: 10,
        borderRadius: 20,
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addNewTransactionTextWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        // marginTop: 20

    },
    addText: {
        color: Colors.white,
        fontSize: cssUtils.textSize25,
        fontWeight: cssUtils.bold,
    },
    transactionTypeBtn: {
        backgroundColor: Colors.generalFocusBg,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        width: 'fit-content'
    },
    transactionTypeTxt: {
        color: Colors.secondary,
        fontSize: cssUtils.textSize21,
        fontWeight: cssUtils.bold,
    },
    transactionTypeTxtMap: {
        color: Colors.secondary,
        fontSize: cssUtils.textSize18,
        fontWeight: cssUtils.bold,
    },
    transactionTypeTxtnonSelected: {
        color: Colors.white,
        fontSize: cssUtils.textSize18,
        // fontWeight: cssUtils.bold,
    },
    transactionTypeDropdown: {
        backgroundColor: Colors.generalFocusBg,
        padding: 10,
        borderRadius: 10,
        position: 'absolute',
        top: 60,
        right: 50,
        zIndex: 1,
        width: screenWidth * 0.7,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    amountInput: {
        color: Colors.white,
        fontSize: cssUtils.bigTextSize,
        fontWeight: cssUtils.bold,
        // width: '100%',
        textAlign: 'center',
        // borderColor: Colors.white,
        // borderBottomWidth: 1,
    },
    amountContainer: {
        // backgroundColor: Colors.generalFocusBg,
        marginTop: 20,
        padding: 10,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    amountMainContainer: {
        flexDirection: 'column',
        gap: 10,
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingVertical: 20,
        // gap: 20
    },
    categoryBtn: {
        backgroundColor: Colors.generalFocusBg,
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: '49%',
        justifyContent: 'space-between',
    },
    categoryTxt: {
        color: Colors.white,
        fontSize: cssUtils.textSize14,
        fontWeight: cssUtils.bold,
    },
    transactionDateTimeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        paddingBottom: 20,
    },
    calendarContainer: {
        backgroundColor: Colors.generalFocusBg,
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '62%',
        gap: 20
        // height: 100
    },
    date: {
        color: Colors.white,
        fontSize: cssUtils.textSize14,
    },
    RecurringBtn: {
        backgroundColor: Colors.generalFocusBg,
        padding: 10,
        borderRadius: 10,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '36%',
    },
    recurringTxt: {
        color: Colors.white,
        fontSize: cssUtils.textSize18,
    },
    isRecurring: {
        color: Colors.white,
        fontSize: cssUtils.textSize14,
        fontStyle: 'italic',
        width: 30,
    }
})

export default addTransactionStyles2;