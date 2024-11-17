import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  transactionItem: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    width: '100%',
  },  
  transactionList: {
    maxHeight: 200,
    width: '100%',
    marginBottom: 20,
  },
  transactionText: {
    fontSize: 16,
    color: '#333',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  formContainer: {
    width: '90%',
    paddingHorizontal: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    paddingRight: 40,
    backgroundColor: 'white',
  },
  text: {
    marginBottom: 5,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  logo: {
    width: 160,
    height: 45,
    alignSelf: 'center',
    marginBottom: 20,
  },
  passwordContainer: {
    position: 'relative',
    width: '100%',
  },
});

export default styles;