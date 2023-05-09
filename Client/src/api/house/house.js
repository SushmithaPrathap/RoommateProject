import axios from 'axios';
import { apiAuth } from '../auth/Auth';

axios.defaults.baseURL = '/api/v1';
const BASE_URL = "http://localhost:9000"

export function createHouse( data ) {
    return axios.post(BASE_URL + "/house", data, 
      {
          headers: {
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + apiAuth.getAuth()
          },
        }
      )
  }
  

  export const house = {
    createHouse,
  };