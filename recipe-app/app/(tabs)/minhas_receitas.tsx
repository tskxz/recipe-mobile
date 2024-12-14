import { StyleSheet, Image, Platform, View, Text, FlatList } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { HelloWave } from '@/components/HelloWave';

const minhas_receitas = [
  {
    id: '2',
    title: 'Salada Fresca',
    image: 'https://cdn.recipes.lidl/images/pt-PT/Salada-fresca-de-verao.jpg',
  },
  {
    id: '3',
    title: 'Sopa de Legumes',
    image: 'https://assets.unileversolutions.com/recipes-v2/36850.jpg',
  },
];

export default function MinhasReceitasScreen() {
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
      data={minhas_receitas}
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

