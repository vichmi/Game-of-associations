import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Home from './screens/Home';
import Game from './screens/Game'
import Lobby from './screens/Lobby';
import Words from './screens/Words';
import EndScreen from './screens/EndScreen';

export default function App() {

  const [currentScreen, setCurrentScreen] = useState('Home');
  const [teams, setTeams] = useState([]);
  // const [teams, setTeams] = useState([{name: 't1', players: ['pl1', 'pl2'], points: 0}, {name: 't2', players: ['pl3', 'pl4'], points: 0}]);
  const [categories, setCategories] = useState(2);
  const [words, setWords] = useState({incompleted: [], completed: []});
  // const [words, setWords] = useState({incompleted: ['aaaaaaaaaaaaaaaaaaaaaa1', 'a2', 'a3', 'a4', 'a5', 'a6'], completed: []});

  return (
    <View style={styles.container} keyboardDismissMode='on-drag'>
      {currentScreen == 'Home' ? <Home setCurrentScreen={setCurrentScreen} /> :
      currentScreen == 'Lobby' ? <Lobby setCurrentScreen={setCurrentScreen} teams={teams} setTeams={setTeams} setCategories={setCategories} /> : 
      currentScreen == 'Words' ? <Words setCurrentScreen={setCurrentScreen} teams={teams} categories={categories} setWords={setWords} words={words} /> : 
      currentScreen == 'Game' ? <Game setCurrentScreen={setCurrentScreen} teams={teams} setTeams={setTeams} words={words} /> :
      currentScreen == 'EndScreen' ? <EndScreen setCurrentScreen={setCurrentScreen} teams={teams}/> : <></>}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
