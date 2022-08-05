// == Import
import './style.scss';
import { Image } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { saveIdProfile } from '../../../../../actions/profile';

function AuthorCard({
  pseudoSlug, pseudo, profilePicture, id, nativeCountry, expCounter,
}) {
  const dispatch = useDispatch();

  const handleClickProfile = () => {
    console.log(id);
    dispatch(saveIdProfile(id));
  };

  return (
    <div className="prolific__user">
      <div className="prolific__user--item">
        <div className="prolific__user--circle">
          <Link to={`/volunteers/${pseudoSlug}`}>
            <Image onClick={handleClickProfile} src={`http://romain2518-server.eddi.cloud/images/pp/${profilePicture}`} avatar size="tiny" />
          </Link>
          <Link to={`/volunteers/${pseudoSlug}`}>
            <span onClick={handleClickProfile} className="user__pseudo">{pseudo}</span>
          </Link>
          <span className="prolific__user--country">From <strong>{nativeCountry}</strong></span>
          {(expCounter) && <span className="prolific__user--nbExp">Experiences shared: {expCounter}</span>}
        </div>
      </div>
    </div>
  );
}

export default AuthorCard;
