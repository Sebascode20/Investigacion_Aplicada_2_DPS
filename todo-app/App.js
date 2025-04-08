import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity } from 'react-native';

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState([]);

  const addTask = () => {
    if (task.trim() === '') return;
    setTasks([...tasks, { id: Date.now().toString(), title: task }]);
    setTask('');
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>To-Do App</Text>
      <TextInput
        value={task}
        onChangeText={setTask}
        placeholder="Escribe una tarea"
        style={styles.input}
        testID="input-task"
      />
      <Button title="Agregar" onPress={addTask} testID="btn-add" />
      <FlatList
  data={tasks}
  keyExtractor={item => item.id}
  renderItem={({ item, index }) => (
    <View
      style={[
        styles.taskContainer,
        index % 2 === 0 ? styles.taskEven : styles.taskOdd 
      ]}
    >
      <Text style={styles.taskText}>{item.title}</Text>
      <TouchableOpacity onPress={() => removeTask(item.id)} testID={`btn-delete-${item.id}`}>
        <Text style={styles.deleteText}>Eliminar</Text>
      </TouchableOpacity>
    </View>
  )}
  testID="task-list"
/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 40 },
  header: { fontSize: 24, marginBottom: 10 },
  input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 10, padding: 8 },
  taskContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBlock: 10, padding: 10 },
  taskEven: { backgroundColor: '#f9f9f9', borderRadius: 5 },
  taskOdd: { backgroundColor: '#e6e6e6', borderRadius: 5 },
  taskText: { fontSize: 16 },
  deleteText: { color: 'red' }
});
