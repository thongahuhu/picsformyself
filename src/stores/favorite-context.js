import React from "react";
import { createContext, useState } from "react";

const FavoriteContext = createContext({
  favorites: [],
  totalFavorites: 0,
  addFavorite: (favoriteMeetup) => {},
  removeFavorite: (meetingId) => {},
  itemIsFavorite: (meetingId) => {},
});

export function FavoriteContextProvider({ children }) {
  const dataStorage = localStorage.getItem("favorite");

  const [userFavorites, setUserFavorites] = useState([]);
  const [favoriteNumber, setFavoriteNumber] = useState(
    dataStorage ? getLocalStorageLength() : userFavorites.length
  );

  function getLocalStorageLength() {
    const length = JSON.parse(localStorage.getItem("favorite")).length; //Code ngu nhưng làm biếng fix

    return length;
  }

  function handleSetFavoriteNumber() {
    setFavoriteNumber(getLocalStorageLength());
  }

  function addFavoriteHandler(favoriteMeeting) {
    setUserFavorites((prevUserFavorites) => {
      const data = prevUserFavorites.concat(favoriteMeeting);
      localStorage.setItem("favorite", JSON.stringify(data));
      handleSetFavoriteNumber();
      return data;
    });
  }

  function removeFavoriteHandler(meetingId) {
    setUserFavorites((prevUserFavorites) => {
      const data = prevUserFavorites.filter(
        (meeting) => meeting.id !== meetingId
      );

      localStorage.removeItem("favorite"); //Xóa storage cũ để set dữ liệu mới
      localStorage.setItem("favorite", JSON.stringify(data));

      handleSetFavoriteNumber();

      return data;
    });
  }

  function itemIsFavoriteHandler(meetupId) {
    const dataStorage = JSON.parse(localStorage.getItem("favorite")); //Code quá ngu

    if (!dataStorage || dataStorage.length === 0) {
      return userFavorites.some((meetup) => meetup.id === meetupId);
    } else {
      return dataStorage.some((item) => item.id === meetupId);
    }
  }

  const context = {
    favorites: userFavorites,
    totalFavorites: favoriteNumber,
    addFavorite: addFavoriteHandler,
    removeFavorite: removeFavoriteHandler,
    itemIsFavorite: itemIsFavoriteHandler,
    setFavoriteNumber: setFavoriteNumber,
    favoriteNumber: favoriteNumber,
    setUserFavorites: setUserFavorites,
  };

  return (
    <FavoriteContext.Provider value={context}>
      {children}
    </FavoriteContext.Provider>
  );
}

export default FavoriteContext;
