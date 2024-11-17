import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Alert, ActivityIndicator } from 'react-native';
import { fetchUserTransactions } from '../../services/api'; 
import styles from '../../style/style';
import TransactionModal from '../../components/TransactionModal';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

interface Transaction {
  id: string;
  amount: number;
  receiverId?: string;
  timestamp: string;
}

interface User {
  id: string;
  userName: string;
  balance: number;
}

export type RootStackParamList = {
  Home: { user: User };
}

interface HomeScreenProps {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
  route: RouteProp<RootStackParamList, 'Home'>;
}

const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { 
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  };
  return new Date(dateString).toLocaleDateString('pt-BR', options);
};

const HomeScreen: React.FC<HomeScreenProps> = ({ route, navigation }) => {
  const { user } = route.params;

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [balance, setBalance] = useState<number>(user.balance);

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const transactionData = await fetchUserTransactions(user.id);
        setTransactions(transactionData);
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar as transações.');
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [user.id]);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.text}>Bem-vindo, {user.userName}!</Text>
      <Text style={styles.text}>Saldo: R$ {user.balance}</Text>
      <Text style={styles.text}>ID do Remetente: {user.id}</Text>
      
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Realizar Transação</Text>
      </TouchableOpacity>

      <TransactionModal 
        visible={modalVisible} 
        setVisible={setModalVisible} 
        senderId={user.id} 
        updateBalance={(amount) => setBalance(prev => prev + amount)} 
      />

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <Text style={styles.text}>Histórico de Transações</Text>
          <FlatList 
            data={transactions} 
            keyExtractor={item => item.id}
            contentContainerStyle={{ alignItems: 'center' }}
            renderItem={({ item }) => (
              <View style={styles.transactionItem}>
                <Text style={styles.transactionText}>ID da Transação: {item.id}</Text>
                <Text style={styles.transactionText}>Valor: R$ {item.amount.toFixed(2)}</Text>
                <Text style={styles.transactionText}>Para: {item.receiverId ? item.receiverId : 'Não especificado'}</Text>
                <Text style={styles.transactionText}>Data: {formatDate(item.timestamp)}</Text>
              </View>
            )}
            initialNumToRender={3}
            style={styles.transactionList}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </View>
  );
};

export default HomeScreen;