import axios from 'axios';

const API_URL = 'http://192.168.1.145:5001/api';

export const api = async (metodo, endpoint, datos) => {
  try {
    let respuesta
    switch(metodo) {
      case "GET":
        respuesta = await axios.get(`${API_URL}/${endpoint}`);
        break;
      case "POST":
        respuesta = await axios.post(`${API_URL}/${endpoint}`, datos);
        break;
      case "PUT":
        respuesta = await axios.put(`${API_URL}/${endpoint}`, datos);
        break;
      case "DELETE":
        respuesta = await axios.delete(`${API_URL}/${endpoint}`, datos);
        break;
      case "PATCH":
        respuesta = await axios.patch(`${API_URL}/${endpoint}`, datos);
        break;

    }
    return respuesta.data;
  } catch (error) {
    console.error('Error en la API:', error);
    throw error;
  }
};