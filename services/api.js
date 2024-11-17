import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.6:8080/',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const login = async (document, password) => {
  try {
    const response = await api.post('/users/login', { document, password });
    return response.data;  
  } catch (error) {
    handleApiError(error, 'Credenciais inválidas');
  }
};

export const registerUser = async (userName, document, email, password) => {
  try {
    const response = await api.post('/users', {
      userName,
      document,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    handleApiError(error, 'Erro ao criar o usuário');
  }
};

export const createTransaction = async (senderId, amount, receiverId, token) => {
  try {
    const response = await api.post('/transactions', { 
      senderId, 
      receiverId, 
      amount 
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    handleApiError(error, 'Erro ao realizar a transação');
  }
};

export const fetchUserData = async (token) => {
  try {
    const response = await api.get('/users/user', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;  
  } catch (error) {
    handleApiError(error, 'Erro ao buscar dados do usuário');
  }
};

// Função para lidar com erros da API
const handleApiError = (error, defaultMessage) => {
  if (error.response) {
    throw new Error(error.response.data.message || defaultMessage);
  }
  throw new Error(defaultMessage);
}

export const fetchUserTransactions = async (userId, token) => {
  try {
    const response = await api.get(`/transactions/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    handleApiError(error, 'Erro ao buscar transações do usuário');
  }
};


export default api;