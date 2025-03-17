import { StyleSheet } from "react-native"
import Colors from "./Colors"
import { screenHeight } from "../constants/utils"
import cssUtils from "../constants/cssUtils"

const userInfoStyles = StyleSheet.create({
    container: {
        backgroundColor: Colors.moodyBlack,
        flex: 1,
        height: screenHeight * 0.4,
        justifyContent: 'center',
        alignItems: 'center',
        // borderColor: Colors.white,
        // borderWidth: 1,
    },
    profileImageWrapper: {
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100
    },
    userName: {
        color: Colors.white,
        fontSize: cssUtils.mediumBigTextSize,
        fontWeight: cssUtils.bold,
        marginTop: 10
    },
    userEmail: {
        color: Colors.lightGrey,
        fontSize: 15,
        marginTop: 5
    }
})

export default userInfoStyles