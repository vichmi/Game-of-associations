import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react';
import GameStage from '../constants/GameStage';

export default function Game({ words, setCurrentScreen, teams, setTeams }) {

  const [currentTeamTurn, setCurrentTeamTurn] = useState(0);
  const [currentPlayerTurn, setCurrentPlayerTurn] = useState(0);
  const [gameStageId, setGameStageId] = useState(0);
  const [modalVisible, setModalVisible] = useState(true);
  const [turnInProgess, setTurnInProgress] = useState(false);
  const [count, setCount] = useState(3);
  const [currentWord, setCurrentWord] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [timer, setTimer] = useState(60);
  const [currentTeamPoints, setCurrentTeamPoints] = useState(0);
  const [roundStarted, setRoundStarted] = useState(false);

  const handleStart = () => {
    setTurnInProgress(true);
  };

  const startRound = () => {
    setCurrentWord(words.incompleted[Math.floor(Math.random() * words.incompleted.length)]);
    setRoundStarted(true);
  };

  const updateTeamPoints = (currentTeamTurn, points) => {
    setTeams(prevTeams =>
      prevTeams.map((team, index) => {
        if (index === currentTeamTurn) {
          return { ...team, points: team.points + points };
        }
        return team;
      })
    );
  };

  const endTurn = () => {
    // Ensure points are updated before resetting
    // setCurrentTeamPoints(currentTeamPoints + 1);
    setTurnInProgress(false);
    setCount(3);
    setTimer(60);
    setRoundStarted(false);

    let nextTeamTurn = currentTeamTurn + 1;
    let nextPlayerTurn = currentPlayerTurn;

    if (nextTeamTurn >= teams.length) {
      nextTeamTurn = 0;
      nextPlayerTurn += 1;
      if (nextPlayerTurn >= teams[nextTeamTurn].players.length) {
        nextPlayerTurn = 0;
      }
    }

    // updateTeamPoints(currentTeamTurn, currentTeamPoints);
    setCurrentTeamPoints(0);
    setCurrentTeamTurn(nextTeamTurn);
    setCurrentPlayerTurn(nextPlayerTurn);
  };

  useEffect(() => {
    if (count > 0 && turnInProgess) {
      const timer = setTimeout(() => {
        setCount(count - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (count === 0) {
      startRound();
    }
  }, [count, turnInProgess]);

  useEffect(() => {
    if (timer > 0 && turnInProgess) {
      const sTimer = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
      return () => clearTimeout(sTimer);
    } else if (timer === 0) {
      endTurn();
    }
  }, [timer, roundStarted]);

  return (
    <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
      <Modal transparent={true} visible={modalVisible} animationType='fade'>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalText}>Round {GameStage[gameStageId].id}</Text>
            <Text>{GameStage[gameStageId].description}</Text>
            <TouchableOpacity style={styles.startButton} onPress={() => { setModalVisible(false) }}>
              <Text style={styles.buttonText}>Ok</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {!turnInProgess ? (
        <View>
          <Text style={styles.title}>Are you ready {teams[currentTeamTurn].players[currentPlayerTurn]}?</Text>
          <TouchableOpacity style={styles.startButton} onPress={handleStart}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ width: '100%', alignItems: 'center', height: 250 }}>
          {count > 0 ? (
            <Text style={{ fontSize: 48 }}>{count}</Text>
          ) : (
            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
              <Text style={{ fontSize: 24 }}>{timer}s</Text>
              <Text style={styles.currentWord}>{currentWord}</Text>
              <View style={styles.buttonsContainer}>
                <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'green' }]} onPress={async () => {
                  words.completed.push(currentWord);
                  words.incompleted.splice(words.incompleted.indexOf(currentWord), 1);
                  setCurrentWord(words.incompleted[Math.floor(Math.random() * words.incompleted.length)]);
                  updateTeamPoints(currentTeamTurn, 1);

                  if (words.incompleted.length === 0) {
                    if (gameStageId < 2) {
                      setGameStageId(gameStageId + 1);
                      words.incompleted = words.completed;
                      words.completed = [];
                      endTurn();
                      setModalVisible(true);
                    } else {
                      setGameOver(true);
                      setCurrentScreen('EndScreen');
                    }
                  }
                }}>
                  <Text style={styles.buttonSymbol}>✓</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.actionButton, { backgroundColor: 'red' }]} onPress={() => {
                  setCurrentWord(words.incompleted[Math.floor(Math.random() * words.incompleted.length)]);
                }}>
                  <Text style={styles.buttonSymbol}>X</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dims the background
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    textAlign: 'center',
    marginBottom: 20,
  },
  currentWord: {
    padding: 20,
    fontSize: 48,
    backgroundColor: 'grey',
    textAlign: 'center',
    marginBottom: 30,
    borderRadius: 10,
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: 250,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  actionButton: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  buttonSymbol: {
    color: 'white',
    fontSize: 48,
  },
});
