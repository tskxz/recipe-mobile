import { StyleSheet, View, Text, Image, FlatList } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const recipes = [
  {
    id: '1',
    title: 'Bolo de Chocolate',
    image: 'https://pt.petitchef.com/imgupl/recipe/bolo-de-chocolate-humido-e-fofinho--454177p704082.jpg'
  },
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

export default function HomeScreen() {

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.cardImage} />
      <Text style={styles.cardTitle}>{item.title}</Text>
    </View>
  );

  return (
    <ParallaxScrollView>
    <ThemedView style={styles.titleContainer}>
      <ThemedText type="title">Receitas</ThemedText>
      <HelloWave />
    </ThemedView>
    <ThemedView style={styles.stepContainer}>
      <ThemedText>Vê todas as receitas aqui</ThemedText>
    </ThemedView>
    <FlatList
      data={recipes}
      keyExtractor={(item) => item.id}
      renderItem={renderCard}
      contentContainerStyle={styles.cardList}
    />
  </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    padding: 20,
    alignItems: 'center',
  },
  stepContainer: {
    padding: 20,
  },
  cardList: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    marginBottom: 16,
    elevation: 3, // Para sombra no Android
    shadowColor: '#000', // Para sombra no iOS
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
