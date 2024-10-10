import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const AuthService = {
    login: async(email, password, role) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/login/`, null, {
              params: {
                email,
                password,
                role,
              },
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                // Store the JWT token in localStorage
                const {usertype} = response.data;
                localStorage.setItem('jwtToken', response.data.token);
                localStorage.setItem('userName', response.data.username);
                localStorage.setItem('userType', usertype);
                return true;
            }
        } catch (error) {
            console.error('Login failed:', error);
            return false;
        }
    },

    async register({ name, email, password, role }) {
      try {
          console.log('Sending registration request:', { name, email, password, role }); // Debugging output
          const response = await axios.post(`${API_BASE_URL}/register`, {
              name,
              email,
              password,
              role: role === "seller" ? 1 : 0  // Convert "seller" and "bidder" to integers (1 for seller, 0 for bidder)
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

    async addTeamSave(email, password, firstName, lastName, phone, address, role, userName) {
        const token = await localStorage.getItem('jwtToken');
        const username = await localStorage.getItem('userName');
        console.log(token);
        if (!token) {
            throw new Error('No token found');
        }
        console.log(email);
        console.log(password);
        console.log(firstName);
        console.log(userName);
        console.log(phone);
        console.log(address);
        console.log(role);
        console.log(lastName);
        try {
            const response = await axios.post(
                `${API_BASE_URL}/add_team/`,
                {
                    params: {
                        username: userName,
                        email: email,
                        password: password,
                        first_name: firstName,
                        last_name: lastName,
                        phone: phone,
                        address: address,
                        role: role,
                    }
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
                        'Authorization': `Bearer ${token}`,
                        'Accept': '*/*',
                    },
                    withCredentials: true,
                }
            );

            if (response.status === 200) {
                return response.data;
            }
        } catch (error) {
            if (error.response) {
                console.error('Server responded with an error:', error.response.data);
            } else if (error.request) {
                console.error('No response received:', error.request);
            } else {
                console.error('Error setting up the request:', error.message);
            }
            throw error;
        }
    },
};

export default AuthService;
