import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

export default function Home({setCurrentScreen}) {
  return (
    <View>
      <TouchableOpacity style={{backgroundColor: 'grey', padding: 12, borderRadius: 12, alignItems: 'center', marginBottom: 5}} onPress={() => {
        setCurrentScreen('Lobby');
      }}><Text style={{color: 'white', fontSize: 32}}>New Game</Text></TouchableOpacity>
      <TouchableOpacity style={{backgroundColor: 'grey', padding: 12, borderRadius: 12, alignItems: 'center', marginTop: 5}}><Text style={{color: 'white', fontSize: 32}}>About</Text></TouchableOpacity>
    </View>
  )
}