import axios from 'axios';

axios.defaults.withCredentials = true;

const API_BASE_URL = 'http://localhost:8082/api';

const SaveItemsManager = {
  async addDriverSave(email, password, firstName, lastName, phone, address, dob, image, tfn, abn, isHourly, cPercentage, hRate) {
    const token = await localStorage.getItem('jwtToken');
    const username = await localStorage.getItem('userName');

    try {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('password', password);
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('phone', phone);
      formData.append('address', address);
      formData.append('tfn', tfn);
      formData.append('abn', abn);
      formData.append('isHourly', isHourly);
      formData.append('cPercentage', cPercentage);
      formData.append('hRate', hRate);
      formData.append('dob', dob);
      if (image) {
        formData.append('image', image); // Assuming 'image' is the key on the server to handle file uploads
      }

      const response = await axios.post(
        `${API_BASE_URL}/add_driver/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data for file uploads
            Authorization: `Bearer ${token}`,
          },
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
  async addTransSave(file, code) {
    const token = await localStorage.getItem('jwtToken');
    const username = await localStorage.getItem('userName');

    try {
      const formData = new FormData();
      formData.append('code', code);
      if (file) {
        formData.append('file', file); // Assuming 'image' is the key on the server to handle file uploads
      }

      const response = await axios.post(
        `${API_BASE_URL}/add_transactions_manger/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data for file uploads
            Authorization: `Bearer ${token}`,
          },
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

  async addSuburbSave(name, fee) {
    const token = await localStorage.getItem('jwtToken');
    const username = await localStorage.getItem('userName');

    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('fee', fee);

      const response = await axios.post(
        `${API_BASE_URL}/add_suburb_manager/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data for file uploads
            Authorization: `Bearer ${token}`,
          },
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

export default SaveItemsManager;
