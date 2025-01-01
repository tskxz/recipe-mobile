import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  View,
} from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from '@/components/ThemedText';

export default function TabTwoScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [numPeople, setNumPeople] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);
  const [steps, setSteps] = useState([{ order: 1, description: '' }]);

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '' }]);
  };

  const handleAddStep = () => {
    setSteps([...steps, { order: steps.length + 1, description: '' }]);
  };

  const handleSubmit = () => {
    const recipe = {
      name,
      description,
      time,
      difficulty,
      num_people: numPeople,
      ingredients,
      steps,
    };

    console.log('Recipe submitted:', recipe);
    // API call
  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        isDarkMode ? styles.darkContainer : styles.lightContainer,
      ]}
    >
      <ThemedText type="title" style={styles.title}>
        Crie a sua Receita
      </ThemedText>
      <TextInput
        style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
        placeholder="Nome da Receita"
        value={name}
        onChangeText={setName}
        placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
      />
      <TextInput
        style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
        placeholder="Descrição"
        value={description}
        onChangeText={setDescription}
        multiline
        placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
      />
      <TextInput
        style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
        placeholder="Tempo de Preparo (e.g., 45 min)"
        value={time}
        onChangeText={setTime}
        placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
      />
      <TextInput
        style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
        placeholder="Dificuldade (e.g., Fácil, Médio, Difícil)"
        value={difficulty}
        onChangeText={setDifficulty}
        placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
      />
      <TextInput
        style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
        placeholder="Número de Pessoas"
        value={numPeople}
        onChangeText={setNumPeople}
        keyboardType="numeric"
        placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
      />
      <ThemedText type="subtitle" style={styles.subtitle}>
        Ingredientes
      </ThemedText>
      {ingredients.map((ingredient, index) => (
        <View key={index} style={styles.ingredientRow}>
          <TextInput
            style={[styles.input, styles.ingredientInput, isDarkMode ? styles.darkInput : styles.lightInput]}
            placeholder="Nome do Ingrediente"
            value={ingredient.name}
            onChangeText={(text) => {
              const newIngredients = [...ingredients];
              newIngredients[index].name = text;
              setIngredients(newIngredients);
            }}
            placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
          />
          <TextInput
            style={[styles.input, styles.quantityInput, isDarkMode ? styles.darkInput : styles.lightInput]}
            placeholder="Quantidade"
            value={ingredient.quantity}
            onChangeText={(text) => {
              const newIngredients = [...ingredients];
              newIngredients[index].quantity = text;
              setIngredients(newIngredients);
            }}
            placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
          />
        </View>
      ))}
      <Button title="Adicionar Ingrediente" onPress={handleAddIngredient} />

      <ThemedText type="subtitle" style={styles.subtitle}>
        Passos
      </ThemedText>
      {steps.map((step, index) => (
        <TextInput
          key={index}
          style={[styles.input, isDarkMode ? styles.darkInput : styles.lightInput]}
          placeholder={`Passo ${index + 1}`}
          value={step.description}
          onChangeText={(text) => {
            const newSteps = [...steps];
            newSteps[index].description = text;
            setSteps(newSteps);
          }}
          placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
        />
      ))}
      <Button title="Adicionar Passo" onPress={handleAddStep} />
      <Button title="Salvar Receita" onPress={handleSubmit} color={isDarkMode ? '#007BFF' : '#0056B3'} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  lightContainer: {
    backgroundColor: '#fff',
  },
  darkContainer: {
    backgroundColor: '#000',
  },
  title: {
    marginBottom: 16,
  },
  subtitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    fontSize: 16,
  },
  lightInput: {
    borderColor: '#ccc',
    backgroundColor: '#fff',
    color: '#000',
  },
  darkInput: {
    borderColor: '#444',
    backgroundColor: '#333',
    color: '#fff',
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ingredientInput: {
    flex: 2,
    marginRight: 8,
  },
  quantityInput: {
    flex: 1,
  },
});