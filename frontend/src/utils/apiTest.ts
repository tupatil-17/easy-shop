import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';

// Test API connection
export const testAPI = async () => {
  try {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
    console.log('Testing API connection to:', API_URL);
    
    // Test registration
    const testData = {
      username: 'testuser123',
      email: 'testuser123@example.com',
      password: 'Test1234'
    };
    
    const response = await axios.post(`${API_URL}${API_ENDPOINTS.AUTH.REGISTER}`, testData, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true
    });
    
    console.log('API Test Success:', response.data);
    return response.data;
  } catch (error: any) {
    console.error('API Test Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      config: {
        url: error.config?.url,
        method: error.config?.method,
        data: error.config?.data
      }
    });
    throw error;
  }
};

// Add this to window for debugging
if (typeof window !== 'undefined') {
  (window as any).testAPI = testAPI;
}