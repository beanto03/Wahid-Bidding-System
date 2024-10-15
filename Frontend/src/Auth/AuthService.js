// AuthService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const AuthService = {
  async login(email, password) {
    // try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      }, {
        headers: {
          'Content-Type': 'application/json',
          "Accept": "application/json"
        },
        withCredentials: true
      });

      if (response.status === 200) {
        localStorage.setItem('email', response.data.email);
        localStorage.setItem('role', response.data.role);
      
     //   localStorage.setItem('token', response.data.token);
        return true;
      }
    // } catch (error) {
    //   console.error('Login failed:', error);
    //   return false;
    // }
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
        return true;
      }
    } catch (error) {
      if (error.response) {
        console.error('Registration failed:', error.response.data);
      } else {
        console.error('Registration error:', error.message);
      }
      return false;
    }
  },

  async addProduct({ name, description, startingBid, sellerId, imageBase64Strings }) {
    try {
      const formData = new FormData();
      formData.append('product', JSON.stringify({ name, description, startingBid, sellerId }));

      if (imageBase64Strings) {
        formData.append('images', imageBase64Strings);
      }
        //use POST method not PUT
      const response = await axios.post(`${API_BASE_URL}/products/add`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
      });

      if (response.status === 200 || response.status === 201) {
        console.log('Product added successfully:', response.data);
        return response.data; // Return the added product
      } else {
        console.error('Failed to add product. Response status:', response.status);
        return null; // Indicate failure
      }
    } catch (error) {
      if (error.response) {
        console.error('Error response from server:', error.response.data);
      } else {
        console.error('Error adding product:', error.message);
      }
      return null; // Indicate failure
    }
  },

  //update product

  async updateProduct(productId, formData) {
    try {
      const response = await axios.put(
        `${API_BASE_URL}/products/update/${productId}`,
        formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },
  //to fetch bid history

  // async getBidHistory(buyerId, productId) {
  //   try {
  //     const response = await axios.get(${API_BASE_URL}/bidHistory/getBids/${buyerId}/${productId});
  //     return response.data;  // Return the fetched bid history
  //   } catch (error) {
  //     console.error('Error fetching bid history:', error);
  //     throw new Error(error.message);
  //   }
  // },

// Add a request interceptor to include the JWT token in headers
// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token'); // Retrieve token from localStorage
//     if (token) {
//       config.headers['Authorization'] = Bearer ${token};
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// New Method to Fetch Products
async  getProducts() {
  try {
    const response = await axios.get(`${API_BASE_URL}/products/all`,{
      headers: {
        'Content-Type': 'application/json',
      },
    } );

    if (response.status === 200) {
      console.log('Fetched products successfully:', response.data);
      return response.data ;
    } else if (response.status === 204) {
      // No Content
      return { success: true, data: [] };
    } else {
      console.error('Unexpected response status:', response.status);
      return { success: false, message: 'Failed to fetch products.' };
    }
  } catch (error) {
    if (error.response) {
      console.error('Error fetching products:', error.response.data);
      return { success: false, message: error.response.data.msg || 'Error fetching products.' };
    } else {
      console.error('Error fetching products:', error.message);
      return { success: false, message: 'An error occurred while fetching products.' };
    }
  }
},

 /*// Fetch products specifically for bidding
 async getProductsForBidding() {
  try {
    const response = await axios.get(`${API_BASE_URL}/bid/products`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      console.log('Fetched products for bidding successfully:', response.data);
      return response.data;
    } else {
      console.error('Failed to fetch products for bidding. Response status:', response.status);
      return null;
    }
  } catch (error) {
    if (error.response) {
      console.error('Error fetching products for bidding:', error.response.data);
    } else {
      console.error('Error fetching products for bidding:', error.message);
    }
    return null;
  }
},*/
// Add this method to handle product deletion
async deleteProduct(productId) {
  try {
    const response = await axios.delete(`${API_BASE_URL}/products/delete/${productId}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      console.log('Product deleted successfully:', response.data);
      return true;
    } else {
      console.error('Failed to delete product. Response status:', response.status);
      return false;
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    return false;
  }
},

};

export default AuthService;