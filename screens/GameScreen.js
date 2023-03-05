// actual game screen
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  FlatList,
  useWindowDimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
// for importing icons

import Title from "../components/Title";
import NumberContainer from "../components/NumberContainer";
import PrimaryButton from "../components/PrimaryButton";
import Card from "../components/Card";
import GuessLogItem from "../components/GuessLogItem";

let minBoundary = 1;
let maxBoundary = 100; // Global Values

export default function GameScreen(props) {
  //for generating random number
  function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
      return generateRandomBetween(min, max, exclude);
    } else {
      return rndNum;
    }
  }

  const intialGuess = generateRandomBetween(1, 100, props.userNumber);
  const [currentGuess, setcurrentGuess] = useState(intialGuess);
  const [guessRounds, setGuessRounds] = useState([intialGuess]);
  const { width, height } = useWindowDimensions;

  useEffect(
    () => {
      if (currentGuess === props.userNumber) {
        props.onGameOver(guessRounds.length);
      }
    },
    [currentGuess],
    props.userNumber,
    props.onGameOver
  );

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  function nextGuessHandler(direction) {
    //"lower", "higher"
    if (
      (direction === "lower" && currentGuess < props.userNumber) ||
      (direction === "greater" && currentGuess > props.userNumber)
    ) {
      Alert.alert("Don't Lie", "You know that this is wrong..", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }
    if (direction === "lower") {
      maxBoundary = currentGuess; // as current guess is high
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRndNumber = generateRandomBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setcurrentGuess(newRndNumber); // setting new rnd number
    setGuessRounds((prevGuessRounds) => [newRndNumber, ...prevGuessRounds]); // guess the number of times button pressed
    //passing the array of numbers guessed
  }

  const guessRoundsListLength = guessRounds.length;

  let content = (
    <>
      {/* Gives current number guess */}
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <Text style={styles.txt}>Higher Or Lower?</Text>
        <View style={styles.btnContainer}>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
            <Ionicons name="md-add" size={24} color="white"></Ionicons>
          </PrimaryButton>
          <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
            <Ionicons name="md-remove" size={24} color="white"></Ionicons>
          </PrimaryButton>
        </View>
      </Card>
    </>
  );

  if (width > 500) {
    content = (
      <>
        <Text style={styles.txt}>Higher Or Lower?</Text>
        <View style={styles.btnContainerWide}>
          <View style={styles.btnContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
              <Ionicons name="md-add" size={24} color="white"></Ionicons>
            </PrimaryButton>
          </View>

          <NumberContainer>{currentGuess}</NumberContainer>
          <View style={styles.btnContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="md-remove" size={24} color="white"></Ionicons>
            </PrimaryButton>
          </View>
        </View>
      </>
    );
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      {content}
      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds} // predefined prop of react native
          renderItem={(itemData) => (
            <GuessLogItem
              roundNumber={guessRoundsListLength - itemData.index}
              guess={itemData.item}
            />
          )}
          keyExtractor={(item) => item}
        ></FlatList>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24,
    alignItems: "center",
  },
  btnContainerWide: {
    flexDirection: "row",
    alignItems: "center",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  txt: {
    color: "yellow",
    textAlign: "center",
    fontSize: 24,
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
});
