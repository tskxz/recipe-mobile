import { StyleSheet, Image, Platform, View, Text, FlatList } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { HelloWave } from '@/components/HelloWave';
import React, {useEffect, useState} from 'react';

export default function MinhasReceitasScreen() {
  const [recipes, setRecipes] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const API_URL = "http://192.168.1.135:3000/api/my_recipes"
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
      <Text style={styles.cardTitle}>{item.title}</Text>
    </View>
  );

  const renderHeader = () => (
    <ThemedView style={styles.header}>
      
      <ThemedText type="title">As minhas receitas</ThemedText>
      <HelloWave />
      <Text style={styles.subtitle}>
        Aqui aparece as tuas receitas, podes adicionar a tua própria receita e publicar!
      </Text>
    </ThemedView>
  );

  return (
    <FlatList
      data={recipes}
      keyExtractor={(item) => item.id}
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

