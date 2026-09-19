import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, Alert } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import * as Location from 'expo-location';
import * as Linking from 'expo-linking';
import { useCameraPermissions } from 'expo-camera';

import { styles } from './src/styles/globalStyles';
import HomeScreen from './src/screens/HomeScreen';
import NovaVisitaScreen from './src/screens/NovaVisitaScreen';
import HistoricoScreen from './src/screens/HistoricoScreen';
import { salvarVisitaStorage, carregarVisitasStorage } from './src/services/storageService';

export default function App() {
  const [tela, setTela] = useState('home');

  const [produtor, setProdutor] = useState('');
  const [propriedade, setPropriedade] = useState('');
  const [tipoVisita, setTipoVisita] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const [foto, setFoto] = useState(null);
  const [cameraAberta, setCameraAberta] = useState(false);
  const [permission, requestPermission] = useCameraPermissions();

  const [localizacao, setLocalizacao] = useState(null);
  const [precisao, setPrecisao] = useState(null);
  const [gpsCarregando, setGpsCarregando] = useState(false);

  const [aceleracao, setAceleracao] = useState(0);
  const [listaHistorico, setListaHistorico] = useState([]);

  const alertaAtivo = useRef(false);

  // Monitoramento do Acelerômetro (Nível Pleno)
  useEffect(() => {
    Accelerometer.setUpdateInterval(400);
    const subscription = Accelerometer.addListener(({ x, y, z }) => {
      const aceleracaoTotal = Math.sqrt(x * x + y * y + z * z);
      setAceleracao(aceleracaoTotal);
    });

    return () => subscription.remove();
  }, []);

  // Alerta em tempo real de instabilidade física
  useEffect(() => {
    if (tela === 'nova' && aceleracao > 2.0 && !alertaAtivo.current) {
      alertaAtivo.current = true;
      Alert.alert(
        'Instabilidade Física Detectada',
        'Cuidado: Movimentação brusca do aparelho detectada. Segure firmemente para registrar a visita.',
        [
          {
            text: 'Entendi',
            onPress: () => {
              alertaAtivo.current = false;
            },
          },
        ]
      );
    }
  }, [aceleracao, tela]);

  function voltarHome() {
    setTela('home');
    setCameraAberta(false);
  }

  async function abrirCamera() {
    if (!permission) return;

    if (!permission.granted) {
      const resultado = await requestPermission();

      if (resultado.granted) {
        setCameraAberta(true);
      } else {
        if (!resultado.canAskAgain) {
          Alert.alert(
            'Permissão bloqueada',
            'Para tirar fotos, abra as configurações do aplicativo e permita o acesso à câmera.',
            [
              { text: 'Cancelar', style: 'cancel' },
              { text: 'Abrir configurações', onPress: () => Linking.openSettings() },
            ]
          );
        } else {
          Alert.alert('Permissão necessária', 'O aplicativo precisa acessar a câmera para registrar a visita.');
        }
        return;
      }
    } else {
      setCameraAberta(true);
    }
  }

  async function tirarFoto(cameraRef) {
    if (!cameraRef) return;
    try {
      const resultado = await cameraRef.takePictureAsync();
      setFoto(resultado.uri);
      setCameraAberta(false);
    } catch (erro) {
      Alert.alert('Erro', 'Não foi possível capturar a foto.');
    }
  }

  async function capturarLocalizacao() {
    try {
      setGpsCarregando(true);
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        Alert.alert('Permissão de localização', 'O aplicativo precisa da localização para registrar o local da visita.');
        setGpsCarregando(false);
        return;
      }

      const local = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLocalizacao({
        latitude: local.coords.latitude,
        longitude: local.coords.longitude,
      });
      setPrecisao(local.coords.accuracy);
      setGpsCarregando(false);
    } catch (erro) {
      setGpsCarregando(false);
      Alert.alert('Erro de localização', 'Não foi possível obter a localização. Verifique se o GPS está ativado.');
    }
  }

  async function carregarHistorico() {
    const visitas = await carregarVisitasStorage();
    setListaHistorico(visitas);
  }

  function obterStatusPrecisao() {
    if (precisao === null) return { texto: 'Localização não capturada', cor: '#777' };
    if (precisao < 10) return { texto: 'Alta precisão', cor: '#2E7D32' };
    if (precisao <= 30) return { texto: 'Média precisão', cor: '#F9A825' };
    return { texto: 'Baixa precisão', cor: '#C62828' };
  }

  async function concluirVisita() {
    if (!produtor || !propriedade) {
      Alert.alert('Atenção', 'Preencha o produtor e a propriedade.');
      return;
    }

    if (aceleracao > 2.0) {
      Alert.alert('Instabilidade Física Detectada', 'O envio foi bloqueado devido à movimentação brusca do aparelho.');
      return;
    }

    const novaVisita = {
      id: Date.now().toString(),
      produtor,
      propriedade,
      tipoVisita,
      observacoes,
      foto,
      localizacao,
      precisao,
      data: new Date().toISOString(),
    };

    const sucesso = await salvarVisitaStorage(novaVisita);

    if (sucesso) {
      Alert.alert('Visita registrada', 'A visita foi salva com sucesso no aparelho!');
      setProdutor('');
      setPropriedade('');
      setTipoVisita('');
      setObservacoes('');
      setFoto(null);
      setLocalizacao(null);
      setPrecisao(null);
      setTela('home');
    } else {
      Alert.alert('Erro', 'Não foi possível salvar a visita no aparelho.');
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      {tela === 'home' && (
        <HomeScreen
          onIrParaNovaVisita={() => setTela('nova')}
          onIrParaHistorico={() => {
            setTela('historico');
            carregarHistorico();
          }}
        />
      )}

      {tela === 'nova' && (
        <NovaVisitaScreen
          produtor={produtor}
          setProdutor={setProdutor}
          propriedade={propriedade}
          setPropriedade={setPropriedade}
          tipoVisita={tipoVisita}
          setTipoVisita={setTipoVisita}
          observacoes={observacoes}
          setObservacoes={setObservacoes}
          foto={foto}
          cameraAberta={cameraAberta}
          setCameraAberta={setCameraAberta}
          abrirCamera={abrirCamera}
          tirarFoto={tirarFoto}
          localizacao={localizacao}
          precisao={precisao}
          gpsCarregando={gpsCarregando}
          capturarLocalizacao={capturarLocalizacao}
          obterStatusPrecisao={obterStatusPrecisao}
          concluirVisita={concluirVisita}
          voltarHome={voltarHome}
        />
      )}

      {tela === 'historico' && (
        <HistoricoScreen
          listaHistorico={listaHistorico}
          onVoltar={() => setTela('home')}
        />
      )}
    </SafeAreaView>
  );
}