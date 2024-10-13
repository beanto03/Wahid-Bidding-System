import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

  //take login user input in frontend 
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

        //take register from user input in frontend 
    async register({ name, email, password, role }) {
      try {
          //console.log('Sending registration request:', { name, email, password, role }); // Debugging output
          const roleNumber = role === "seller" ? 1 : 0;

           const response = await axios.post('${API_BASE_URL}/register', {
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