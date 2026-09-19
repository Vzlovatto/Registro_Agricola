import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../styles/globalStyles';

export default function HistoricoScreen({ listaHistorico, onVoltar }) {
  return (
    <ScrollView contentContainerStyle={styles.formulario}>
      <Text style={styles.titulo}>Histórico de Visitas</Text>

      {listaHistorico.length === 0 ? (
        <Text style={styles.descricao}>Nenhuma visita salva ainda.</Text>
      ) : (
        listaHistorico.map((visita) => (
          <View key={visita.id} style={styles.coordenadas}>
            <Text style={styles.coordenadasTitulo}>{visita.propriedade}</Text>
            <Text style={styles.coordenadasTexto}>Produtor: {visita.produtor}</Text>
            <Text style={styles.coordenadasTexto}>Tipo: {visita.tipoVisita}</Text>
            {visita.data && (
              <Text style={styles.coordenadasTexto}>
                Data: {new Date(visita.data).toLocaleDateString()}
              </Text>
            )}
          </View>
        ))
      )}

      <TouchableOpacity style={styles.botao} onPress={onVoltar}>
        <Text style={styles.textoBotao}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}