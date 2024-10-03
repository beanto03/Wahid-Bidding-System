import axios from 'axios';

axios.defaults.withCredentials = true;

const API_BASE_URL = 'http://localhost:8082/api';

const EditItemsAdmin = {
  async editTeamSave(email, password, firstName, lastName, phone, address, role, userName, dob, image, user_id) {
    const token = await localStorage.getItem('jwtToken');
    const username = await localStorage.getItem('userName');

    try {
      const formData = new FormData();
      formData.append('username', userName);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('phone', phone);
      formData.append('address', address);
      formData.append('role', role);
      formData.append('dob', dob);
      formData.append('user_id', user_id);
      if (image) {
        formData.append('image', image); // Assuming 'image' is the key on the server to handle file uploads
      }

      const response = await axios.post(
        `${API_BASE_URL}/edit_team/`,
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
  async editAgentSave(email, password, firstName, lastName, phone, address, userName, image, user_id, expiry, begin, company, country) {
    const token = await localStorage.getItem('jwtToken');
    const username = await localStorage.getItem('userName');

    try {
      const formData = new FormData();
      formData.append('username', userName);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('phone', phone);
      formData.append('address', address);
      formData.append('user_id', user_id);
      formData.append('expiry', expiry);
      formData.append('begin', begin);
      formData.append('company', company);
      formData.append('country', country);
      if (image) {
        formData.append('image', image); // Assuming 'image' is the key on the server to handle file uploads
      }

      const response = await axios.post(
        `${API_BASE_URL}/edit_agent/`,
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
  async editSocialSave(socialData) {
    const token = await localStorage.getItem('jwtToken');

    try {
      
      const response = await axios.post(
        `${API_BASE_URL}/social_media/`,
        socialData,
        {
            headers: {
                'Content-Type': 'application/json', // Set content type to application/json
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
  async editPostCad(id, categoryName, categorySlug) {
    const token = await localStorage.getItem('jwtToken');
    console.log(id)
    console.log(categoryName)
    console.log(categorySlug)

    try {
      const requestData = {
        id,
        categoryName,
        categorySlug,
      };

      const response = await axios.post(
        `${API_BASE_URL}/post_cat_edit_admin/`,
        requestData,
        {
          headers: {
            'Content-Type': 'application/json', // Set content type to application/json
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

export default EditItemsAdmin;
