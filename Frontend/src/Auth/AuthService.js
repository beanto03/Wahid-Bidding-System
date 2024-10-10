import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';


const AuthService = {
    async login(email, password) {
      try {
        const response = await axios.post(`${API_BASE_URL}/app_auth/`, {
            email,
            password,
            
        },
        {
              headers: {
              'Content-Type': 'application/json',
            },
          }
        );
  
        if (response.status === 200) {
          // Store the JWT token in localStorage
          localStorage.setItem('jwtToken', response.data.token);
          localStorage.setItem('userName', response.data.username);
          localStorage.setItem('userType', response.data.user_type);
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
          const response = await axios.post(`${API_BASE_URL}/register`, {
              name,
              email,
              password,
              role
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
