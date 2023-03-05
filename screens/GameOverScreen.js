// after game over screen
import { Text, View, Image, StyleSheet, Dimensions } from "react-native";
import Title from "../components/Title";
import PrimaryButton from "../components/PrimaryButton";

export default function GameOverScreen(props) {
  return (
    <View style={styles.rootContainer}>
      <Title>Game Over !!</Title>
      <View style={styles.imgContainer}>
        <Image
          style={styles.img}
          source={require("../assets/success.png")}
        ></Image>
      </View>
      <Text style={styles.summaryText}>
        Your Phone needed{" "}
        <Text style={styles.highlight}> {props.roundsNumber} </Text> rounds to
        guess the number{" "}
        <Text style={styles.highlight}> {props.userNumber} </Text>.
      </Text>
      <PrimaryButton onPress={props.onStartNewGame}>
        Start New Game
      </PrimaryButton>
    </View>
  );
}

const deviceWidth = Dimensions.get("window");

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  imgContainer: {
    borderRadius: deviceWidth < 380 ? 75 : 150,
    width: deviceWidth < 380 ? 150 : 300,
    height: deviceWidth < 380 ? 150 : 300,
    borderWidth: 3,
    borderColor: "black",
    overflow: "hidden",
    margin: 36,
  },
  img: {
    width: "100%",
    height: "100%",
  },
  summaryText: {
    fontFamily: "open-sans",
    fontSize: 20,
    textAlign: "center",
    marginBottom: 25,
  },
  highlight: {
    fontFamily: "open-sans-bold",
    color: "white",
  },
});
