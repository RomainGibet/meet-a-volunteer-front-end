// Gestion appel API pour les expériences de la page home

//= = Imports
// Import d'axios pour les requêtes API
import axios from 'axios';
import {
  ADD_EXPERIENCE,
  FETCH_EXPERIENCES_BY_ID,
  FETCH_EXPERIENCES_HOME,
  saveExperienceData,
  saveExperiencesHome,
  saveExperienceStructure,
  saveExperienceThematics,
  saveExperienceUser,
  saveExperienceVolunteering,
  toggleFormError,
  toggleFormSuccess,
} from '../actions/experience';

const axiosInstance = axios.create({
  // on définit l'url de base
  baseURL: 'http://romaingibet-server.eddi.cloud/api',
});
const homeExperienceMiddleware = (store) => (next) => (action) => {
  switch (action.type) {
    case FETCH_EXPERIENCES_HOME: {
      axiosInstance.get('/experiences/random/8/0')

      // On traite la réponse
        .then((response) => {
          store.dispatch(saveExperiencesHome(response.data));
        })
      // On catche la potentielle erreur
        .catch(
          (error) => {
            console.log(error);
          },
        );

      return next(action);
    }
    case ADD_EXPERIENCE: {
      const {
        experiences: {
          addExperience: {
            title,
            typeOfVolunteering,
            hostOrganization,
            thematics,
            country,
            year,
            duration,
            spokenLanguageFirst,
            spokenLanguageSecond,
            participationFees,
            accomodation,
            food,
            feedBack,
            image,
            formError,
          },
        },
      } = store.getState();
      const { user: { login: { token } } } = store.getState();
      const bodyFormData = new FormData();
      bodyFormData.append('title', title);
      bodyFormData.append('country', country);
      bodyFormData.append('year', year);
      bodyFormData.append('duration', duration);
      bodyFormData.append('feedback', feedBack);
      bodyFormData.append('participation_fee', participationFees);
      bodyFormData.append('isHosted', accomodation);
      bodyFormData.append('isFed', food);
      bodyFormData.append('volunteeringType', typeOfVolunteering);
      bodyFormData.append('receptionStructure', hostOrganization);
      thematics.forEach((item) => {
        bodyFormData.append('thematic[]', item);
      });
      if (image !== '') {
        bodyFormData.append('pictureFile', image);
      }
      bodyFormData.append('language[]', spokenLanguageFirst);
      if (spokenLanguageSecond !== '') {
        bodyFormData.append('language[]', spokenLanguageSecond);
      }

      axiosInstance.post(
        '/experiences',

        bodyFormData,

        { headers: { Authorization: `Bearer ${token}` } },
      )
        .then((response) => {
          console.log(response);
          store.dispatch(toggleFormSuccess());
          if (formError) {
            store.dispatch(toggleFormError());
          }
        })
      // On catche la potentielle erreur
        .catch(
          (error) => {
            console.log(error);
            console.log(token);
            console.log(
              bodyFormData.values(),
            );
          },
        );

      return next(action);
    }
    case FETCH_EXPERIENCES_BY_ID: {
      const { experiences: { experienceId } } = store.getState();
      axiosInstance.get(`/experiences/${experienceId}`)

      // On traite la réponse
        .then((response) => {
          store.dispatch(saveExperienceData(response.data));
          store.dispatch(saveExperienceThematics(response.data.thematic));
          store.dispatch(saveExperienceUser(response.data.user));
          store.dispatch(saveExperienceStructure(response.data.receptionStructure));
          store.dispatch(saveExperienceVolunteering(response.data.volunteeringType));
        })
      // On catche la potentielle erreur
        .catch(
          (error) => {
            console.log(error);
            console.log(experienceId);
          },
        );

      return next(action);
    }

    default:
      next(action);
  }
};

export default homeExperienceMiddleware;
