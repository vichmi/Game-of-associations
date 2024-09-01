import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'

export default function EndScreen({teams, setCurrentScreen}) {

    const [winner, setWinner] = useState({});

    useEffect(() => {
        setWinner(teams.reduce((max, obj) => {
            return (obj.points > max.points) ? obj: max;
        }))
    }, []);

  return (
    <View style={{alignItems: 'center'}}>
        <Text style={{fontSize: 32, fontWeight: 'bold'}}>{winner.name} won</Text>
      {teams.map((team, index) => {
        return (
            <View key={index}>
                <Text>{team.name} has {team.points} points</Text>
            </View>
        )        
      })}

      <TouchableOpacity style={{backgroundColor: 'blue', padding: 15, marginTop: 15, borderRadius: 15}} onPress={() => {
        setCurrentScreen('Home');
      }}><Text style={{color: 'white'}}>Home</Text></TouchableOpacity>
    </View>
  )
}