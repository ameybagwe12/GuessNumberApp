import { View, Text, StyleSheet, Dimensions } from "react-native";
// dimensions is an API as Alert

export default function NumberContainer(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{props.children}</Text>
    </View>
  );
}

const deviceWidth = Dimensions.get("window").width;
// window excludes status bar while screen includes it

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: "yellow",
    padding: deviceWidth < 380 ? 12 : 24, // we can use this dimensions for conditions
    margin: deviceWidth < 380 ? 12 : 24,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  numberText: {
    color: "yellow",
    fontSize: deviceWidth < 380 ? 26 : 36,
    fontFamily: "open-sans-bold",
  },
});
