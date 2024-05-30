import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, Animated } from 'react-native';

interface FlashCard {
  question: string;
  options: string[];
  correctAnswer: string;
  hint: string;
}

const flashCards: FlashCard[] = [
  {
    question: "What is the output of 2 + 2 in JavaScript?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4",
    hint: "It's the result of adding two and two.",
  },
  {
    question: "Which method is used to print something in the console?",
    options: ["print()", "log()", "console.log()", "write()"],
    correctAnswer: "console.log()",
    hint: "It's a method of the console object.",
  },
  // Add more flashcards here
];

const FlashCards: React.FC = () => {
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [animatedValue] = useState(new Animated.Value(0));

  const handleAnswer = (answer: string) => {
    if (answer === flashCards[currentCardIndex].correctAnswer) {
      setCorrect(true);
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          setCurrentCardIndex((prev) => (prev + 1) % flashCards.length);
          setCorrect(false);
          setShowHint(false);
          animatedValue.setValue(0);
        }, 1000);
      });
    } else {
      setShowHint(true);
    }
  };

  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          opacity: animatedValue.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0],
          }),
        }}
      >
        <Text style={styles.question}>{flashCards[currentCardIndex].question}</Text>
        {flashCards[currentCardIndex].options.map((option, index) => (
          <Button key={index} title={option} onPress={() => handleAnswer(option)} />
        ))}
        {showHint && <Text style={styles.hint}>Hint: {flashCards[currentCardIndex].hint}</Text>}
      </Animated.View>
      {correct && <Text style={styles.congrats}>Congrats! That's correct.</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  question: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  hint: {
    marginTop: 20,
    fontSize: 16,
    color: 'red',
  },
  congrats: {
    fontSize: 24,
    color: 'green',
  },
});

export default FlashCards;
