// Imports
import './style.scss';
import {
  Form, Select, Button, Input,
} from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { submitProfile, changeFieldValue } from '../../../actions/profile';

function ProfileUpdateForm() {
// -----------------RECUPERATION DES DONNEES DU STATE------------------
  const {
    pseudo, firstname, lastname, age, profilePicture, email, biography, nativeCountry,
  } = useSelector((state) => state.profile.profileDetails);

  const countryList = useSelector((state) => state.country.countryList);

  const dispatch = useDispatch();

  // Envoi du formulaire
  const handleSubmit = () => {
    dispatch(submitProfile());
  };

  // -------------- HANDLES ON CHANGE ------------
  const handleImageChange = (event) => {
    console.log(event.target.files[0]);
    dispatch(changeFieldValue((event.target.files[0]), 'profilePicture'));
  };

  const handlePseudoChange = (event) => {
    dispatch(changeFieldValue(event.currentTarget.value, 'pseudo'));
  };

  const handleBiographyChange = (event) => {
    dispatch(changeFieldValue(event.currentTarget.value, 'biography'));
  };

  const handleFirstnameChange = (event) => {
    dispatch(changeFieldValue(event.currentTarget.value, 'firstname'));
  };

  const handleLastnameChange = (event) => {
    dispatch(changeFieldValue(event.currentTarget.value, 'lastname'));
  };

  const handleEmailChange = (event) => {
    dispatch(changeFieldValue(event.currentTarget.value, 'email'));
  };

  const handleBirthDateChange = (event) => {
    dispatch(changeFieldValue(event.currentTarget.value, 'age'));
  };

  // Ecouteur d'événement : on peut mettre l'événement en argument, et aussi la valeur
  const handleCountryChange = (event, value) => {
    dispatch(changeFieldValue(value.value, 'nativeCountry'));
  };

  return (
    <div className="content__page__all content__page__others profile__content">
      <div className="profile__form">
        <h2 className="main__title">Update profile</h2>
        <div className="profile__form--content">
          <div className="profile__form--imgpreview">
            <img src={`http://romaingibet-server.eddi.cloud/images/pp/${profilePicture}`} alt="" />
            {/* <img src={(profilePicture !== '') ? URL.createObjectURL(`http://romaingibet-server.eddi.cloud/images/pp/${profilePicture}`) : profilePicture} alt="" /> */}
          </div>
          <div className="profile__form--fields">
            <Form onSubmit={handleSubmit} unstackable className="profile__form--main">
              <Input onChange={handleImageChange}  type="file" label="Select an image" accept="image/png" className="profile__form--main__input" />
              <Form.Field>
                <label>Pseudo</label>
                <input value={pseudo} onChange={handlePseudoChange} />
              </Form.Field>
              <Form.TextArea value={biography} onChange={handleBiographyChange} label="Your description" />
              <h3 className="profile__form--title">Personnal informations</h3>
              <Form.Field>
                <label>Firstname</label>
                <input value={firstname} onChange={handleFirstnameChange} />
              </Form.Field>
              <Form.Field>
                <label>Lastname</label>
                <input value={lastname} onChange={handleLastnameChange} />
              </Form.Field>
              <Form.Field>
                <label>Email</label>
                <input value={email} onChange={handleEmailChange} />
              </Form.Field>
              <Form.Field>
                <label>Date of birth</label>
                <input
                  placeholder="Date of birth"
                  onChange={handleBirthDateChange}
                  value={age}
                  type="date"
                />
              </Form.Field>
              <Form.Field
                control={Select}
                label="Country"
                options={countryList}
                placeholder={nativeCountry}
                search
                onChange={handleCountryChange}
              />
              <Button type="submit">Save your changes</Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileUpdateForm;
