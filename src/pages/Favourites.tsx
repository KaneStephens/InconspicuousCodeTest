import React, { useContext, useEffect, useState } from "react";
import { FavouritesContext } from "../context_providers/FavouritesContext";
import { Heading, Box, Text, Spinner } from "@chakra-ui/react";
import CharacterCard from "../components/CharacterCard";

const Favourites = () => {
  const { favourites, removeFavourite } = useContext(FavouritesContext)!;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (favourites) {
      setLoading(false);
    }
  }, [favourites]);

  if (loading) {
    return <Spinner />;
  }

  return favourites.length > 0 ? (
    <>
      <Heading size="lg">Your Favourites</Heading>
      <Box display="flex" flexWrap="wrap" gap={4} p={4}>
        {favourites.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            onRemove={() => removeFavourite(character.id)}
          />
        ))}
      </Box>
    </>
  ) : (
    <Box p={4}>
      <Heading size="lg">Your Favourites</Heading>
      <Text>No favourites added yet.</Text>
    </Box>
  );
};

export default Favourites;
