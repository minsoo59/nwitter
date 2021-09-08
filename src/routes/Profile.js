import { updateProfile } from "@firebase/auth";
import { getDocs, orderBy, query, where } from "@firebase/firestore";
import { auth as fAuth, collec, dbService } from "fBase";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

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
    <>
      <form onSubmit={onSubmit}>
        <>
          <input
            type="file"
            accept="image/profile/*"
            onChange={onProfileChange}
          />
          {photoURL ? (
            <>
              <img src={photoURL} width="50px" height="50px" alt="" />
              <button onClick={onClearPhoto}>Clear</button>
            </>
          ) : (
            userObj.photoURL && (
              <>
                <img src={userObj.photoURL} width="50px" height="50px" alt="" />
                <button onClick={onClearPhoto}>Clear</button>
              </>
            )
          )}
        </>
        <input
          type="text"
          placeholder="Display name"
          value={newDisplayName}
          onChange={onChange}
        />
        <input type="submit" value="Update Profile" />
      </form>
      <button onClick={onLogOutClick}>Log out</button>
    </>
  );
};

export default Profile;
