import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import { CameraView } from 'expo-camera';
import { styles } from '../styles/globalStyles';

let cameraRef = null;

export default function NovaVisitaScreen({
  produtor,
  setProdutor,
  propriedade,
  setPropriedade,
  tipoVisita,
  setTipoVisita,
  observacoes,
  setObservacoes,
  foto,
  cameraAberta,
  setCameraAberta,
  abrirCamera,
  tirarFoto,
  localizacao,
  precisao,
  gpsCarregando,
  capturarLocalizacao,
  obterStatusPrecisao,
  concluirVisita,
  voltarHome,
}) {
  if (cameraAberta) {
    return (
      <SafeAreaView style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          facing="back"
          ref={(ref) => {
            cameraRef = ref;
          }}
        >
          <View style={styles.cameraBotoes}>
            <TouchableOpacity
              style={styles.botaoFoto}
              onPress={() => tirarFoto(cameraRef)}
            >
              <Text style={styles.textoBotao}>Tirar Foto</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoCancelar}
              onPress={() => setCameraAberta(false)}
            >
              <Text style={styles.textoBotao}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
      </SafeAreaView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.formulario}>
      <Text style={styles.titulo}>Nova Visita</Text>

      <Text style={styles.label}>Nome do produtor *</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome"
        value={produtor}
        onChangeText={setProdutor}
      />

      <Text style={styles.label}>Propriedade *</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome da propriedade"
        value={propriedade}
        onChangeText={setPropriedade}
      />

      <Text style={styles.label}>Tipo de visita</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Inspeção agrícola"
        value={tipoVisita}
        onChangeText={setTipoVisita}
      />

      <Text style={styles.label}>Observações</Text>
      <TextInput
        style={[styles.input, styles.inputGrande]}
        placeholder="Digite as observações"
        value={observacoes}
        onChangeText={setObservacoes}
        multiline
      />

      <Text style={styles.label}>Localização da visita</Text>
      <TouchableOpacity
        style={styles.botaoGPS}
        onPress={capturarLocalizacao}
        disabled={gpsCarregando}
      >
        <Text style={styles.textoBotao}>
          {gpsCarregando ? 'Obtendo localização...' : 'Capturar localização'}
        </Text>
      </TouchableOpacity>

      {precisao !== null && (
        <View style={[styles.statusGPS, { borderColor: obterStatusPrecisao().cor }]}>
          <View style={[styles.indicadorGPS, { backgroundColor: obterStatusPrecisao().cor }]} />
          <View>
            <Text style={[styles.statusTexto, { color: obterStatusPrecisao().cor }]}>
              {obterStatusPrecisao().texto}
            </Text>
            <Text style={styles.precisaoTexto}>Precisão: {precisao.toFixed(1)} metros</Text>
          </View>
        </View>
      )}

      {localizacao && (
        <View style={styles.coordenadas}>
          <Text style={styles.coordenadasTitulo}>Coordenadas capturadas</Text>
          <Text style={styles.coordenadasTexto}>Latitude: {localizacao.latitude.toFixed(6)}</Text>
          <Text style={styles.coordenadasTexto}>Longitude: {localizacao.longitude.toFixed(6)}</Text>
        </View>
      )}

      <Text style={styles.label}>Registro fotográfico</Text>
      {foto && <Image source={{ uri: foto }} style={styles.foto} />}

      <TouchableOpacity style={styles.botao} onPress={abrirCamera}>
        <Text style={styles.textoBotao}>{foto ? 'Tirar outra foto' : 'Tirar foto'}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={concluirVisita}>
        <Text style={styles.textoBotao}>Concluir Visita</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoSecundario} onPress={voltarHome}>
        <Text style={styles.textoBotaoSecundario}>Voltar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}