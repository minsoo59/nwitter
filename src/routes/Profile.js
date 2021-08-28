import { auth as fAuth } from "fBase";
import React from "react";
import { useHistory } from "react-router-dom";

export default () => {
  const history = useHistory();
  const onLogOutClick = () => {
    fAuth.signOut();
    history.push("/");
  };

  return (
    <>
      <button onClick={onLogOutClick}>Log out</button>
    </>
  );
};
