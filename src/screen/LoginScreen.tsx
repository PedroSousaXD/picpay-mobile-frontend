import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, Image } from 'react-native';
import { login } from '../../services/api'; 
import styles from '../../style/style';
import { Feather } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';

interface LoginScreenProps {
  navigation: NavigationProp<any>;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [document, setDocument] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);  

  const handleLogin = async () => {
    setError('');  
    try {
      const data = await login(document, password);
      if (data) {
        navigation.navigate('Home', { user: data });
      } 
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <View style={styles.formContainer}>
        <Text style={styles.text}>Documento (CPF ou CNPJ):</Text>
        <TextInput
          style={styles.input}
          value={document}
          onChangeText={setDocument}
          placeholder="Digite seu CPF ou CNPJ"
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
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={{ marginTop: 10, color: 'blue' }}>
            Não tem uma conta? Crie uma
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;