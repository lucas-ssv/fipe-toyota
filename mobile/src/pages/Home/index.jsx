import React, { useState } from 'react';
import { View, Text, StyleSheet, Picker, SafeAreaView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import api from '../../services/api';

const Home = () => {
  const [selectedValueModel, setSelectedValueModel] = useState("Selecione...");
  const [selectedValueYear, setSelectedValueYear] = useState("Selecione...");
  const [selectedValueVersion, setSelectedValueVersion] = useState("Selecione...");
  const [selectedValueCar, setSelectedValueCar] = useState('');
  const [selectedValueState, setSelectedValueState] = useState("SP");

  const navigation = useNavigation();

  function handleRequestModelToApi(itemValue) {
    setSelectedValueModel(itemValue);
    setSelectedValueVersion('Selecione...');

    api.get(`cars/toyota/models/versions/ano?modelo=${itemValue}&ano=${selectedValueYear}`)
      .then(res => {
        setSelectedValueCar(res.data.modelos);
      });
  }

  function handleRequestYearToApi(itemValue) {
    setSelectedValueYear(itemValue);
    setSelectedValueVersion('Selecione...');

    api.get(`cars/toyota/models/versions/ano?modelo=${selectedValueModel}&ano=${itemValue}`)
      .then(res => {
        setSelectedValueCar(res.data.modelos);
      });
  }

  function handleNavigateToDetails() {
    if (selectedValueVersion != 'Selecione...') {
      navigation.navigate('Details', {
        selectedValueModel,
        selectedValueYear,
        selectedValueVersion,
        selectedValueState,
      });
    }

    return;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.title}>Fipe <Text style={styles.titleBrand}>Toyota</Text></Text>
      </View>

      <View style={styles.main}>
        <View style={styles.content}>
          <Text>Modelo</Text>
          <Picker
            selectedValue={selectedValueModel}
            style={styles.select}
            onValueChange={itemValue => handleRequestModelToApi(itemValue)}
          >
            <Picker.Item label="Selecione..." value="Selecione..." />
            <Picker.Item label="Corolla" value="Corolla" />
            <Picker.Item label="Etios" value="Etios" />
            <Picker.Item label="Hilux" value="Hilux" />
            <Picker.Item label="Prius" value="Prius" />
            <Picker.Item label="Rav4" value="Rav4" />
            <Picker.Item label="SW4" value="SW4" />
          </Picker>

          <Text>Ano</Text>
          <Picker
            selectedValue={selectedValueYear}
            style={styles.select}
            onValueChange={itemValue => handleRequestYearToApi(itemValue)}
          >
            <Picker.Item label="Selecione..." value="Selecione..." />
            <Picker.Item label="2015" value="2015" />
            <Picker.Item label="2016" value="2016" />
            <Picker.Item label="2017" value="2017" />
            <Picker.Item label="2018" value="2018" />
            <Picker.Item label="2019" value="2019" />
            <Picker.Item label="2020" value="2020" />
          </Picker>

          <Text>Versão</Text>
          <Picker
            selectedValue={selectedValueVersion}
            style={styles.select}
            onValueChange={itemValue => setSelectedValueVersion(itemValue)}
          >
            <Picker.Item label="Selecione..." value="Selecione..." />
            {selectedValueCar === '' ? console.log('Nada para exibir!') : selectedValueCar.map(v => (
              <Picker.Item key={v._id} label={v.versao} value={v.versao} />
            ))}
          </Picker>

          <Text>Estado</Text>
          <Picker
            selectedValue={selectedValueState}
            style={styles.select}
            onValueChange={itemValue => setSelectedValueState(itemValue)}
          >
            <Picker.Item label="SP" value="SP" />
          </Picker>

          <TouchableOpacity
            style={styles.button}
            onPress={handleNavigateToDetails}
            activeOpacity={0.8}
          >
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>Avaliar</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
    marginHorizontal: 16,
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

  select: {
    alignSelf: 'stretch',
    textAlign: 'center',
    marginBottom: 16,
    color: '#6C6C80',
  },

  button: {
    backgroundColor: "#20232A",
    height: 40,
    flexDirection: "row",
    borderRadius: 4,
    overflow: "hidden",
    alignItems: "center",
  },

  buttonContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    color: '#FFF',
    fontSize: 16
  }
});

export default Home;