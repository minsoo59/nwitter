import { updateProfile } from "@firebase/auth";
import { getDocs, orderBy, query, where } from "@firebase/firestore";
import { auth as fAuth, collec, dbService } from "fBase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
const Profile = ({ refreshUser, userObj }) => {
  const [newDisplayName, setDisplayName] = useState(userObj.displayName);
  const [photoURL, setPhotoURL] = useState("");
  const history = useHistory();
  const onLogOutClick = () => {
    fAuth.signOut();
    history.push("/");
  };
  const getMyNweets = async () => {
    const queryNwts = query(
      collec(dbService, "nweets"),
      where("creatorId", "==", userObj.uid),
      orderBy("createdAt", "desc")
    );
    await getDocs(queryNwts);
  };

  const onChange = ({ target: { value } }) => {
    setDisplayName(value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (userObj.displayName !== newDisplayName) {
      await updateProfile(userObj, {
        displayName: newDisplayName,
        photoURL: userObj.photoURL,
      });
      refreshUser();
    }
  };

  const onProfileChange = ({ target: { files } }) => {
    const profile = files[0];
    const reader = new FileReader();
    reader.onloadend = ({ currentTarget: { result } }) => {
      setPhotoURL(result);
    };
    reader.readAsDataURL(profile);
  };

  useEffect(() => {
    getMyNweets();
  }, []);
  const onClearPhoto = () => setPhotoURL(null);
  return (
    <div className="container">
      <form onSubmit={onSubmit} className="profileForm">
        <>
          <label htmlFor="attach-file" className="factoryInput__label">
            <span>Add photos</span>
            <FontAwesomeIcon icon={faPlus} />
          </label>
          <input
            id="attach-file"
            type="file"
            accept="image/profile/*"
            onChange={onProfileChange}
            style={{
              opacity: 0,
            }}
          />
          {photoURL ? (
            <>
              <img
                src={photoURL}
                style={{
                  backgroundImage: photoURL,
                }}
                alt=""
              />
              <div className="factoryForm__clear" onClick={onClearPhoto}>
                <span className="clear">Remove</span>
                <FontAwesomeIcon icon={faTimes} />
              </div>
            </>
          ) : (
            userObj.photoURL && (
              <>
                <img
                  src={userObj.photoURL}
                  style={{
                    backgroundImage: userObj.photoURL,
                  }}
                  alt=""
                />
                <div className="factoryForm__clear" onClick={onClearPhoto}>
                  <span className="clear">Remove</span>
                  <FontAwesomeIcon icon={faTimes} />
                </div>
              </>
            )
          )}
        </>
        <>
          <input
            type="text"
            placeholder="Display name"
            value={newDisplayName}
            onChange={onChange}
            className="formInput"
            autoFocus
          />
          <input
            type="submit"
            value="Update Profile"
            className="formBtn"
            style={{
              marginTop: 10,
            }}
          />
        </>
      </form>
      <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
        Log Out
      </span>
    </div>
  );
};

export default Profile;
