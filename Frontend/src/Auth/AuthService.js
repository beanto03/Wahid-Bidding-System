import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';
const AuthService = {
  async login(email, password) {
    try {
      const response = await axios.post('${API_BASE_URL}/login', { // Corrected with backticks
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          "Accept": 'application/json',
        },
        withCredentials: true
      });

      if (response.status === 200) {
        console.log("Login rensponse: ", response.data);
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('role', response.data.role);
        return true;
      }
    } catch (error) {
      if (error.response) {
        console.error('Login failed with response:', error.response.data);
        console.error('Status:', error.response.status);
        console.error('Headers:', error.response.headers);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error in setting up request:', error.message);
      }
      return false;
    }
  },

  async register({ name, email, password, role }) {
    try {
      const roleNumber = role === "seller" ? 1 : 0;

      const response = await axios.post(`${API_BASE_URL}/register`, {
        name,
        email,
        password,
        role: roleNumber
      }, {
        headers: {
          'Content-Type': 'application/json',
  
        },
      });

      if (response.status === 200) {
        console.log('Registration successful:', response.data);
        return true; // Registration successful
      }
    } catch (error) {
      if (error.response) {
        console.error('Registration failed:', error.response.data); // Log the server response
      } else {
        console.error('Registration error:', error.message);
      }
      return false; // Registration failed
    }
  },

  async addProduct({ name, description, startingBid, sellerId, images }) {
    try {
      const formData = new FormData();
      formData.append('product', JSON.stringify({ name, description, startingBid, sellerId }));

      // Append images to FormData
      for (let i = 0; i < images.length; i++) {
        formData.append('images', images[i]);
      }

      const response = await axios.post(`${API_BASE_URL}/products/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
      });
      
      if (response.status === 201 || response.status === 200) {
        console.log('Product added successfully:', response.data);
        return response.data; // Return the added product
      } else {
        console.error('Failed to add product:', response.data);
        return null; // Indicate failure
      }
    } catch (error) {
      console.error('Error adding product:', error);
      return null; // Indicate failure
    }
  }

  
};

export default AuthService;