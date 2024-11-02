import React, { createContext, useEffect, useState } from "react";
import { Character, FavouritesContextProps } from "../types";

export const FavouritesContext = createContext<
  FavouritesContextProps | undefined
>(undefined);

export const FavouritesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [favourites, setFavourites] = useState<Character[]>([]);

  useEffect(() => {
    const storedFavourites = localStorage.getItem("favourites");
    if (storedFavourites) {
      setFavourites(JSON.parse(storedFavourites));
    }
  }, []);

  const addFavourite = (character: Character) => {
    setFavourites((prev) => {
      const updatedFavourites = [...prev, character];
      localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
      return updatedFavourites;
    });
  };

  const removeFavourite = (id: string | undefined) => {
    setFavourites((prev) => {
      const updatedFavourites = prev.filter((character) => character.id !== id);
      localStorage.setItem("favourites", JSON.stringify(updatedFavourites));
      return updatedFavourites;
    });
  };

  return (
    <FavouritesContext.Provider
      value={{ favourites, addFavourite, removeFavourite }}
    >
      {children}
    </FavouritesContext.Provider>
  );
};
