// guessing number screen
import { useState } from "react";
//Alert is not a component its an api
import {
  TextInput,
  View,
  StyleSheet,
  Alert,
  Text,
  useWindowDimensions,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
// useWindowDimensions is an hook
// KeyboardAvoidingView for avoiding keyboard merge with components

import PrimaryButton from "../components/PrimaryButton";
import Title from "../components/Title";
import Card from "../components/Card";

export default function StartGameScreen(props) {
  const [enteredNumber, setEnteredNumber] = useState("");

  const { width, height } = useWindowDimensions();

  function numberInputHandler(enteredText) {
    setEnteredNumber(enteredText); // update the value on Change
    // we directly get the input value as one of the features of react-native
  }

  // reset to ""
  function resetInputHandler() {
    setEnteredNumber("");
  }

  // validation logic
  function confirmInputHandler() {
    const chosenNumber = parseInt(enteredNumber); // parsing txt to int

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      //show alert ..
      Alert.alert(
        "Invalid number !",
        "Number has to be a number btwn 1 and 99.",
        [{ text: "Okay", style: "destructive", onPress: resetInputHandler }]
      ); // btns -> 3rd parameter
      return;
    }

    props.onPickedNumber(chosenNumber);
  }

  const marginTopDistance = height < 400 ? 30 : 100;

  return (
    <ScrollView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="position">
        {/* combining styles of marginTop */}
        <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
          <Title>Guess My Number</Title>
        </View>
        <Card>
          <Text style={styles.instructionText}>Enter a Number</Text>
          {/* max charac only 2 for maxLength
            only num pad will open for keyboardType */}
          <TextInput
            style={styles.numberInput}
            maxLength={2}
            keyboardType="number-pad"
            autoCorrect={false}
            onChangeText={numberInputHandler}
            value={enteredNumber}
          />
          {/* to get the text input value and init to state */}
          <View style={styles.btnContainer}>
            <View style={styles.btnContainer1}>
              <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
            </View>
            <View style={styles.btnContainer2}>
              <PrimaryButton onPress={confirmInputHandler}>
                Confirm
              </PrimaryButton>
            </View>
            {/* Here onPress is a prop not a attr */}
          </View>
        </Card>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

// const deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  rootContainer: {
    // marginTop: deviceHeight < 400 ? 30 : 100,
    alignItems: "center",
  },
  instructionText: {
    color: "yellow",
    fontSize: 24,
    textAlign: "center",
  },
  numberInput: {
    height: 50,
    width: 50,
    textAlign: "center",
    fontSize: 32,
    borderBottomColor: "#ddb52f",
    borderBottomWidth: 2,
    color: "#ddb52f",
    marginVertical: 8,
    marginLeft: 132,
    fontWeight: "bold",
  },
  btnContainer: {
    flexDirection: "row",
  },
  btnContainer1: {
    flex: 1,
  },
  btnContainer2: {
    flex: 1,
  },
});
