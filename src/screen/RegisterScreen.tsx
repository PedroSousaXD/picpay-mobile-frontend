// screens/RegisterScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image } from 'react-native';
import { registerUser } from '../../services/api'; 
import styles from '../../style/style';
import { Feather } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';

// Definindo uma interface para as propriedades da tela de registro
interface RegisterScreenProps {
  navigation: NavigationProp<any>; // Ajuste o tipo de navegação conforme necessário
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [userName, setUserName] = useState<string>('');
  const [document, setDocument] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = async () => {
    setError('');
    try {
      const response = await registerUser(userName, document, email, password);
      navigation.navigate('Login'); 
    } catch (err) {
      setError((err as Error).message); // Asserção de tipo para acessar a mensagem de erro
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <View style={styles.formContainer}>
        <Text style={styles.text}>Nome:</Text>
        <TextInput
          style={styles.input}
          value={userName}
          onChangeText={setUserName}
          placeholder="Digite seu nome"
        />
        <Text style={styles.text}>Documento:</Text>
        <TextInput
          style={styles.input}
          value={document}
          onChangeText={setDocument}
          placeholder="Digite seu CPF ou CNPJ"
        />
        <Text style={styles.text}>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Digite seu email"
          keyboardType="email-address"
        />
        <Text style={styles.text}>Senha:</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Digite sua senha"
            secureTextEntry={!showPassword} 
          />
          <TouchableOpacity 
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Feather 
              name={showPassword ? 'eye-off' : 'eye'} 
              size={20}
              color="gray"
            />
          </TouchableOpacity>
        </View>
        {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{ marginTop: 10, color: 'blue' }}>
            Já tem uma conta? Realize o login
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;