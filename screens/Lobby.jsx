import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Keyboard } from 'react-native';
import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function Lobby({setCurrentScreen, teams, setTeams, setCategories}) {

    const [players, setPlayers] = useState([]);
    const [playerName, setPlayerName] = useState('');
    const [currentTeam, setCurrentTeam] = useState('');
    // const [categories, setCategories] = useState(1);

  return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <Text style={{ fontSize: 24, marginBottom: 20 }}>Enter teams:</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center',  backgroundColor: '#cdcfd1', borderRadius: 10 }}>
          <TextInput
            style={{
              borderRadius: 10,
              width: 250,
              paddingHorizontal: 10,
              paddingVertical: 5
            }}
            placeholder="Enter team"
            value={currentTeam}
            onChangeText={(txt) => setCurrentTeam(txt)}
            onSubmitEditing={() => {
              setTeams([...teams, {name: currentTeam, players: [], points: 0}]);
            }}
          />
          <TouchableOpacity style={{ backgroundColor: 'blue', padding: 10, borderRadius: 10 }} onPress={() => {
            Keyboard.dismiss();
              setTeams([...teams, {name: currentTeam, players: [], points: 0}]);
          }}>
            <Text style={{ fontSize: 18, color: 'white' }}>Add</Text>
          </TouchableOpacity>
        </View>


        {teams.map((team, index) => {
          return (
            <View key={index} style={{borderWidth: 1, borderColor: 'black', width: '100%', alignItems: 'center'}}>
              <Text>{team.name} Players:</Text>
                {team.players.map((player, index2) => {
                  return (
                    <Text key={index2}>{player}</Text>
                  )
                })}
              <View style={{ flexDirection: 'row', alignItems: 'center',  backgroundColor: '#cdcfd1', borderRadius: 10 }}>


                <TextInput
                  style={{
                    borderRadius: 10,
                    width: 250,
                    paddingHorizontal: 10,
                    paddingVertical: 5
                  }}
                  placeholder="Enter player"
                  onChangeText={(txt) => setPlayerName(txt)}
                  onSubmitEditing={() => {
                    team.players.push(playerName);
                    setPlayers([...players, playerName]);
                    setPlayerName('');
                  }}
                />
                <TouchableOpacity style={{ backgroundColor: 'blue', padding: 10, borderRadius: 10 }} onPress={() => {
                    team.players.push(playerName);
                    setPlayers([...players, playerName]);
                    setPlayerName('');
                    Keyboard.dismiss();
                }}>
                  <Text style={{ fontSize: 18, color: 'white' }}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          )
        })}

        <View style={{ flexDirection: 'row', alignItems: 'center',  backgroundColor: '#cdcfd1', borderRadius: 10, marginTop: 10 }}>
          <TextInput
            style={{
              borderRadius: 10,
              paddingHorizontal: 10,
              paddingVertical: 5
            }}
            inputMode='numeric'
            placeholder="Number of categories"
            onChangeText={(txt) => {setCategories(txt); Keyboard.dismiss()}}
          />
        </View>
        <TouchableOpacity style={{backgroundColor: '#20db1d', padding: 10, borderRadius: 10, marginTop: 10}} onPress={() => {
          if(players.length < 4) {
              return;
          }
          setCurrentScreen('Words');
          Keyboard.dismiss();
        }}><Text style={{fontSize: 20, color: 'white'}}>Start</Text></TouchableOpacity>
      </View>
  );
}

const styles = StyleSheet.create({
  table: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
    overflow: 'hidden',
    width: '80%'
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    flex: 1,
    padding: 8,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tableText: {
    fontSize: 16,
  },
  headerText: {
    fontWeight: 'bold',
  },
})