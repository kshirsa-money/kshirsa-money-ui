import { StyleSheet } from "react-native";
import Colors from "./Colors";
import cssUtils from "../constants/cssUtils";
import { screenWidth } from "../constants/utils";

const allTransactionFilterStyles = StyleSheet.create({
    container: {
        height: "70%"
    },
    transactionTypeWrapper: {
        flexDirection: "column",
        justifyContent: "space-between",
        // borderColor: Colors.darkGrey,
        // borderWidth: 1,
    },
    transactionType: {
        marginTop: 20,
        flexDirection: "row",
        justifyContent: "center",
        gap: 10
    },
    transactionText: {
        color: Colors.white,
        fontWeight: cssUtils.bold,
        fontSize: cssUtils.smallTextSize
    },
    transactionTypeText: {
        color: Colors.white,
        fontSize: cssUtils.mediumTextSize
    },
    transactionTypeTextSelected: {
        color: Colors.moodyBlack,
        fontSize: cssUtils.mediumTextSize
    },
    transactionTypeMap: {
        paddingHorizontal: 15,
        paddingVertical: 5,
        // backgroundColor: Colors.darkGrey,
        borderRadius: 50,
        borderColor: Colors.normalInputBg,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    selectedTransactionType: {
        backgroundColor: Colors.secondary,
        color: Colors.black
    },
    unselectedTransactionType: {
        backgroundColor: Colors.darkGrey,
        color: Colors.white
    },
    dateWrapper: {
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 20
    },
    dateRangeWrapper: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    dateBtn: {
        padding: 10,
        paddingHorizontal: 20,
        // backgroundColor: Colors.darkGrey,
        borderRadius: 50,
        justifyContent: "space-between",
        alignItems: "center",
        borderColor: Colors.normalInputBg,
        borderWidth: 1,
        flexDirection: "row",
        width: screenWidth * 0.40
    },
    dateText: {
        color: Colors.white,
        fontSize: cssUtils.smallTextSize
    },
    footer: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    clearBtn: {
        width: '45%',
        paddingVertical: 10,
        backgroundColor: Colors.darkGrey,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    applyBtn: {
        width: '45%',
        paddingVertical: 10,
        backgroundColor: Colors.secondary,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center"
    },
    applyText: {
        color: Colors.black,
        fontSize: cssUtils.mediumTextSize
    },
    clearText: {
        color: Colors.white,
        fontSize: cssUtils.mediumTextSize
    },
    dateRangeBtnWrapper: {
        flexDirection: "row",
        justifyContent: "flex-start",
        gap: 20
    },
    dateRangeBtn: {
        padding: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        borderColor: Colors.normalInputBg,
        borderWidth: 1,
        flexDirection: "row",
    },
    selectedDateRange: {
        backgroundColor: Colors.secondaryOverlay,
        color: Colors.black,
        borderWidth: 0
    },
    selectedDateRangeText: {},
    dateRangeText: {
        color: Colors.white,
        fontSize: cssUtils.smallTextSize
    },
    yearMonthWrapper: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 20
    },
    yearMonthWrapper: {
        flexDirection: "row",
        justifyContent: "center",
        gap: 10,
        flexWrap: "wrap"
    },
    yearMonthBtn: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        borderColor: Colors.normalInputBg,
        borderWidth: 1,
        flexDirection: "row",
    },
    yearMonthText: {
        color: Colors.darkGrey,
        fontSize: cssUtils.smallTextSize
    },
    selectedYearMonth: {
        backgroundColor: Colors.secondary,
        color: Colors.black,
        borderWidth: 0
    },
    selectedYearMonthText: {
        color: Colors.black
    }
});

export default allTransactionFilterStyles;