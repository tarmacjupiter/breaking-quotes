import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Dimensions, Image } from 'react-native';
import CustomButton from './src/CustomButton';

const { width, height } = Dimensions.get('window');

const App = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');

  const censorSwears = (text) => {
    const swearWords = ['bitch', 'fuck', 'shit'];
    let censoredText = text;
    for (const swearWord of swearWords) {
      const regex = new RegExp(`\\b${swearWord}\\b`, 'gi');
      censoredText = censoredText.replace(regex, '*'.repeat(swearWord.length));
    }
    return censoredText;
};


  const fetchQuote = async () => {
    const response = await fetch('https://api.breakingbadquotes.xyz/v1/quotes');
    const data = await response.json();
    const censoredQuote = censorSwears(data[0].quote)
    setQuote(censoredQuote);
    setAuthor(data[0].author);
    setMessage('');
    setGuess('');
  };

  const checkGuess = () => {
    const authorFirstName = author.split(' ')[0];
    if (
      guess.toLowerCase() === author.toLowerCase() ||
      guess.toLowerCase() === authorFirstName.toLowerCase()
    ) {
      setMessage('Correct!');
    } else {
      setMessage(`Incorrect. The correct answer is ${author}.`);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require("./assets/BreakingQuote.png")} />
      <br />
      <Text style={{color: "white", fontWeight: "bold"}}>Which Breaking Bad Character said it?</Text>
      <Text style={{ color: "white", fontStyle: "italic" }}>Tap for a new quote!</Text>
      <br />
      <Text style={styles.quote} onPress={fetchQuote}>{quote}</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your guess"
        value={guess}
        onChangeText={setGuess}
      />
      <CustomButton title="Check" onPress={checkGuess} />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#292929"
  },
  quote: {
    fontSize: width / 20,
    textAlign: 'center',
    marginHorizontal: width * 0.1,
    color: "#369457"
  },
  input: {
    width: width * 0.8,
    height: height * 0.05,
    borderWidth: 1,
    marginVertical: height * 0.02,
    color: "white",
    borderColor: "white",
    paddingLeft: "2%",
    borderRadius: "10px"
  },
  message: {
    fontSize: width * 0.04,
    marginVertical: height * 0.02,
    color: "#29773E"
  },
  image: {
    width: width * 0.8,
    height: (width * 0.8) * (924 / 1852),
  }
});

export default App;
