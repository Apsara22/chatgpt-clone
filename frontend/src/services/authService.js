import API from '../api/config';

export const registerUser = async (userData) => {
  try {
    const response = await API.post('/User/register', userData);
    return response.data;
  } catch (error) {
    // Handle different error responses
    if (error.response) {
      // Server responded with error status
      throw new Error(error.response.data.message || 'Registration failed');
    } else if (error.request) {
      // Request was made but no response
      throw new Error('Network error. Please check your connection.');
    } else {
      // Something else happened
      throw new Error('An unexpected error occurred.');
    }
  }
};