import { View, Text, TextInput, TouchableOpacity, Keyboard } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'

export default function Words({setCurrentScreen, teams, categories, setWords, words}) {

  const [playerTurn, setPlayerTurn] = useState(0);
  const [wordsEntered, setWordsEntered] = useState(0);
  const [currentWord, setCurrentWord] = useState('');
  const players = teams
    .map(team => team.players)
    .reduce((acc, curr) => acc.concat(curr), []);

  return (
    <View>
      <Text style={{fontSize: 32}}>Pass the phone to: {players[playerTurn]}</Text>
      <Text>You have enetered {wordsEntered}/{categories} categories.</Text>
      <View style={{backgroundColor: 'grey', borderRadius: 12, padding: 5, flexDirection: 'row'}}>
        <TextInput style={{
            borderRadius: 10, width: 250, paddingHorizontal: 10, paddingVertical: 5}} onSubmitEditing={Keyboard.dismiss} placeholder='Enter something' value={currentWord} onChangeText={txt => setCurrentWord(txt)}  />
        <TouchableOpacity style={{backgroundColor: 'blue', width: 75, alignItems: 'center', borderRadius: 12}} onPress={() => {
           setWords(prevWords => ({
            ...prevWords,
            incompleted: [...prevWords.incompleted, currentWord] // Add the new word to the array
          }));
          setWordsEntered(wordsEntered + 1);
          if(wordsEntered + 1 >= categories) {
            setPlayerTurn(playerTurn + 1);
            setWordsEntered(0);
            if(playerTurn >= players.length - 1) {
              setCurrentScreen('Game');
            }
          }
          setCurrentWord('');
        }}><Text style={{fontSize: 24, color: 'white'}}>Add</Text></TouchableOpacity>
      </View>
    </View>
  )
}