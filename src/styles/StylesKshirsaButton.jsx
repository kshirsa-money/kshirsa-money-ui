import { StyleSheet } from "react-native";
import Colors from "./Colors";

const kshirsaButtonStyles = StyleSheet.create({
    container: {
        backgroundColor: Colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 40,
        alignItems: 'center',
        // width: 200,
        borderRadius: 50,
    },
    disabledContainer: {
        backgroundColor: Colors.black,
        // paddingVertical: 10,
        // paddingHorizontal: 40,
        // alignItems: 'center',
        // // width: 200,
        // borderRadius: 50,
    },
    text: {
        color: Colors.white,
        fontSize: 20,
    },
    iconContainer : {
        padding: 20,
        borderRadius: 50,
    }
})

export default kshirsaButtonStyles