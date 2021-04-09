import { setStatusBarBackgroundColor, StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Button } from 'react-native';

import GoalItem from './componets/GoalItem';
import GoalInput from './componets/GoalInput';

export default function App() {
  const [courseGoals, setCourseGoals] = useState([])
  const [isAddMode, setisAddMode] = useState(false)
  console.log(courseGoals);

  const addGoalHandler = goalTitle => {
    if(goalTitle.length === 0) {
      return;
    }
    setCourseGoals(currentGoals => [
      ...currentGoals,
      { id: Math.random().toString(), value: goalTitle }
    ]);
    setisAddMode(false);
  }

  const removeGoalHandler = goalId => {
    setCourseGoals(currentGoals => {
      return currentGoals.filter((goal) => goal.id !== goalId);
    })
  }

  const cancelAddGoal = () => {
    setisAddMode(false);
  }

  return (
    <View style={styles.screen}>
      <Button title="Add new Goal" onPress={() => setisAddMode(true)} />
      <GoalInput visible={isAddMode} onCancel={cancelAddGoal} onAddGoal={addGoalHandler} />

      <FlatList
        data={courseGoals}
        keyExtractor={(item, index) => item.id}
        renderItem={itemData =>
          <GoalItem id={itemData.item.id} onDelete={removeGoalHandler} title={itemData.item.value}></GoalItem>
        } />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 50
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    width: '80%',
    borderColor: 'black',
    borderWidth: 1,
    padding: 10
  },
  listItem: {
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#ccc',
    borderColor: 'black',
    borderWidth: 1
  }
});
