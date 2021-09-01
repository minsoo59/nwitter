import React, { useEffect, useState } from "react";
import AppRouter from "components/Router";
import { auth } from "fBase";
function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      }
      if (!user) setIsLoggedIn(false);
      setInit(true);
    });
  }, []);
  return (
    <>
      {init ? (
        <AppRouter isLoggedIn={isLoggedIn} userObj={userObj} />
      ) : (
        "Initialiazing....!"
      )}
      <footer>&copy; {new Date().getFullYear()} Nwitter</footer>
    </>
  );
}
export default App;
