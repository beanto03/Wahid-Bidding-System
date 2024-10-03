import axios from 'axios';

axios.defaults.withCredentials = true;

const API_BASE_URL = 'http://localhost:8082/api';

const GetItemsManager = {
  async getTeamDataManager() {
    const token = await localStorage.getItem('jwtToken');
    const username = await localStorage.getItem('userName');

    try {
      const response = await axios.get(
        `${API_BASE_URL}/view_drivers_manager`,

        {
          // request headers
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
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

  async getTeamDataAdminEdit(user_id) {
    const token = await localStorage.getItem('jwtToken');

    
    try {
      const response = await axios.get(
        `${API_BASE_URL}/view_teams_admin_edit/${user_id}`,

        {
          // request headers
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
        }
      );
  
      console.log(response.data.first_name)      
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

  async getTransDataManager() {
    const token = await localStorage.getItem('jwtToken');
    const username = await localStorage.getItem('userName');

    try {
      const response = await axios.get(
        `${API_BASE_URL}/view_transactions_manager`,

        {
          // request headers
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
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

  async getSuburbsManager() {
    const token = await localStorage.getItem('jwtToken');
    const username = await localStorage.getItem('userName');

    try {
      const response = await axios.get(
        `${API_BASE_URL}/view_suburbs_manager`,

        {
          // request headers
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          }
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



export default GetItemsManager;
