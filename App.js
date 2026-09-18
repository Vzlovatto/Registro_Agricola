import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';

export default function App() {
  const [tela, setTela] = useState('home');

  return (
    <SafeAreaView style={styles.container}>
      {tela === 'home' && (
        <ScrollView contentContainerStyle={styles.home}>
          <Text style={styles.logo}>AgroVisita</Text>

          <Text style={styles.titulo}>
            Registro de Visitas
          </Text>

          <Text style={styles.subtitulo}>
            Técnicas Agrícolas
          </Text>

          <TouchableOpacity
            style={styles.botao}
            onPress={() => setTela('nova')}
          >
            <Text style={styles.textoBotao}>
              + Nova Visita
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.botaoSecundario}
            onPress={() => setTela('historico')}
          >
            <Text style={styles.textoBotaoSecundario}>
              Ver Histórico
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {tela === 'nova' && (
        <View style={styles.tela}>
          <Text style={styles.titulo}>
            Nova Visita
          </Text>

          <Text style={styles.descricao}>
            GPS e acelerômetro
          </Text>

          <TouchableOpacity
            style={styles.botao}
            onPress={() => setTela('home')}
          >
            <Text style={styles.textoBotao}>
              Voltar
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {tela === 'historico' && (
        <View style={styles.tela}>
          <Text style={styles.titulo}>
            Histórico de Visitas
          </Text>

          <Text style={styles.descricao}>
          visitas
          </Text>

          <TouchableOpacity
            style={styles.botao}
            onPress={() => setTela('home')}
          >
            <Text style={styles.textoBotao}>
              Voltar
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7F2',
  },

  home: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },

  tela: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },

  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 20,
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1B3A20',
  },

  subtitulo: {
    fontSize: 22,
    color: '#4D7C50',
    marginBottom: 20,
  },

  descricao: {
    fontSize: 16,
    color: '#526052',
    lineHeight: 24,
    marginBottom: 30,
  },

  botao: {
    backgroundColor: '#2E7D32',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },

  textoBotao: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: 'bold',
  },

  botaoSecundario: {
    borderWidth: 2,
    borderColor: '#2E7D32',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },

  textoBotaoSecundario: {
    color: '#2E7D32',
    fontSize: 17,
    fontWeight: 'bold',
  },
});