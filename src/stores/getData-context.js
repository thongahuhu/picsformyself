import React, { createContext, useState } from "react";

const LoadingContext = createContext();

export function LoadingContextProvider({ children }) {
  const [loadedMeetings, setLoadedMeetings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getData = () => {
    setIsLoading(true);
    fetch(
      "https://pics4urself-7b237-default-rtdb.asia-southeast1.firebasedatabase.app/meetings.json"
    )
      .then((res) => res.json())
      .then((data) => {
        const meetings = [];

        for (const key in data) {
          const meeting = {
            id: key,
            ...data[key],
          };
          meetings.unshift(meeting);
        }
        setIsLoading(false);
        setLoadedMeetings(meetings);
      });
  };
  const context = {
    loadedMeetings: loadedMeetings,
    setLoadedMeetings: setLoadedMeetings,
    isLoading: isLoading,
    setIsLoading: setIsLoading,
    getData: getData,
  };

  return (
    <LoadingContext.Provider value={context}>
      {children}
    </LoadingContext.Provider>
  );
}

export default LoadingContext;
