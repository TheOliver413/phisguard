import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { ScaledSheet, scale, verticalScale } from "react-native-size-matters";

const DetailsScreen = ({ navigation, route }) => {
  const { title, description, image } = route.params || {};

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backText}>← Volver</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.content}>
        {image && <Image source={{ uri: image }} style={styles.image} />}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </ScrollView>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: scale(10),
  },
  backButton: {
    padding: scale(8),
    marginBottom: verticalScale(10),
    alignSelf: 'flex-start',
  },
  backText: {
    fontSize: scale(16),
    color: '#007AFF',
  },
  content: {
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: verticalScale(200),
    borderRadius: scale(10),
    marginBottom: verticalScale(10),
  },
  title: {
    fontSize: scale(20),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: verticalScale(10),
  },
  description: {
    fontSize: scale(14),
    textAlign: 'justify',
  },
});

export default DetailsScreen;
