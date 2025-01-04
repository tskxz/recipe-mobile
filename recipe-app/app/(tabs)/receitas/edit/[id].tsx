import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  TextInput,
  Button,
  ScrollView,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { ThemedText } from '@/components/ThemedText';
import axios from 'axios';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';


export default function TabTwoScreen() {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [numPeople, setNumPeople] = useState('');
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);
  const [steps, setSteps] = useState([{ order: 1, description: '' }]);
  const [image, setImage] = useState('');


  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const API_URL = `http://192.168.1.135:3000/api/recipes/${id}`;
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log('Receita carregada:', data);
        // Preencher os campos com os dados da receita
        setName(data.name);
        setDescription(data.description);
        setTime(data.time);
        setDifficulty(data.difficulty);
        setNumPeople(data.num_people.toString());
        setIngredients(data.ingredients.map(({ name, quantity }) => ({ name, quantity })));
        setSteps(data.steps.map(({ order, description }) => ({ order, description })));
        setImage(data.image || '');

      } catch (error) {
        console.error('Erro ao carregar a receita:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      console.log('Imagem selecionada:', result.assets[0].uri);
      setImage(result.assets[0].uri);
    }
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '' }]);
  };

  const handleAddStep = () => {
    setSteps([...steps, { order: steps.length + 1, description: '' }]);
  };

  const handleSubmit = async () => {
    const recipe = {
      name,
      description,
      time,
      difficulty,
      num_people: numPeople,
      ingredients,
      steps,
      image,
    };

    console.log('Recipe submitted:', recipe);
    // API call
    try {
      const response = await axios.put(`http://192.168.1.135:3000/api/recipes/${id}`, recipe, {
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      console.log("Recipe edit successfully:", response.data);
      alert("Receita editado com sucesso!");
      const recipeId = response.data._id;
      router.push(`/receitas/${recipeId}`);
      
    } catch (error) {
      console.error("Erro ao enviar receita:", error);
      alert("Houve um erro ao enviar a receita. Tente novamente.");
    }

  };

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        isDarkMode ? styles.darkContainer : styles.lightContainer,
      ]}
    >
      <ThemedText type="title" style={styles.title}>
        Edite a sua Receita
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
      <View style={styles.imageContainer}>
        {image && <Image source={{ uri: image }} style={styles.imagePreview} />}
        <Button title="Selecionar Imagem" onPress={handleImagePick} />
      </View>
      <Button title="Editar Receita" onPress={handleSubmit} color={isDarkMode ? '#007BFF' : '#0056B3'} />
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
  imageContainer: { alignItems: 'center', marginVertical: 16 },
  imagePreview: { width: 200, height: 200, borderRadius: 8 },
});
