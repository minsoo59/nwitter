import React, { useState } from "react";
import { dbService, addNweet, collec, storage } from "fBase";
import { ref, uploadString, getDownloadURL } from "@firebase/storage";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";
const NweetFactory = ({ userObj }) => {
  const [nweet, setNweet] = useState("");
  const [attachment, setAttachment] = useState("");
  const onSubmit = async (e) => {
    if (nweet === "") {
      return;
    }
    e.preventDefault();
    let attachmentUrl = "";
    const fileRef = ref(storage, `${userObj.uid}/${uuidv4()}`);
    if (attachment !== "") {
      // Data URL string
      await uploadString(fileRef, attachment, "data_url");
      // Dawon file URL
      attachmentUrl = await getDownloadURL(fileRef);
    }
    const nweetObj = {
      text: nweet,
      createdAt: Date.now(),
      creatorId: userObj.uid,
      attachmentUrl,
    };
    try {
      const docRef = await addNweet(collec(dbService, "nweets"), nweetObj);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    setNweet("");
    setAttachment("");
  };
  const onChange = ({ target: { value } }) => {
    setNweet(value);
  };
  const onFileChange = ({ target: { files } }) => {
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = ({ currentTarget: { result } }) => {
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onClearAttachment = () => setAttachment("");
  return (
    <form onSubmit={onSubmit} className="factoryForm">
      <div className="factoryInput__container">
        <input
          className="factoryInput__input"
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input type="submit" value="&rarr;" className="factoryInput__arrow" />
      </div>
      <label htmlFor="attach-file" className="factoryInput__label">
        <span>Add photos</span>
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <input
        id="attach-file"
        type="file"
        accept="image/*"
        onChange={onFileChange}
        style={{
          opacity: 0,
        }}
      />
      {attachment && (
        <div className="factoryForm__attachment">
          <img
            src={attachment}
            style={{
              backgroundImage: attachment,
            }}
            alt=""
          />
          <div className="factoryForm__clear" onClick={onClearAttachment}>
            <span className="clear">Remove</span>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
      )}
    </form>
  );
};

export default NweetFactory;
