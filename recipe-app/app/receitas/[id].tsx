import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importar o ícone da seta
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function RecipeDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState(null);
  const router = useRouter(); // Usar o hook de roteamento

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const API_URL = `http://192.168.1.135:3000/api/recipes/${id}`;
        const response = await fetch(API_URL);
        const data = await response.json();
        setRecipe(data);
      } catch (error) {
        console.error('Erro ao carregar a receita:', error);
      }
    };

    fetchRecipe();
  }, [id]);

  if (!recipe) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando receita...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: recipe.image }} style={styles.image} />
      <Text style={styles.title}>{recipe.title}</Text>
      <Text style={styles.description}>Receita de {recipe.title}</Text>
    </View>
  );
}

// Definir as opções de navegação para o título e o botão de voltar
RecipeDetailsScreen.options = ({ navigation }) => ({
  title: 'Receita', // Alterando o título
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={24} color="black" />
    </TouchableOpacity>
  ),
});

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
});
