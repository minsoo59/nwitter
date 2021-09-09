import { dbService, realtimeNweet, collec } from "fBase";
import React, { useEffect, useState } from "react";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";
const Home = ({ userObj }) => {
  const [nweets, setNweets] = useState([]);

  // const getNweets = async () => {
  //   const dbNweets = await getDocs(collection(dbService, "nweets"));
  //   dbNweets.forEach((doc) => {
  //     const nweetObj = {
  //       ...doc.data(),
  //       id: doc.id,
  //     };
  //     setNweets((prev) => [nweetObj, ...prev]);
  //   });
  // };
  useEffect(() => {
    // getNweets(); ForEach 쓰는 방법
    realtimeNweet(collec(dbService, "nweets"), (realNweet) => {
      const nweetArray = realNweet.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray); // map
    });
  }, []);
  return (
    <div className="container">
      <NweetFactory userObj={userObj} />
      <div style={{ marginTop: 30 }}>
        {nweets.map((nweet) => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};
export default Home;
