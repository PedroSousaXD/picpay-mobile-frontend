// components/TransactionModal.tsx
import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, TextInput } from 'react-native';
import styles from '../style/style';
import { createTransaction } from '../services/api'; 

// Define o tipo das props do componente
interface TransactionModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  senderId: string; // Supondo que senderId é uma string
  updateBalance: (amount: number) => void;
}

const TransactionModal: React.FC<TransactionModalProps> = ({ visible, setVisible, senderId, updateBalance }) => {
  const [receiverId, setReceiverId] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [error, setError] = useState<string>('');

  const handleTransaction = async () => {
    setError('');
    try {
      const response = await createTransaction(senderId, amount, receiverId);
      if (response) {
        updateBalance(Number(amount));
        setVisible(false);
      }
    } catch (err: any) {
      setError('Erro ao realizar transação: ' + err.message);
    }
  };

  return (
    <Modal 
      visible={visible} 
      onRequestClose={() => setVisible(false)} 
      transparent={true}
    >
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <View style={{ width: '90%', backgroundColor: 'white', borderRadius: 10, padding: 20 }}>
          <Text style={styles.text}>ID do Destinatário:</Text>
          <TextInput
            style={styles.input}
            value={receiverId}
            onChangeText={setReceiverId}
            placeholder="Digite o ID do destinatário"
          />
          <Text style={styles.text}>Valor:</Text>
          <TextInput
            style={styles.input}
            value={amount}
            onChangeText={setAmount}
            placeholder="Digite o valor"
            keyboardType="numeric"
          />
          {error && <Text style={{ color: 'red' }}>{error}</Text>}

          <TouchableOpacity style={styles.button} onPress={handleTransaction}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, { backgroundColor: '#f44336' }]} onPress={() => setVisible(false)}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default TransactionModal;