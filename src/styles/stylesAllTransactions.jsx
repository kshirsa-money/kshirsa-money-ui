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
        // zIndex: 10,
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
    },
    sortFilterWrapper: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        // backgroundColor: Colors.tabbaroverlay,
        // padding: 10,
        // borderTopLeftRadius: 100,
        // borderTopRightRadius: 100,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // paddingHorizontal: 20
    },
    footerText: {
        color: Colors.white,
        fontSize: cssUtils.smallTextSize,
        fontWeight: cssUtils.bold
    },
    footerBtn: {
        padding: 20,
        backgroundColor: Colors.generalCardBg,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 10
    },
    filterCount: {
        position: 'absolute',
        top: 10,
        right: 50,
        backgroundColor: Colors.moodyBlack,
        // padding: 5,
        height: 15,
        width: 15,
        borderRadius: 50,
        color: Colors.secondary,
        fontSize: cssUtils.textSize10,
        textAlign: 'center',
        fontWeight: cssUtils.bold
    }
})

export default allTransactionsStyle;