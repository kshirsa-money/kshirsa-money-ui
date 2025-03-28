import { StyleSheet } from "react-native";
import { screenWidth } from "../constants/utils";
import cssUtils from "../constants/cssUtils";
import Colors from "./Colors";

const voiceToTextStyles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    background: {
      ...StyleSheet.absoluteFillObject,
    },
    blob: {
      position: "absolute",
      top: "20%",
      left: "20%",
      opacity: 0.4,
    },
    blurContainer: {
      flex: 1,
      width: screenWidth,
      padding: 20,
    },
    introduceTxt: {
      fontSize: cssUtils.textSize20,
      color: Colors.secondary,
      fontWeight: cssUtils.bold
    },
    headerContainer: {
      alignItems: "center",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    tapTxt: {
        fontSize: cssUtils.textSize14,
        color: Colors.darkGrey,
        // fontWeight: cssUtils.bold,
        textAlign: "center",
        marginTop: 40,
    },
    bottomContainer: {
        flex: 1,
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "space-between",
        // borderColor: Colors.white,
        // borderWidth: 1,
    },
    buttonContainer: {
        // width: screenWidth * 0.8,
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'row',
        gap: 0,
        paddingBottom: 40
    },
    button: {
        // padding: 15,
        borderRadius: 100,
        padding: 15,
        borderColor: Colors.deepMove,
        borderWidth: 1,
    },
    exampleTxt: {
        fontSize: cssUtils.textSize30,
        color: Colors.white,
        fontWeight: cssUtils.bold,
        textAlign: "center",
    }
  });

    export default voiceToTextStyles;
  