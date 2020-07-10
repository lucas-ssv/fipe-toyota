import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, View, SafeAreaView, ActivityIndicator, Image, Button } from 'react-native';
import { DataTable as Table } from 'react-native-paper'
import { Feather as Icon } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useRoute, useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import api from '../../services/api';

const Details = () => {
  const [detailsCar, setDetailsCar] = useState('');
  const [priceCar, setPriceCar] = useState('');
  const route = useRoute();
  const navigation = useNavigation();

  const {
    selectedValueModel,
    selectedValueYear,
    selectedValueVersion,
    selectedValueState,
  } = route.params;

  useEffect(() => {
    async function loadDetails() {
      await api.get(`cars/toyota?modelo=${selectedValueModel}&ano=${selectedValueYear}&versao=${selectedValueVersion}&estado=${selectedValueState}`)
        .then(res => {
          setDetailsCar(res.data.carro[0]);
          setPriceCar(res.data.carro[0].precos[0]);
        });
    }

    loadDetails();
  }, []);

  function handleNavigationBack() {
    navigation.goBack();
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Fipe <Text style={styles.titleBrand}>Toyota</Text></Text>
      </View>

      <View style={styles.main}>
        {detailsCar === '' && priceCar === '' &&
          <ActivityIndicator size="large" color="#f3123c" />
        }

        {detailsCar !== '' && priceCar !== '' &&
          <View style={styles.content}>
            <View style={styles.titleContent}>
              <Text style={styles.subtitle}>Tabela <Text style={styles.subtitleBrand}>Fipe</Text></Text>
              <TouchableOpacity
                style={styles.button}
                onPress={handleNavigationBack}
              >
                <Icon name="arrow-left" size={20} />
                <Text>Voltar</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.description}>
              <Text style={styles.descriptionText}>{detailsCar.modelo} {detailsCar.versao} {detailsCar.ano}</Text>
            </View>
            <View style={styles.imageContent}>
              <Image
                style={styles.image}
                source={{
                  uri: detailsCar.imagemUrl
                }}
              />
            </View>
            <View style={styles.table}>
              <Table>
                <Table.Header>
                  <Table.Title></Table.Title>
                  <Table.Title>Estado({detailsCar.estado})</Table.Title>
                </Table.Header>

                <Table.Row>
                  <Table.Cell>Mínimo</Table.Cell>
                  <Table.Cell>{priceCar.precoMinimo}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell style={styles.descriptionTitle}>Médio</Table.Cell>
                  <Table.Cell>{priceCar.precoMedio}</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell style={styles.descriptionTitle}>Máximo</Table.Cell>
                  <Table.Cell>{priceCar.precoMaximo}</Table.Cell>
                </Table.Row>
              </Table>
            </View>
          </View>
        }
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16,
  },

  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    width: 320,
    height: 420,
    backgroundColor: '#FFF',
    margin: 60,
    padding: 20,
    borderRadius: 4,
  },

  title: {
    color: '#FFF',
    fontSize: 24,
    textAlign: 'center',
    marginTop: 80,
  },

  titleBrand: {
    color: '#f3123c',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },

  subtitle: {
    fontSize: 20,
  },

  subtitleBrand: {
    textTransform: 'uppercase',
    color: '#f3123c',
    fontWeight: 'bold',
  },

  titleContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  button: {
    flexDirection: 'row',
  },

  description: {
    marginTop: 14
  },

  descriptionText: {
    color: '#6C6C80',
    textTransform: 'uppercase',
    fontSize: 13,
    lineHeight: 20
  },

  imageContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  image: {
    width: 160,
    height: 70,
    justifyContent: 'center',
    marginTop: 16,
  },

  table: {
    marginTop: 16,
  },
});

export default Details;