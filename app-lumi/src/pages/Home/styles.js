import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fffafb', // Um fundo levemente rosado
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ad1457',
    marginBottom: 5,
    alignSelf: 'flex-start'
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 25,
    alignSelf: 'flex-start'
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 30,
  },
  roundButton: {
    backgroundColor: '#d81b60',
    width: 75,
    height: 75,
    borderRadius: 38,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
  },
  buttonDisabled: {
    backgroundColor: '#f48fb1',
  },
  buttonLabel: {
    marginTop: 10,
    color: '#d81b60',
    fontWeight: '600',
    fontSize: 14,
    textTransform: 'uppercase',
  },
  infoBox: {
    backgroundColor: '#fff',
    width: '100%',
    padding: 20,
    borderRadius: 15,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#fce4ec',
    elevation: 2,
  },
  infoText: {
    fontSize: 15,
    color: '#444',
    lineHeight: 22,
  }
});