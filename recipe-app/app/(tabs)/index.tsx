import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import { HelloWave } from '@/components/HelloWave';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';
import { SearchBar } from '@rneui/themed';
import { debounce } from 'lodash';

// Move renderHeader outside HomeScreen
const RenderHeader = ({ search, updateSearch }) => {
  const searchBarRef = useRef(null);

  return (
    <ThemedView style={styles.header}>
      <ThemedText type="title">Receitas</ThemedText>
      <HelloWave />
      <Text style={styles.subtitle}>
        Veja e pesquise todas as receitas!
      </Text>
      <SearchBar
        ref={searchBarRef} // Attach ref to SearchBar
        placeholder="Type Here..."
        onChangeText={updateSearch}
        value={search}
        // Prevent losing focus by setting focus after every render
        onFocus={() => searchBarRef.current?.focus()}
      />
    </ThemedView>
  );
};

export default function HomeScreen() {
  const [recipes, setRecipes] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [filteredRecipes, setFilteredRecipes] = useState([]); 
  const [search, setSearch] = useState("");

  // Create a ref for the SearchBar
  const searchBarRef = useRef(null);

  // Use debounce with search filtering
  const filterRecipes = useCallback(debounce((text) => {
    const filtered = recipes.filter((recipe) =>
      recipe.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredRecipes(filtered);
  }, 500), [recipes]);

  const updateSearch = (searchText) => {
    setSearch(searchText);
    filterRecipes(searchText);
  };

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const API_URL = "http://localhost:3000/api/recipes";
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log('Receitas carregadas: ', data);
        setRecipes(data);
        setFilteredRecipes(data);
      } catch (error) {
        console.error('Erro ao buscar receitas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <Text style={styles.cardTitle}>
        <Link
          href={{
            pathname: '/receitas/[id]',
            params: { id: item._id },
          }}>
          {item.name}
        </Link>
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Carregando receitas...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={filteredRecipes} // Usa as receitas filtradas
      keyExtractor={(item) => item._id}
      renderItem={renderCard}
      ListHeaderComponent={<RenderHeader search={search} updateSearch={updateSearch} />}
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled" // Permite manter o foco no input
    />
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    padding: 50,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  container: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardImage: {
    width: '100%',
    height: 150,
  },
  cardTitle: {
    padding: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
});
