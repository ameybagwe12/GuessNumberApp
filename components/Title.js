import { Text, StyleSheet, Platform } from "react-native";
// Platform -> tells which platform we are running on

export default function Title(props) {
  return <Text style={styles.title}>{props.children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
    color: "white",
    textAlign: "center",
    // borderWidth: Platform.OS === "android" ? 2 : 0, // android platform
    borderWidth: Platform.select({ ios: 0, android: 2 }),
    borderColor: "#ddb52f",
    padding: 12,
    maxWidth: "80%",
    // minWidth: ""
  },
});
