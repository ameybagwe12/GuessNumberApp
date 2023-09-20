import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";
import { StatusBar } from "expo-status-bar";

import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  const [userNumber, setuserNumber] = useState();
  const [gameIsOver, setgameIsOver] = useState(true);
  const [guessRounds, setGuessRounds] = useState(0);
  // checking commits
  // to use custom fonts
  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  function pickedNumberHandler(pickedNumber) {
    setuserNumber(pickedNumber); // get the number from input text
    setgameIsOver(false);
  }

  function gameOverHandler(numberOfRounds) {
    setgameIsOver(true);
    setGuessRounds(numberOfRounds);
  }

  function startNewGame() {
    setuserNumber(null);
    setGuessRounds(0);
  }

  let screen = <StartGameScreen onPickedNumber={pickedNumberHandler} />;

  // if validated num the screen = Game
  if (userNumber) {
    screen = (
      <GameScreen userNumber={userNumber} onGameOver={gameOverHandler} />
    );
  }

  if (gameIsOver && userNumber) {
    screen = (
      <GameOverScreen
        userNumber={userNumber}
        roundsNumber={guessRounds}
        onStartNewGame={startNewGame}
      />
    );
  }

  return (
    <>
      <StatusBar style="light" />
      {/* using color combinations */}
      <LinearGradient colors={["#4e0329", "yellow"]} style={styles.rootScreen}>
        <ImageBackground
          source={require("./assets/background.png")}
          resizeMode="cover" // to cover whole screen
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          <SafeAreaView style={styles.rootScreen}>
            {screen /*Jsx screen */}
          </SafeAreaView>
        </ImageBackground>
      </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.15,
  },
});
