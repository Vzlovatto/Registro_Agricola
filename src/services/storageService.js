import AsyncStorage from '@react-native-async-storage/async-storage';
import { CHAVE_VISITAS } from '../constants/storageKeys';

export async function salvarVisitaStorage(novaVisita) {
  try {
    const visitasSalvas = await AsyncStorage.getItem(CHAVE_VISITAS);
    const visitas = visitasSalvas ? JSON.parse(visitasSalvas) : [];
    visitas.push(novaVisita);
    await AsyncStorage.setItem(CHAVE_VISITAS, JSON.stringify(visitas));
    return true;
  } catch (erro) {
    console.log(erro);
    return false;
  }
}

export async function carregarVisitasStorage() {
  try {
    const visitasSalvas = await AsyncStorage.getItem(CHAVE_VISITAS);
    return visitasSalvas ? JSON.parse(visitasSalvas) : [];
  } catch (erro) {
    console.log(erro);
    return [];
  }
}