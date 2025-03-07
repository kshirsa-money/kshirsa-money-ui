import { StyleSheet, Dimensions } from "react-native";
import Colors from "./Colors";

const SCREEN_WIDTH = Dimensions.get("window").width;

const transactionCardStyles = StyleSheet.create({
  swipeContainer: {
    position: "relative",
    width: "100%",
    overflow: "hidden",
  },
  actionContainer: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    gap: 10,
    alignItems: "center",
    justifyContent: "center",
    width: SCREEN_WIDTH * 0.3,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: Colors.danger,
    borderRadius: 20,
  },
  editButton: {
    backgroundColor: Colors.secondary,
    padding: 10,
    borderRadius: 10,
  },
  deleteButton: {
    backgroundColor: Colors.red,
    padding: 10,
    borderRadius: 10,
  },
  container: {
    backgroundColor: Colors.normalInputBg,
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  rightContainer: {
    alignItems: "flex-end",
    gap: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 14,
    color: Colors.lightGrey,
  },
  amount: {
    fontSize: 16,
    color: Colors.white,
  },
});

export default transactionCardStyles;
