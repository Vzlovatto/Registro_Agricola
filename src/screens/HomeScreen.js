import React from 'react';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/globalStyles';

export default function HomeScreen({ onIrParaNovaVisita, onIrParaHistorico }) {
  return (
    <ScrollView contentContainerStyle={styles.home}>
      <Text style={styles.logo}>AgroVisita</Text>
      <Text style={styles.titulo}>Registro de Visitas</Text>
      <Text style={styles.subtitulo}>Técnicas Agrícolas</Text>
      <Text style={styles.descricao}>
        Registre suas visitas técnicas, capture fotos e acompanhe as informações das propriedades.
      </Text>

      <TouchableOpacity style={styles.botao} onPress={onIrParaNovaVisita}>
        <Text style={styles.textoBotao}>+ Nova Visita</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoSecundario} onPress={onIrParaHistorico}>
        <Text style={styles.textoBotaoSecundario}>Ver Histórico</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}