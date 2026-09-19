import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F7F2',
  },
  cameraContainer: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  cameraBotoes: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 40,
  },
  botaoFoto: {
    backgroundColor: '#2E7D32',
    padding: 18,
    borderRadius: 50,
    marginBottom: 15,
  },
  botaoCancelar: {
    backgroundColor: '#555',
    padding: 15,
    borderRadius: 12,
  },
  home: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  formulario: {
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B3A20',
    marginTop: 15,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#CCD5CC',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
  },
  inputGrande: {
    height: 120,
    textAlignVertical: 'top',
  },
  foto: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    marginBottom: 15,
  },
  botao: {
    backgroundColor: '#2E7D32',
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 15,
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
    marginBottom: 20,
  },
  textoBotaoSecundario: {
    color: '#2E7D32',
    fontSize: 17,
    fontWeight: 'bold',
  },
  botaoGPS: {
    backgroundColor: '#4D7C50',
    padding: 17,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 15,
  },
  statusGPS: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  indicadorGPS: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  statusTexto: {
    fontSize: 17,
    fontWeight: 'bold',
  },
  precisaoTexto: {
    fontSize: 14,
    color: '#555',
    marginTop: 3,
  },
  coordenadas: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  coordenadasTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B3A20',
    marginBottom: 8,
  },
  coordenadasTexto: {
    fontSize: 14,
    color: '#555',
    marginTop: 3,
  },
});