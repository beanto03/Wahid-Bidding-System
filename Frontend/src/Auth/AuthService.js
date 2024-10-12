import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';


const AuthService = {
  async login(email, password) {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, { // Corrected with backticks
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          "Accept": "/"
        },
        withCredentials: true
      });

      if (response.status === 200) {
        localStorage.setItem('username', response.data.username);
        localStorage.setItem('role', response.data.role);
        return true;
      }
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    }
  },


    async register({ name, email, password, role }) {
      try {
          //console.log('Sending registration request:', { name, email, password, role }); // Debugging output
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
              console.error('Registration failedj:', error.response.data); // Log the server response
          } else {
              console.error('Registration error:', error.message);
          }
          return false; // Registration failed
      }
  }
};

export default AuthService;
