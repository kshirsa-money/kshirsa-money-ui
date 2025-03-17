import { StyleSheet } from "react-native";
import Colors from "./Colors";
import cssUtils from "../constants/cssUtils";

const registrationStyles = StyleSheet.create({
container: {
    flex: 1,
    paddingVertical: 60,
    paddingHorizontal: 40,
    backgroundColor: Colors.moodyBlack,
    justifyContent: 'space-between',
    alignItems: 'center',
},
body: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 60,

},
stepContainer: {
    paddingTop: 40,
    justifyContent: 'center',
     alignItems: 'center',
    },
    signupTitle: {
        color: Colors.white,
        fontSize: cssUtils.mediumTextSize,
        fontWeight: cssUtils.bold,
        marginBottom: 20,
    },
    label: {
        color: Colors.white,
        fontSize: cssUtils.smallTextSize,
        fontWeight: cssUtils.bold,
        marginBottom: 20,
    },
    selectCountrywrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
        borderColor: Colors.secondary,
        borderBottomWidth: 2,
        marginBottom: 40
    },
    countryPickerTheme: {
        primaryColor: Colors.secondary,
        backgroundColor: Colors.moodyBlack,
        onBackgroundTextColor: Colors.white 
    },
    nextBtn: {
        width: 150,
        borderColor: Colors.secondary,
        borderWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        flexDirection: 'row',
    },
    nextBtnLabel: {
        color: Colors.white,
        fontSize: cssUtils.smallTextSize,
        fontWeight: cssUtils.bold,
    }
})

export default registrationStyles;