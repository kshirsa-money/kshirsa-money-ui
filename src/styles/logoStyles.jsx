import { StyleSheet } from "react-native"
import Colors from "./Colors"

export default logoStyles = StyleSheet.create({
    bigLogo: {
            width: 100,
            height: 100,
            resizeMode: 'contain',
            alignItems: 'center',
            textAlign: 'center',
        },
        bigLogoText: {
            color: Colors.primary,
            fontSize: 30,
            fontWeight: 'bold',
            fontStyle: 'italic',
            textAlign: 'center',
            width: 200,
        },
        mediumLogo: {
            width: 80,
            height: 80,
            resizeMode: 'contain',
            alignItems: 'center',
            textAlign: 'center',
        },
        mediumLogoText: {
            color: Colors.primary,
            fontSize: 20,
            fontWeight: 'bold',
            fontStyle: 'italic',
            textAlign: 'center',
            width: 200,
        },
        smallLogo: {
            width: 40,
            height: 40,
            resizeMode: 'contain',
            alignItems: 'center',
            textAlign: 'center',
        },
})