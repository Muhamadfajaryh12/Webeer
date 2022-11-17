import axios from 'axios';
import API_ENDPOINT from '../globals/api-endpoint';

class User {
  static async Register({
    username, email, password, role,
  }) {
    try {
      const url = `${API_ENDPOINT.REGISTER}`;
      const data = {
        username,
        email,
        password,
        role,
      };
      const response = await axios.post(url, data);
      if (response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }
      console.log(response);
      return response.data.data;
    } catch (err) {
      return { error: err.response.data.message || err.message };
    }
  }

  static async Login({ email, password }) {
    try {
      const url = `${API_ENDPOINT.LOGIN}`;
      const data = {
        email,
        password,
      };
      const response = await axios.post(url, data);
      if (response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }
      console.log(response);
      const responseToken = response.data.token;
      localStorage.setItem(
        'token',
        JSON.stringify(responseToken),
      );
      return response;
    } catch (err) {
      return { error: err.response.data.message || err.message };
    }
  }

  static async getUser() {
    try {
      const jwt = localStorage.getItem('token').replaceAll('"', '');
      const responseJson = await axios({
        url: `${API_ENDPOINT.USER}`,
        headers: {
          auth: `${jwt}`,
        },
      });
      return responseJson.data.data;
    } catch (error) {
      return console.log(error);
    }
  }

  static async Logout() {
    try {
      const jwt = localStorage.getItem('token').replaceAll('"', '');
      const response = await axios({
        url: `${API_ENDPOINT.LOGOUT}`,
        method: 'POST',
        headers: {
          auth: `${jwt}`,
        },
      });
      if (response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }
      localStorage.removeItem('token');
      window.location.reload();
      return response.data;
    } catch (err) {
      return { error: err.response.data.message || err.message };
    }
  }

  static async Resend({ idUser, email }) {
    try {
      const url = `${API_ENDPOINT.RESEND}`;
      const data = {
        idUser,
        email,
      };
      const response = await axios.post(url, data);
      if (response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }
      return response;
    } catch (err) {
      return { error: err.response.data.message || err.message };
    }
  }

  static async Verification({ idUser, OTP }) {
    try {
      const url = `${API_ENDPOINT.VERIFICATION}`;
      const data = {
        idUser,
        OTP,
      };
      const response = await axios.post(url, data);
      if (response.statusText !== 'OK') {
        throw new Error(response.data.message);
      }
      return response;
    } catch (err) {
      return { error: err.response.data.message || err.message };
    }
  }
}
export default User;