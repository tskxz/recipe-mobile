import { useLocalSearchParams, useRouter, Link } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Importar o ícone da seta
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useColorScheme } from 'react-native'; // Hook para detectar o tema

export default function RecipeDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // Usar o hook de roteamento
  const colorScheme = useColorScheme(); // Detecção de tema

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const API_URL = `http://192.168.1.135:3000/api/recipes/${id}`;
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log('Receita carregada:', data);
        setRecipe(data);
      } catch (error) {
        console.error('Erro ao carregar a receita:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipe();
  }, [id]);

  if (loading) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: colorScheme === 'dark' ? '#121212' : '#fff' }]}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Carregando receita...</Text>
      </View>
    );
  }

  if (!recipe) {
    return (
      <View style={[styles.errorContainer, { backgroundColor: colorScheme === 'dark' ? '#121212' : '#fff' }]}>
        <Text style={styles.errorText}>Erro ao carregar a receita.</Text>
        <TouchableOpacity onPress={router.back} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#121212' : '#fff' }]}>
      <TouchableOpacity onPress={router.back} style={styles.backIcon}>
        <Ionicons name="arrow-back" size={24} color={colorScheme === 'dark' ? '#fff' : '#333'} />
      </TouchableOpacity>

      {recipe.image ? (
        <Image source={{ uri: recipe.image }} style={styles.image} />
      ) : (
        <View style={styles.placeholderImage}>
          <Text style={styles.placeholderText}>Sem imagem</Text>
        </View>
      )}

      <Text style={[styles.title, { color: colorScheme === 'dark' ? '#fff' : '#333' }]}>{recipe.name}</Text>
      <Text style={[styles.description, { color: colorScheme === 'dark' ? '#aaa' : '#666' }]}>Receita de {recipe.name}</Text>
      <Text style={[styles.description, { color: colorScheme === 'dark' ? '#aaa' : '#666' }]}>Tempo: {recipe.time}</Text>
      <Text style={[styles.description, { color: colorScheme === 'dark' ? '#aaa' : '#666' }]}>Dificuldade: {recipe.difficulty}</Text>

      <Text style={[styles.sectionTitle, { color: colorScheme === 'dark' ? '#fff' : '#333' }]}>Ingredientes:</Text>
      <FlatList
        data={recipe.ingredients.filter(item => item.name && item.quantity)}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Text style={[styles.ingredient, { color: colorScheme === 'dark' ? '#fff' : '#333' }]}>
            - {item.name} ({item.quantity})
          </Text>
        )}
      />

      <Text style={[styles.sectionTitle, { color: colorScheme === 'dark' ? '#fff' : '#333' }]}>Passos:</Text>
      <FlatList
        data={recipe.steps.filter(item => item.order && item.description)}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <Text style={[styles.step, { color: colorScheme === 'dark' ? '#fff' : '#333' }]}>
            {item.order}. {item.description}
          </Text>
        )}
      />
      <Text style={[styles.description, { color: colorScheme === 'dark' ? '#aaa' : '#666' }]}>
      <Link
        href={{
          pathname: '/receitas/edit/[id]',
          params: { id: recipe._id },
        }}>
        Editar
        </Link>
      </Text>


      

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
  loadingText: {
    marginTop: 16,
    color: '#666',
    fontSize: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: '#f00',
    fontSize: 18,
    marginBottom: 16,
  },
  backButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 8,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 15,
    marginBottom: 16,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginTop: 4,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'left',
  },
  ingredient: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'left',
    marginLeft: 16, // Adiciona um pouco de indentação para o alinhamento
  },
  step: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'left',
    marginLeft: 16, // Adiciona indentação similar aos ingredientes
  },
  backIcon: {
    position: 'absolute',
    top: 40,
    left: 16,
    zIndex: 1,
  },
  placeholderImage: {
    width: '100%',
    height: 250,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  placeholderText: {
    color: '#aaa',
    fontSize: 18,
  },
});
