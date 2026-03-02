import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },
  bar: {
    flexDirection: 'row',
    backgroundColor: '#1a1a1a', // Fundo escuro da referência
    width: '100%',
    height: 70,
    paddingBottom: 10,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: '#333',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerSpace: {
    width: 70, // Espaço para não cobrir o botão redondo
  },
  icon: {
    fontSize: 22,
    color: '#888',
  },
  label: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  activeText: {
    color: '#d81b60', // Rosa da referência
  },
  notificationDot: {
    position: 'absolute',
    top: 0,
    right: -4,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#d81b60',
  },
  fab: {
    position: 'absolute',
    bottom: 25, // Eleva o botão para fora da barra
    backgroundColor: '#d81b60',
    width: 65,
    height: 65,
    borderRadius: 32.5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 10,
  },
  fabIcon: {
    fontSize: 32,
    color: '#fff',
    fontWeight: '300',
  },
});