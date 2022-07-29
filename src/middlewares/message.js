//= = Imports
// Import d'axios pour les requêtes API
import axios from 'axios';
import { FETCH_RECEIVED_MESSAGE, saveReceivedMessage } from '../actions/message';

const axiosInstance = axios.create({
    // on définit l'url de base
    baseURL: 'http://romaingibet-server.eddi.cloud/api/',
  });
const messageMiddleware = (store) => (next) => (action) => {
    switch (action.type) {
      case FETCH_RECEIVED_MESSAGE: {
        // On renseigne le end point
        const state = store.getState();
        // Récupération de l'id de l'utilisateur connecté dans le state
        const { id, token } = state.user.login;
        // console.log(id);

        // Requête API avec transmission du token pour authentification
        axiosInstance.get(`/receivedMessages/${id}/20/0`, 
        {headers: {"Authorization" : `Bearer ${token}`}})
  
            // On traite la réponse
          .then((response) => {
            // console.log(response);
            store.dispatch(saveReceivedMessage(response.data));
          })
          // On catche la potentielle erreur
          .catch(
            (error) => {
              console.log(error);
            },
          );
  
        return next(action);
      }
  
      default:
        next(action);
    }
  };
  
  export default messageMiddleware;
