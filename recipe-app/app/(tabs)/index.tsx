import { StyleSheet, View, Text, Image, FlatList } from 'react-native';
import React, {useEffect, useState} from 'react';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Link } from 'expo-router';


export default function HomeScreen() {
  const [recipes, setRecipes] = useState([]); 
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const API_URL = "http://192.168.1.135:3000/api/recipes"
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log('Receitas carregadas: ', data)
        setRecipes(data);
        
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

  const renderHeader = () => (
    <ThemedView style={styles.header}>
      
      <ThemedText type="title">Receitas</ThemedText>
      <HelloWave />
      <Text style={styles.subtitle}>
        Ve e pesquisa todas as receitas!
      </Text>
    </ThemedView>
  );

  if(loading){
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Carregando receitas...</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={recipes}
      keyExtractor={(item) => item._id}
      renderItem={renderCard}
      ListHeaderComponent={renderHeader}
      contentContainerStyle={styles.container}
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
